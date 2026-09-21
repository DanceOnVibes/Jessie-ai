import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

export const privacyKnowledge: KnowledgeItem[] = [
  {
    id: "privacy-what-is-stored",
    domain: "privacy",
    slug: "what-is-stored",
    title: "What Jessie stores",
    summary: "Only three kinds of things, and only with permission.",
    simple:
      "Jessie keeps only saved creations, saved lessons, and personal memories you clearly ask her to keep.",
    curious:
      "Jessie does not keep full chat transcripts by default. She stores only what you explicitly save, what you clearly ask her to remember, or what you confirm after she asks gently.",
    deep:
      "Jessie’s memory model is intentionally narrow. It avoids automatic retention, excludes health and sensitive emotional disclosures by default, and keeps private as the default state of everything that is saved.",
    keyTerms: [
      "saved creations",
      "saved lessons",
      "explicit memory",
      "private by default",
    ],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
  },
  {
    id: "privacy-forgetting",
    domain: "privacy",
    slug: "forgetting-is-real",
    title: "How forgetting works",
    summary: "Forgetting should be real, visible, and easy.",
    simple:
      "If you ask Jessie to let something go, it should be removed from your saved memories.",
    curious:
      "Jessie uses gentle language for forgetting, but the action is concrete: if you choose to remove a saved memory, it should no longer appear in your space.",
    deep:
      "Trust depends on reversibility. Users should be able to view, export, and erase memories they chose to save, and Jessie should never imply forgetting while secretly retaining the information elsewhere.",
    keyTerms: ["erase", "export", "trust", "reversibility"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
  },
  {
    id: "privacy-never-happens",
    domain: "privacy",
    slug: "what-never-happens",
    title: "What never happens",
    summary: "No training, sharing, selling, or hidden inference from private memory.",
    simple:
      "Private memories are not for training, sharing, selling, or guessing extra things about you.",
    curious:
      "Jessie should be able to explain clearly that private memories stay private: they are not used to improve models, not sold, not shared, and not expanded into secret profiles.",
    deep:
      "Privacy is not only about storage. It is also about limiting secondary use. Jessie’s trust model depends on refusing hidden inference, refusing model-training use of private memory, and making the boundaries legible to the user.",
    keyTerms: ["no training", "no sharing", "no selling", "no inference"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
  },
  {
    id: "privacy-ai-identity",
    domain: "privacy",
    slug: "ai-identity",
    title: "Jessie’s AI identity",
    summary: "Warm, but never pretending to be human.",
    simple:
      "Jessie is an AI companion. She should never pretend otherwise.",
    curious:
      "Jessie can feel warm, present, and emotionally intelligent while still being clear that she is an AI.",
    deep:
      "Emotional safety depends in part on honest framing. Jessie’s voice should be intimate without deception, and her design should never hide what she is in order to manufacture trust.",
    keyTerms: ["AI companion", "transparency", "honest framing"],
    sourceLabels: [],
    sourceLinks: [],
    audience: "public",
    safetyLevel: "general",
  },
];
