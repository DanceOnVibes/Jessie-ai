export type KnowledgeDomain = "biology" | "art" | "privacy";

export type KnowledgeDepth = "simple" | "curious" | "deep";

export type KnowledgeAudience = "public" | "professional";

export type KnowledgeSafetyLevel =
  | "general"
  | "sensitive"
  | "restricted";

export interface KnowledgeItem {
  id: string;
  domain: KnowledgeDomain;
  slug: string;
  title: string;
  summary: string;
  simple: string;
  curious: string;
  deep: string;
  keyTerms: string[];
  sourceLabels: string[];
  sourceLinks: string[];
  audience: KnowledgeAudience;
  safetyLevel: KnowledgeSafetyLevel;
  notes?: string;
  visualPromptIdea?: string;
}
