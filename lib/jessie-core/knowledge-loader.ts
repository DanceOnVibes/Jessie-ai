// lib/jessie-core/knowledge-loader.ts

import fs from "fs";
import path from "path";
import type { IndexedKnowledgeItem } from "./knowledge-indexer";

export interface LoadedKnowledgeIndex {
  items: IndexedKnowledgeItem[];
  domainMap: Map<string, IndexedKnowledgeItem[]>;
  termIndex: Map<string, Set<string>>;
  version: string;
  buildDate: string;
}

interface SerializedKnowledgeIndex {
  items: IndexedKnowledgeItem[];
  domainMap: Record<string, IndexedKnowledgeItem[]>;
  termIndex: Record<string, string[]>;
  version: string;
  buildDate: string;
}

let cachedIndex: LoadedKnowledgeIndex | null = null;
let cachedIndexPath: string | null = null;
let cachedMtimeMs: number | null = null;

/**
 * Validates the raw parsed JSON has the shape we expect before
 * trusting it. Prevents a corrupted/partial index.json from
 * crashing deep inside Map reconstruction with a confusing error.
 */
function validateSerializedIndex(
  parsed: any,
  indexPath: string
): parsed is SerializedKnowledgeIndex {
  if (!parsed || typeof parsed !== "object") {
    throw new Error(
      `Knowledge index at ${indexPath} is not a valid JSON object.`
    );
  }
  if (!Array.isArray(parsed.items)) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "items" array. ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof parsed.domainMap !== "object" || parsed.domainMap === null) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "domainMap". ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof parsed.termIndex !== "object" || parsed.termIndex === null) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "termIndex". ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof parsed.version !== "string") {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a "version" string.`
    );
  }
  return true;
}

/**
 * Loads the knowledge index from the compiled JSON file.
 *
 * Caches in memory for the lifetime of the process. Cache is
 * automatically invalidated if the index file's mtime changes
 * (e.g. after re-running the indexer during local dev), so you
 * don't need to restart the dev server after rebuilding the index.
 */
export function loadKnowledgeIndex(
  indexPath: string = path.join(process.cwd(), "data", "knowledge-index.json")
): LoadedKnowledgeIndex {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(indexPath);
  } catch {
    throw new Error(
      `Knowledge index not found at ${indexPath}. Run the indexer first ` +
        `(e.g. "npx tsx lib/jessie-core/knowledge-indexer.ts").`
    );
  }

  const isSamePath = cachedIndexPath === indexPath;
  const isFresh = isSamePath && cachedMtimeMs === stat.mtimeMs;

  if (cachedIndex && isFresh) {
    return cachedIndex;
  }

  const raw = fs.readFileSync(indexPath, "utf8");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Knowledge index at ${indexPath} contains invalid JSON: ${
        (error as Error).message
      }`
    );
  }

  validateSerializedIndex(parsed, indexPath);

  const domainMap = new Map<string, IndexedKnowledgeItem[]>(
    Object.entries(parsed.domainMap)
  );

  const termIndex = new Map<string, Set<string>>(
    Object.entries(parsed.termIndex).map(([key, val]) => [
      key,
      new Set(val as string[]),
    ])
  );

  cachedIndex = {
    items: parsed.items,
    domainMap,
    termIndex,
    version: parsed.version,
    buildDate: parsed.buildDate,
  };
  cachedIndexPath = indexPath;
  cachedMtimeMs = stat.mtimeMs;

  console.log(
    `✅ Loaded knowledge index v${cachedIndex.version} ` +
      `(${cachedIndex.items.length} items, built ${cachedIndex.buildDate})`
  );

  return cachedIndex;
}

/**
 * Clears the in-memory cache (useful for testing or forcing a reload).
 */
export function clearIndexCache(): void {
  cachedIndex = null;
  cachedIndexPath = null;
  cachedMtimeMs = null;
}

/**
 * Gets all items in a specific domain.
 * Domain lookup is case-insensitive to avoid silent empty results
 * from a casing mismatch between caller and YAML data.
 */
export function getItemsByDomain(domain: string): IndexedKnowledgeItem[] {
  const index = loadKnowledgeIndex();
  const target = domain.toLowerCase();

  for (const [key, items] of index.domainMap.entries()) {
    if (key.toLowerCase() === target) {
      return items;
    }
  }
  return [];
}

/**
 * Gets a specific item by ID.
 */
export function getItemById(id: string): IndexedKnowledgeItem | undefined {
  const index = loadKnowledgeIndex();
  return index.items.find((item) => item.id === id);
}

/**
 * Gets all domain names as they appear in the index (original casing).
 */
export function getAllDomains(): string[] {
  const index = loadKnowledgeIndex();
  return Array.from(index.domainMap.keys());
}

/**
 * Returns basic health/debug info about the loaded index —
 * useful for a status endpoint or startup log without dumping
 * the entire knowledge base.
 */
export function getIndexSummary(): {
  version: string;
  buildDate: string;
  itemCount: number;
  domainCount: number;
  termCount: number;
} {
  const index = loadKnowledgeIndex();
  return {
    version: index.version,
    buildDate: index.buildDate,
    itemCount: index.items.length,
    domainCount: index.domainMap.size,
    termCount: index.termIndex.size,
  };
}
