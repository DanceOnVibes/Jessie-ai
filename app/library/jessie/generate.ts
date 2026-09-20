import {
  JESSIE_BIOLOGY_PROMPT,
  JESSIE_CALM_PROMPT,
  JESSIE_CORE_PROMPT,
  JESSIE_CREATE_PROMPT,
  JESSIE_HOMEPAGE_PROMPT,
  JESSIE_PREMIUM_PROMPT,
} from "./prompts";

import { detectJessieMode } from "./routing";
import type { JessieRequest, JessieResponse } from "./types";

function buildSystemPrompt(req: JessieRequest) {
  const mode = detectJessieMode(req.user_input, req.page);

  const parts = [JESSIE_CORE_PROMPT];

  if (req.page === "homepage") {
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

  if (req.premium) {
    parts.push(JESSIE_PREMIUM_PROMPT);
  }

  return {
    mode,
    systemPrompt: parts.join("\n\n"),
  };
}

export function generateJessiePromptPack(req: JessieRequest): JessieResponse {
  const { mode } = buildSystemPrompt(req);

  return {
    mode,
    title: "Jessie Concept",
    summary: `Generated for: ${req.user_input}`,
    final_prompt: req.user_input,
    alternate_prompts: [],
    negative_prompt: "",
    caption: "",
    why_this_works: "Base Jessie prompt pack created.",
    tags: [mode, req.page],
    safety_notes: [],
  };
}

export function getJessieSystemPrompt(req: JessieRequest) {
  return buildSystemPrompt(req);
}
