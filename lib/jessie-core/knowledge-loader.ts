// lib/jessie-core/knowledge-loader.ts

import fs from "fs";
import path from "path";
import type {
  IndexedKnowledgeItem,
  KnowledgeIndex,
} from "./knowledge-indexer";

// The loaded shape is structurally identical to the built index.
export type LoadedKnowledgeIndex = KnowledgeIndex;

interface SerializedKnowledgeIndex {
  items: IndexedKnowledgeItem[];
  domainMap: Record<string, IndexedKnowledgeItem[]>;
  termIndex: Record<string, string[]>;
  version: string;
  buildDate: string;
}

const DEFAULT_INDEX_PATH = path.join(
  process.cwd(),
  "data",
  "knowledge-index.json"
);

// Re-stat the file at most once per TTL; hot paths skip the FS entirely.
const STAT_TTL_MS = 30_000;

let cachedIndex: LoadedKnowledgeIndex | null = null;
let cachedIndexPath: string | null = null;
let cachedMtimeMs: number | null = null;
let lastStatCheck = 0;
let lowerDomainMap: Map<string, IndexedKnowledgeItem[]> | null = null;

function validateSerializedIndex(
  parsed: unknown,
  indexPath: string
): parsed is SerializedKnowledgeIndex {
  if (!parsed || typeof parsed !== "object") {
    throw new Error(
      `Knowledge index at ${indexPath} is not a valid JSON object.`
    );
  }
  const record = parsed as Record<string, unknown>;
  if (!Array.isArray(record.items)) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "items" array. ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof record.domainMap !== "object" || record.domainMap === null) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "domainMap". ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof record.termIndex !== "object" || record.termIndex === null) {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a valid "termIndex". ` +
        `Rebuild the index with the knowledge-indexer script.`
    );
  }
  if (typeof record.version !== "string") {
    throw new Error(
      `Knowledge index at ${indexPath} is missing a "version" string.`
    );
  }
  return true;
}

export function loadKnowledgeIndex(
  indexPath: string = DEFAULT_INDEX_PATH
): LoadedKnowledgeIndex {
  if (cachedIndex) {
    const withinTTL = Date.now() - lastStatCheck < STAT_TTL_MS;
    if (withinTTL && cachedIndexPath === indexPath) {
      return cachedIndex;
    }

    try {
      const stat = fs.statSync(indexPath);
      lastStatCheck = Date.now();
      if (cachedIndexPath === indexPath && cachedMtimeMs === stat.mtimeMs) {
        return cachedIndex; // still fresh
      }
      cachedMtimeMs = stat.mtimeMs; // file changed — fall through to reload
    } catch {
      // File vanished; fall through and let the read below produce
      // a clear error.
    }
  }

  let stat: fs.Stats;
  try {
    stat = fs.statSync(indexPath);
    lastStatCheck = Date.now();
  } catch (error) {
    throw new Error(
      `Knowledge index not found at indexPath({indexPath} (indexPath({(error as Error).message}). ` +
        `Run the indexer first: "npx tsx lib/jessie-core/knowledge-indexer.ts".`
    );
  }

  const raw = fs.readFileSync(indexPath, "utf8");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `Knowledge index at indexPathcontainsinvalidJSON:{indexPath} contains invalid JSON:indexPathcontainsinvalidJSON:{(error as Error).message}`
    );
  }

  if (!validateSerializedIndex(parsed, indexPath)) {
    throw new Error(`Knowledge index at ${indexPath} failed validation.`);
  }
  cachedIndex = buildFromSerialized(parsed);
  cachedIndexPath = indexPath;
  cachedMtimeMs = stat.mtimeMs;

  console.log(
    `✅ Loaded knowledge index v${cachedIndex.version} ` +
      `(cachedIndex.items.lengthitems,built{cachedIndex.items.length} items, builtcachedIndex.items.lengthitems,built{cachedIndex.buildDate})`
  );

  return cachedIndex;
}

export function clearIndexCache(): void {
  cachedIndex = null;
  cachedIndexPath = null;
  cachedMtimeMs = null;
  lowerDomainMap = null;
  lastStatCheck = 0;
}

/** O(1) case-insensitive domain lookup. */
export function getItemsByDomain(domain: string): IndexedKnowledgeItem[] {
  const index = loadKnowledgeIndex();
  return lowerDomainMap?.get(domain.trim().toLowerCase()) ?? [];
}

export function getItemById(id: string): IndexedKnowledgeItem | undefined {
  return loadKnowledgeIndex().items.find((item) => item.id === id);
}

export function getAllDomains(): string[] {
  return Array.from(loadKnowledgeIndex().domainMap.keys());
}

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
