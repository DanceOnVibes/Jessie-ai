import type { KnowledgeDomain, KnowledgeItem } from "./knowledge-types";
import { biologyKnowledge } from "@/data/jessie-knowledge/biology";
import { artKnowledge } from "@/data/jessie-knowledge/art";
import { privacyKnowledge } from "@/data/jessie-knowledge/privacy";

const ALL_KNOWLEDGE: KnowledgeItem[] = [
  ...biologyKnowledge,
  ...artKnowledge,
  ...privacyKnowledge,
];

export function getAllKnowledge(): KnowledgeItem[] {
  return ALL_KNOWLEDGE;
}

export function getKnowledgeByDomain(domain: KnowledgeDomain): KnowledgeItem[] {
  return ALL_KNOWLEDGE.filter((item) => item.domain === domain);
}

export function getKnowledgeBySlug(slug: string): KnowledgeItem | undefined {
  return ALL_KNOWLEDGE.find((item) => item.slug === slug);
}

export function getPublicKnowledge(): KnowledgeItem[] {
  return ALL_KNOWLEDGE.filter(
    (item) => item.audience === "public" && item.safetyLevel !== "restricted"
  );
}

export function getPublicKnowledgeByDomain(
  domain: KnowledgeDomain
): KnowledgeItem[] {
  return ALL_KNOWLEDGE.filter(
    (item) =>
      item.domain === domain &&
      item.audience === "public" &&
      item.safetyLevel !== "restricted"
  );
}
