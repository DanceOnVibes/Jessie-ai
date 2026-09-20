export type JessieCapability =
  | "companion"
  | "art"
  | "biology"
  | "trust";

export type BiologyDepth = "simple" | "curious" | "deep";

export type MemoryKind = "fleeting" | "important" | "private";

export interface PrivacyConsent {
  analytics: boolean;
  memoryRetention: boolean;
  externalApiSharing: boolean;
  agreedToTerms: boolean;
  timestamp: number | null;
}

export interface MemoryRecord {
  id: string;
  title: string;
  summary: string;
  kind: MemoryKind;
  capability: JessieCapability;
  createdAt: string;
  keptByUser: boolean;
  source: "manual" | "session";
}

export interface JessieRequest {
  capability: JessieCapability;
  message: string;
  biologyDepth?: BiologyDepth;
  allowMemory?: boolean;
}

export interface JessieResponse {
  capability: JessieCapability;
  reply: string;
  sources?: { label: string; href: string }[];
  memorySuggestion?: {
    title: string;
    summary: string;
    kind: MemoryKind;
  } | null;
}
