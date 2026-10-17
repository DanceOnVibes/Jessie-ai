// app/api/jessie/route.ts
//
// Jessie's teaching endpoint. Every answer is built from the teacher rules,
// the safeguarding pack, and the knowledge-pack sections that match the
// question, then sent to Gemini (London) with strict child-safety filters.

import { NextResponse } from "next/server";
import {
  FALLBACK_ANSWER,
  TEACHER_ANSWER_SCHEMA,
  TEACHING_MODES,
  brainSummary,
  buildTeacherPrompt,
  cleanFollowUps,
  type LearnerAge,
  type TeacherAnswer,
  type TeachingMode,
} from "@/lib/jessie-core/teacher";
import { vertexConfigured, vertexGenerate, type VertexTurn } from "@/lib/jessie-core/vertex.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE = 1000;
const MAX_HISTORY_TURNS = 6;
const MAX_HISTORY_TEXT = 2000;
const AGES: LearnerAge[] = ["under_8", "8_to_11", "11_to_14", "14_plus", "unknown"];

/** When the safety filter stops an answer, the learner still gets a kind reply and help routes. */
const BLOCKED_ANSWER: TeacherAnswer = {
  title: "Let's explore something else",
  answer:
    "That's not something Jessie can help with. How about a question about space, our planet, nature, or how the body works? If something is worrying you, please tell a trusted adult. You can talk to Childline free on 0800 1111, and in an emergency an adult should call 999.",
  check_question: "",
  picture_idea: "",
  level: "simple",
  follow_ups: [],
  safety_level: "none",
};

// A small per-address limit to keep costs safe. Each server instance keeps its own count.
const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function asResult(a: TeacherAnswer) {
  return {
    title: a.title,
    summary: a.answer,
    why_this_works: a.check_question || undefined,
    final_prompt: a.picture_idea || undefined,
    level: a.level,
    follow_ups: a.follow_ups,
    safety_level: a.safety_level,
  };
}

function cleanHistory(raw: unknown): VertexTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns: VertexTurn[] = [];
  for (const item of raw.slice(-MAX_HISTORY_TURNS)) {
    if (!item || typeof item !== "object") continue;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if ((role !== "user" && role !== "model") || typeof text !== "string" || !text.trim()) continue;
    turns.push({ role, text: text.slice(0, MAX_HISTORY_TEXT) });
  }
  // Gemini expects the conversation to start with the learner.
  while (turns.length > 0 && turns[0]!.role !== "user") turns.shift();
  return turns;
}

function parseAnswer(text: string): TeacherAnswer | null {
  try {
    const data = JSON.parse(text) as Partial<TeacherAnswer>;
    if (typeof data.answer !== "string" || !data.answer.trim()) return null;
    const level = data.safety_level;
    const safety_level = level === "upset" || level === "hurt" || level === "danger" ? level : "none";
    const depth = data.level === "curious" || data.level === "deep" ? data.level : "simple";
    return {
      title: typeof data.title === "string" && data.title.trim() ? data.title.trim().slice(0, 120) : "Jessie explains",
      answer: data.answer.trim(),
      check_question: typeof data.check_question === "string" ? data.check_question.trim() : "",
      picture_idea: safety_level === "none" && typeof data.picture_idea === "string" ? data.picture_idea.trim() : "",
      level: depth,
      follow_ups: cleanFollowUps(data.follow_ups, safety_level),
      safety_level,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, modelConfigured: vertexConfigured(), brain: brainSummary() });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Please send a question." }, { status: 400 });
  }

  const raw = typeof body.message === "string" ? body.message : typeof body.user_input === "string" ? body.user_input : "";
  const message = raw.trim();
  if (!message) {
    return NextResponse.json({ success: false, error: "Please type a question for Jessie." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { success: false, error: "That question is a bit long. Please keep it under 1,000 characters." },
      { status: 400 },
    );
  }
  const age = AGES.includes(body.age as LearnerAge) ? (body.age as LearnerAge) : "unknown";
  const mode: TeachingMode = TEACHING_MODES.includes(body.mode as TeachingMode) ? (body.mode as TeachingMode) : "explain";

  const caller = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(caller)) {
    return NextResponse.json(
      { success: false, error: "Jessie needs a short rest. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  if (!vertexConfigured()) {
    return NextResponse.json({ success: true, result: asResult(FALLBACK_ANSWER) }, { status: 503 });
  }

  const history = cleanHistory(body.history);
  const previousQuestion = [...history].reverse().find((t) => t.role === "user")?.text;
  const { system, sources } = buildTeacherPrompt(message, age, { mode, ...(previousQuestion ? { previousQuestion } : {}) });
  const result = await vertexGenerate({
    system,
    prompt: message,
    history,
    jsonSchema: TEACHER_ANSWER_SCHEMA as unknown as Record<string, unknown>,
    maxOutputTokens: mode === "story" || mode === "deeper" ? 1600 : 1200,
    temperature: 0.4,
  });

  console.info("[jessie] answer", {
    ok: result.ok,
    reason: result.reason ?? null,
    promptTokens: result.usage.promptTokens,
    outputTokens: result.usage.outputTokens,
    costUsd: Number(result.usage.costUsd.toFixed(6)),
    ms: result.usage.durationMs,
    sections: sources.length,
    mode,
  });

  if (!result.ok) {
    if (result.reason === "blocked") return NextResponse.json({ success: true, result: asResult(BLOCKED_ANSWER) });
    return NextResponse.json({ success: true, result: asResult(FALLBACK_ANSWER) }, { status: 503 });
  }

  const answer = parseAnswer(result.text);
  if (!answer) return NextResponse.json({ success: true, result: asResult(FALLBACK_ANSWER) }, { status: 502 });

  return NextResponse.json({ success: true, result: asResult(answer), sources });
}
