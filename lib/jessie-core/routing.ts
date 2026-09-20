import type { JessieMode, JessiePage } from "./types";

export function detectJessieMode(userInput: string, page: JessiePage): JessieMode {
  const input = userInput.toLowerCase();

  if (page === "create") return "create";
  if (page === "biology") return "biology";
  if (page === "calm") return "calm";

  const biologyKeywords = [
    "biology",
    "anatomy",
    "physiology",
    "wellness",
    "health",
    "body",
    "lungs",
    "heart",
    "brain",
    "breathing",
    "breath",
    "nervous system",
    "exercise",
    "stress response",
    "infographic",
  ];

  const calmKeywords = [
    "grief",
    "healing",
    "anxiety",
    "sadness",
    "comfort",
    "self-love",
    "emotional pain",
    "hope",
    "inner peace",
    "trauma",
    "reflection",
    "calm",
    "gentle",
    "memory",
  ];

  const createKeywords = [
    "art",
    "image",
    "illustration",
    "portrait",
    "masterpiece",
    "design",
    "cinematic",
    "fantasy",
    "surreal",
    "visual",
    "branding",
    "poster",
  ];

  const hasBiology = biologyKeywords.some((word) => input.includes(word));
  const hasCalm = calmKeywords.some((word) => input.includes(word));
  const hasCreate = createKeywords.some((word) => input.includes(word));

  if (hasBiology && hasCalm) return "blended";
  if (hasBiology) return "biology";
  if (hasCalm) return "calm";
  if (hasCreate) return "create";

  return "create";
}
