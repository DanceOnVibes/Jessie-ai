// lib/jessie-core/vertex.server.ts
//
// The only doorway from Jessie to Google's Gemini model on Vertex AI. Server only.
//
// - London region only (europe-west2); any other region is refused.
// - Signs in with a Google service-account key using WebCrypto, and caches the
//   short-lived access token until five minutes before it expires.
// - Strict child-safety filters, capped output, and a timeout on every call.
// - Only token counts, cost, and timing ever leave this module for logs.
//
// Settings (server only, never in browser code):
//   GOOGLE_VERTEX_SA_KEY     the service-account JSON key
//   GOOGLE_CLOUD_PROJECT     the Google Cloud project id
//   GOOGLE_VERTEX_LOCATION   must be europe-west2

export const VERTEX_MODEL = "gemini-2.5-flash";
export const VERTEX_REGION = "europe-west2";
/** Google's published prices for gemini-2.5-flash, US dollars per million tokens. */
export const VERTEX_USD_PER_MILLION = { input: 0.3, output: 2.5 } as const;

export interface VertexUsage {
  promptTokens: number;
  outputTokens: number;
  costUsd: number;
  durationMs: number;
}

export interface VertexResult {
  ok: boolean;
  text: string;
  usage: VertexUsage;
  reason?: "config" | "timeout" | "provider_error" | "rate_limited" | "blocked" | "empty";
}

export interface VertexTurn {
  role: "user" | "model";
  text: string;
}

export interface VertexRequest {
  system: string;
  prompt: string;
  history?: VertexTurn[];
  maxOutputTokens?: number;
  temperature?: number;
  timeoutMs?: number;
  jsonSchema?: Record<string, unknown>;
}

const ZERO: VertexUsage = { promptTokens: 0, outputTokens: 0, costUsd: 0, durationMs: 0 };

/** Block anything harmful at the lowest threshold: this is a children's teacher. */
const SAFETY_SETTINGS = [
  "HARM_CATEGORY_HARASSMENT",
  "HARM_CATEGORY_HATE_SPEECH",
  "HARM_CATEGORY_SEXUALLY_EXPLICIT",
  "HARM_CATEGORY_DANGEROUS_CONTENT",
].map((category) => ({ category, threshold: "BLOCK_LOW_AND_ABOVE" }));

export function vertexBody(req: VertexRequest): Record<string, unknown> {
  const contents = [
    ...(req.history ?? []).map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
    { role: "user", parts: [{ text: req.prompt }] },
  ];
  return {
    systemInstruction: { parts: [{ text: req.system }] },
    contents,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      temperature: req.temperature ?? 0.4,
      maxOutputTokens: req.maxOutputTokens ?? 1200,
      thinkingConfig: { thinkingBudget: 0 },
      ...(req.jsonSchema
        ? { responseMimeType: "application/json", responseJsonSchema: req.jsonSchema }
        : { responseMimeType: "text/plain" }),
    },
  };
}

export function vertexEndpoint(project: string, region: string): string {
  if (region !== VERTEX_REGION) throw new Error("vertex_region_not_allowed");
  if (!/^[a-z][a-z0-9-]{4,29}$/.test(project)) throw new Error("vertex_project_invalid");
  return `https://${region}-aiplatform.googleapis.com/v1/projects/${project}/locations/${region}/publishers/google/models/${VERTEX_MODEL}:generateContent`;
}

export function estimateVertexCostUsd(promptTokens: number, outputTokens: number): number {
  return (promptTokens * VERTEX_USD_PER_MILLION.input + outputTokens * VERTEX_USD_PER_MILLION.output) / 1_000_000;
}

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

/** Accepts the key as pasted into a dashboard, including stray spaces and escaped newlines. */
export function parseServiceAccount(raw: string): ServiceAccount {
  const compact = raw.replace(/[\s ]/g, "");
  const sa = JSON.parse(compact) as ServiceAccount;
  const match = sa.private_key?.match(/KEY-----([\s\S]+?)-----END/);
  if (!sa.client_email || !match) throw new Error("vertex_key_invalid");
  sa.private_key = match[1]!.replace(/\\n/g, "").replace(/[^A-Za-z0-9+/=]/g, "");
  return sa;
}

const b64url = (bytes: Uint8Array) => {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const b64urlJson = (o: unknown) => b64url(new TextEncoder().encode(JSON.stringify(o)));

let cachedToken: { token: string; expiresAt: number } | null = null;

async function accessToken(sa: ServiceAccount): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 300_000 > Date.now()) return cachedToken.token;
  const der = Uint8Array.from(atob(sa.private_key), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64urlJson({ alg: "RS256", typ: "JWT" })}.${b64urlJson({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned)));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${b64url(sig)}`,
    }),
  });
  if (!res.ok) throw new Error(`vertex_token_${res.status}`);
  const body = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!body.access_token) throw new Error("vertex_token_missing");
  cachedToken = { token: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return body.access_token;
}

export function vertexConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_VERTEX_SA_KEY &&
      process.env.GOOGLE_CLOUD_PROJECT &&
      (process.env.GOOGLE_VERTEX_LOCATION ?? "").trim() === VERTEX_REGION,
  );
}

export async function vertexGenerate(req: VertexRequest): Promise<VertexResult> {
  const started = Date.now();
  if (!vertexConfigured()) {
    console.error("[vertex] configuration missing or region not allowed");
    return { ok: false, text: "", usage: ZERO, reason: "config" };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), req.timeoutMs ?? 25_000);
  try {
    const token = await accessToken(parseServiceAccount(process.env.GOOGLE_VERTEX_SA_KEY!));
    const endpoint = vertexEndpoint(process.env.GOOGLE_CLOUD_PROJECT!.trim(), VERTEX_REGION);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(vertexBody(req)),
      signal: controller.signal,
    });
    if (res.status === 429) return { ok: false, text: "", usage: ZERO, reason: "rate_limited" };
    if (!res.ok) {
      console.error("[vertex] provider error", { status: res.status });
      return { ok: false, text: "", usage: ZERO, reason: "provider_error" };
    }
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
      promptFeedback?: { blockReason?: string };
      usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
    };
    const promptTokens = data.usageMetadata?.promptTokenCount ?? 0;
    const outputTokens = data.usageMetadata?.candidatesTokenCount ?? 0;
    const usage: VertexUsage = {
      promptTokens,
      outputTokens,
      costUsd: estimateVertexCostUsd(promptTokens, outputTokens),
      durationMs: Date.now() - started,
    };
    const candidate = data.candidates?.[0];
    if (data.promptFeedback?.blockReason || candidate?.finishReason === "SAFETY") {
      return { ok: false, text: "", usage, reason: "blocked" };
    }
    const text = (candidate?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
    if (!text) return { ok: false, text: "", usage, reason: "empty" };
    return { ok: true, text, usage };
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    if (!aborted) console.error("[vertex] request failed");
    return { ok: false, text: "", usage: { ...ZERO, durationMs: Date.now() - started }, reason: aborted ? "timeout" : "provider_error" };
  } finally {
    clearTimeout(timer);
  }
}
