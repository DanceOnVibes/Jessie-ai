import {
  JESSIE_BIOLOGY_PROMPT,
  JESSIE_CALM_PROMPT,
  JESSIE_CORE_PROMPT,
  JESSIE_CREATE_PROMPT,
  JESSIE_HOMEPAGE_PROMPT,
  JESSIE_PREMIUM_PROMPT,
} from "./prompts";

import { detectJessieMode, type JessieMode } from "./routing";
import type { JessieRequest } from "./types";

function buildSystemPrompt(req: JessieRequest) {
  const mode: JessieMode = detectJessieMode(req.message, req.capability);

  const parts = [JESSIE_CORE_PROMPT];

  if (req.capability === "companion") {
    parts.push(JESSIE_HOMEPAGE_PROMPT);
  }

  if (mode === "create") {
    parts.push(JESSIE_CREATE_PROMPT);
  } else if (mode === "biology") {
    parts.push(JESSIE_BIOLOGY_PROMPT);
  } else if (mode === "calm") {
    parts.push(JESSIE_CALM_PROMPT);
  } else if (mode === "blended") {
    parts.push(JESSIE_CREATE_PROMPT);
    parts.push(JESSIE_BIOLOGY_PROMPT);
    parts.push(JESSIE_CALM_PROMPT);
  }

  if (req.allowMemory) {
    parts.push(JESSIE_PREMIUM_PROMPT);
  }

  return {
    mode,
    systemPrompt: parts.join("\n\n"),
  };
}

export function generateJessiePromptPack(req: JessieRequest) {
  const { mode, systemPrompt } = buildSystemPrompt(req);

  return {
    mode,
    capability: req.capability,
    message: req.message,
    systemPrompt,
    reply: `Generated for: ${req.message}`,
    biologyDepth: req.biologyDepth ?? null,
    allowMemory: req.allowMemory ?? false,
    tags: [mode, req.capability],
  };
}

export function getJessieSystemPrompt(req: JessieRequest) {
  return buildSystemPrompt(req);
}
