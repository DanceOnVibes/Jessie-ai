// lib/jessie-core/knowledge-query.ts

import { loadKnowledgeIndex } from "./knowledge-loader";
import type { IndexedKnowledgeItem } from "./knowledge-indexer";

export type SafetyLevel = "general" | "sensitive" | "critical";

export interface QueryOptions {
  domains?: string[];
  safetyLevelMin?: SafetyLevel;
  limit?: number;
  includeRedFlags?: boolean;
  includeEmergencyPatterns?: boolean;
}

export interface QueryResult {
  items: IndexedKnowledgeItem[];
  matchedTerms: string[];
  safetyAlerts: string[];
  crossDomainSuggestions: string[];
}

const SAFETY_LEVEL_RANK: Record<SafetyLevel, number> = {
  general: 0,
  sensitive: 1,
  critical: 2,
};

const MIN_TERM_LENGTH = 3;

/**
 * Normalizes and tokenizes a raw query string.
 * Strips punctuation so "dizzy?" and "dizzy" match the same term.
 */
function tokenizeQuery(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((term) => term.length > MIN_TERM_LENGTH);
}

/**
 * Searches the knowledge base by query terms.
 *
 * Relevance scoring combines:
 *  - number of distinct query terms matched (breadth)
 *  - number of exact term-index hits vs. partial substring hits (precision)
 * Exact matches are weighted higher than partial substring matches so
 * a short partial overlap doesn't outrank a full exact match.
 */
export function queryKnowledge(
  query: string,
  options: QueryOptions = {}
): QueryResult {
  const index = loadKnowledgeIndex();
  const queryTerms = tokenizeQuery(query);

  if (queryTerms.length === 0) {
    return {
      items: [],
      matchedTerms: [],
      safetyAlerts: [],
      crossDomainSuggestions: [],
    };
  }

  // itemId -> score contribution (exact match = 2, partial match = 1)
  const itemScores = new Map<string, number>();
  const matchedTerms = new Set<string>();

  for (const term of queryTerms) {
    const exactMatch = index.termIndex.get(term);
    if (exactMatch) {
      exactMatch.forEach((id) => {
        itemScores.set(id, (itemScores.get(id) ?? 0) + 2);
      });
      matchedTerms.add(term);
    }

    for (const [indexedTerm, itemIds] of index.termIndex.entries()) {
      if (indexedTerm === term) continue; // already scored as exact match above
      if (indexedTerm.includes(term) || term.includes(indexedTerm)) {
        itemIds.forEach((id) => {
          itemScores.set(id, (itemScores.get(id) ?? 0) + 1);
        });
        matchedTerms.add(indexedTerm);
      }
    }
  }

  let items = index.items.filter((item) => itemScores.has(item.id));

  if (options.domains && options.domains.length > 0) {
    const domainSet = new Set(options.domains.map((d) => d.toLowerCase()));
    items = items.filter((item) => domainSet.has(item.domain.toLowerCase()));
  }

  if (options.safetyLevelMin) {
    const minRank = SAFETY_LEVEL_RANK[options.safetyLevelMin];
    items = items.filter(
      (item) => SAFETY_LEVEL_RANK[item.safetyLevel] >= minRank
    );
  }

  items.sort((a, b) => {
    const scoreDiff = (itemScores.get(b.id) ?? 0) - (itemScores.get(a.id) ?? 0);
    if (scoreDiff !== 0) return scoreDiff;
    // Stable tiebreaker: critical/sensitive safety items surface first
    // when relevance is otherwise equal, so safety-relevant results
    // aren't buried by alphabetical/insertion order alone.
    return SAFETY_LEVEL_RANK[b.safetyLevel] - SAFETY_LEVEL_RANK[a.safetyLevel];
  });

  if (options.limit && options.limit > 0) {
    items = items.slice(0, options.limit);
  }

  const safetyAlerts: string[] = [];
  if (options.includeRedFlags) {
    items.forEach((item) => safetyAlerts.push(...item.redFlags));
  }
  if (options.includeEmergencyPatterns) {
    items.forEach((item) => safetyAlerts.push(...item.emergencyPatterns));
  }

  const crossDomainSuggestions = Array.from(
    new Set(items.flatMap((item) => item.crossLinks))
  );

  return {
    items,
    matchedTerms: Array.from(matchedTerms),
    safetyAlerts: Array.from(new Set(safetyAlerts)),
    crossDomainSuggestions,
  };
}

/**
 * Checks if a query matches any emergency patterns.
 *
 * Uses word-boundary matching rather than plain substring inclusion.
 * Plain `.includes()` would let a short, generic pattern like "pain"
 * match almost any query, causing false-positive emergency escalation.
 * Word-boundary matching requires the pattern to appear as whole
 * word(s), not as a substring of an unrelated word.
 */
export function checkForEmergency(query: string): {
  isEmergency: boolean;
  patterns: string[];
  items: IndexedKnowledgeItem[];
} {
  const index = loadKnowledgeIndex();
  const queryLower = query.toLowerCase();

  const matchedItemIds = new Set<string>();
  const matchedItems: IndexedKnowledgeItem[] = [];
  const matchedPatterns = new Set<string>();

  for (const item of index.items) {
    for (const pattern of item.emergencyPatterns) {
      const patternLower = pattern.toLowerCase().trim();
      if (!patternLower) continue;

      const escaped = patternLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const boundaryRegex = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u");

      if (boundaryRegex.test(queryLower)) {
        if (!matchedItemIds.has(item.id)) {
          matchedItemIds.add(item.id);
          matchedItems.push(item);
        }
        matchedPatterns.add(pattern);
      }
    }
  }

  return {
    isEmergency: matchedItems.length > 0,
    patterns: Array.from(matchedPatterns),
    items: matchedItems,
  };
}
