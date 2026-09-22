// lib/jessie-core/knowledge-indexer.ts

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface YAMLKnowledgeItem {
  knowledge_pack: {
    file_name: string;
    version: string;
    last_updated: string;
    purpose: string;
    audience: string;
    source_type: string;
    topic: {
      name: string;
      category: string;
      domain: string;
    };
    overview: {
      summary: string;
      why_it_matters?: string[];
    };
    core_definitions?: Array<{
      term: string;
      definition: string;
    }>;
    cross_system_links?: any[];
    red_flags?: any;
    emergency_patterns?: any;
    teaching_frameworks?: any;
    response_templates?: any;
    common_questions?: any[];
    jessie_voice_notes?: any;
    metadata?: any;
    [key: string]: any;
  };
}

export interface IndexedKnowledgeItem {
  id: string;
  domain: string;
  subdomain?: string;
  topicName: string;
  category: string;
  summary: string;
  searchTerms: string[];
  redFlags: string[];
  emergencyPatterns: string[];
  crossLinks: string[];
  safetyLevel: "general" | "sensitive" | "critical";
  fullContent: YAMLKnowledgeItem;
  filePath: string;
}

export interface KnowledgeIndex {
  items: IndexedKnowledgeItem[];
  domainMap: Map<string, IndexedKnowledgeItem[]>;
  termIndex: Map<string, Set<string>>; // term -> item IDs
  version: string;
  buildDate: string;
}

/**
 * Recursively finds all YAML files in the knowledge directory
 */
function findYAMLFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findYAMLFiles(fullPath));
    } else if (entry.isFile() && /\.ya?ml$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parses a YAML file and returns typed content
 */
function parseYAMLFile(filePath: string): YAMLKnowledgeItem | null {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const parsed = yaml.load(content) as YAMLKnowledgeItem;
    return parsed;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

/**
 * Extracts searchable terms from knowledge item.
 * Defensive against missing overview/summary/core_definitions fields
 * so one incomplete YAML file can't silently drop an entire domain.
 */
function extractSearchTerms(item: YAMLKnowledgeItem): string[] {
  const terms = new Set<string>();
  const pack = item.knowledge_pack;

  if (pack.topic?.domain) terms.add(pack.topic.domain.toLowerCase());
  if (pack.topic?.name) terms.add(pack.topic.name.toLowerCase());
  if (pack.topic?.category) terms.add(pack.topic.category.toLowerCase());

  if (Array.isArray(pack.core_definitions)) {
    pack.core_definitions.forEach((def) => {
      if (def?.term) terms.add(def.term.toLowerCase());
    });
  }

  const summary = pack.overview?.summary ?? "";
  if (summary) {
    const summaryWords = summary
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 3);
    summaryWords.forEach((word) => terms.add(word));
  }

  return Array.from(terms);
}

/**
 * Extracts red flag patterns.
 * Handles multiple YAML shapes defensively:
 *  - { patterns: [{ indicator: "..." }] }
 *  - { patterns: [{ symptom: "..." }] }
 *  - { patterns: ["...", "..."] }  (flat string array)
 *  - [...](red_flags itself is a flat array)
 * so a schema mismatch fails loud (via warning), not silently.
 */
function extractRedFlags(item: YAMLKnowledgeItem, filePath: string): string[] {
  const flags: string[] = [];
  const pack = item.knowledge_pack;
  const redFlags = pack.red_flags;

  if (!redFlags) return flags;

  const patternsSource = Array.isArray(redFlags)
    ? redFlags
    : redFlags.patterns;

  if (!Array.isArray(patternsSource)) {
    console.warn(
      `⚠️  Unrecognized red_flags shape in ${filePath} — no flags extracted. ` +
        `Expected an array or { patterns: [...] }.`
    );
    return flags;
  }

  patternsSource.forEach((pattern: any) => {
    if (typeof pattern === "string") {
      flags.push(pattern);
    } else if (pattern?.indicator) {
      flags.push(pattern.indicator);
    } else if (pattern?.symptom) {
      flags.push(pattern.symptom);
    } else if (pattern) {
      console.warn(
        `⚠️  Unrecognized red_flag pattern entry in ${filePath}:`,
        JSON.stringify(pattern)
      );
    }
  });

  return flags;
}

/**
 * Extracts emergency patterns
 */
function extractEmergencyPatterns(item: YAMLKnowledgeItem): string[] {
  const patterns: string[] = [];
  const pack = item.knowledge_pack;

  if (pack.emergency_patterns) {
    if (Array.isArray(pack.emergency_patterns.immediate_911)) {
      patterns.push(...pack.emergency_patterns.immediate_911);
    }
    if (Array.isArray(pack.emergency_patterns.urgent_same_day)) {
      patterns.push(...pack.emergency_patterns.urgent_same_day);
    }
  }

  return patterns;
}

/**
 * Extracts cross-system links
 */
function extractCrossLinks(item: YAMLKnowledgeItem): string[] {
  const links: string[] = [];
  const pack = item.knowledge_pack;

  if (Array.isArray(pack.cross_system_links)) {
    pack.cross_system_links.forEach((link: any) => {
      if (link?.target_domain) links.push(link.target_domain);
    });
  }

  if (Array.isArray(pack.metadata?.cross_references)) {
    links.push(...pack.metadata.cross_references);
  }

  return links;
}

/**
 * Determines safety level
 */
function determineSafetyLevel(
  item: YAMLKnowledgeItem
): "general" | "sensitive" | "critical" {
  const pack = item.knowledge_pack;

  if (pack.topic?.domain?.includes("safety")) return "critical";
  if (pack.red_flags || pack.emergency_patterns) return "critical";
  if (pack.metadata?.confidence_level === "critical") return "critical";
  if (pack.topic?.domain?.includes("medical")) return "sensitive";
  return "general";
}

/**
 * Converts YAML item to indexed format.
 * Logs and skips (rather than silently dropping) any file that
 * fails validation or throws during extraction.
 */
function indexKnowledgeItem(
  yamlItem: YAMLKnowledgeItem,
  filePath: string
): IndexedKnowledgeItem | null {
  try {
    const pack = yamlItem.knowledge_pack;

    if (!pack || !pack.topic?.name || !pack.topic?.domain) {
      console.warn(
        `⚠️  Skipping invalid YAML file: ${filePath} — missing knowledge_pack.topic.name or .domain`
      );
      return null;
    }

    const id = `${pack.topic.domain}-${pack.topic.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    return {
      id,
      domain: pack.topic.domain,
      subdomain: undefined,
      topicName: pack.topic.name,
      category: pack.topic.category || "general",
      summary: pack.overview?.summary || "",
      searchTerms: extractSearchTerms(yamlItem),
      redFlags: extractRedFlags(yamlItem, filePath),
      emergencyPatterns: extractEmergencyPatterns(yamlItem),
      crossLinks: extractCrossLinks(yamlItem),
      safetyLevel: determineSafetyLevel(yamlItem),
      fullContent: yamlItem,
      filePath,
    };
  } catch (error) {
    console.error(`❌ Error indexing ${filePath}:`, error);
    return null;
  }
}

/**
 * Builds the complete knowledge index.
 * Detects duplicate IDs (e.g. from draft/duplicate YAML files)
 * so they don't silently overwrite each other in the index.
 */
export function buildKnowledgeIndex(
  knowledgeDir: string = path.join(process.cwd(), "knowledge")
): KnowledgeIndex {
  const yamlFiles = findYAMLFiles(knowledgeDir);
  const items: IndexedKnowledgeItem[] = [];
  const domainMap = new Map<string, IndexedKnowledgeItem[]>();
  const termIndex = new Map<string, Set<string>>();
  const seenIds = new Map<string, string>(); // id -> filePath

  console.log(`Found ${yamlFiles.length} YAML files in ${knowledgeDir}`);

  for (const filePath of yamlFiles) {
    const yamlContent = parseYAMLFile(filePath);
    if (!yamlContent) continue;

    const indexedItem = indexKnowledgeItem(yamlContent, filePath);
    if (!indexedItem) continue;

    if (seenIds.has(indexedItem.id)) {
      console.warn(
        `⚠️  Duplicate knowledge ID "${indexedItem.id}" in ${filePath} ` +
          `(already defined in ${seenIds.get(indexedItem.id)}). Skipping duplicate.`
      );
      continue;
    }
    seenIds.set(indexedItem.id, filePath);

    items.push(indexedItem);

    if (!domainMap.has(indexedItem.domain)) {
      domainMap.set(indexedItem.domain, []);
    }
    domainMap.get(indexedItem.domain)!.push(indexedItem);

    indexedItem.searchTerms.forEach((term) => {
      if (!termIndex.has(term)) {
        termIndex.set(term, new Set());
      }
      termIndex.get(term)!.add(indexedItem.id);
    });
  }

  console.log(`✅ Indexed ${items.length} knowledge items`);
  console.log(`📚 Domains: ${Array.from(domainMap.keys()).join(", ")}`);

  return {
    items,
    domainMap,
    termIndex,
    version: "2.0",
    buildDate: new Date().toISOString(),
  };
}

/**
 * Saves the index to a JSON file for runtime loading
 */
export function saveIndexToFile(
  index: KnowledgeIndex,
  outputPath: string = path.join(process.cwd(), "data", "knowledge-index.json")
): void {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const serializable = {
    items: index.items,
    domainMap: Object.fromEntries(index.domainMap),
    termIndex: Object.fromEntries(
      Array.from(index.termIndex.entries()).map(([key, val]) => [
        key,
        Array.from(val),
      ])
    ),
    version: index.version,
    buildDate: index.buildDate,
  };

  fs.writeFileSync(outputPath, JSON.stringify(serializable, null, 2), "utf8");
  console.log(`💾 Knowledge index saved to ${outputPath}`);
}

/**
 * CLI execution: build and save index
 */
if (require.main === module) {
  console.log("🚀 Building knowledge index...\n");
  const index = buildKnowledgeIndex();
  saveIndexToFile(index);
  console.log("\n✅ Knowledge index built successfully!");
}
