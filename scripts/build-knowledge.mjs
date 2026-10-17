// Builds data/jessie-brain.json from the knowledge packs and the teacher rules.
//
// Run automatically before every build (npm "prebuild") and by CI. The app
// imports the JSON directly, so the packs ship with the server bundle and no
// file reads happen at request time.
//
//   node scripts/build-knowledge.mjs          build
//   node scripts/build-knowledge.mjs --check  build and fail if any pack is unreadable

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();
const knowledgeDir = path.join(root, "knowledge");
const rulesFile = path.join(root, "rules", "jessie_teacher_rules.yaml");
const outFile = path.join(root, "data", "jessie-brain.json");
const check = process.argv.includes("--check");

const SKIP_KEYS = new Set([
  "file_name",
  "version",
  "last_updated",
  "audience",
  "source_type",
  "status",
  "purpose",
  "sources_to_check",
  "metadata",
]);
const STOP = new Set(
  "the and for are but not you your with that this from have has was were what when where which who why how can its into than then them they their there these those does did will would could should about also only just more most some such very".split(
    " ",
  ),
);

export function tokens(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t))
    .map((t) => (t.length > 4 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t));
}

function findYaml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findYaml(full));
    else if (/\.ya?ml$/i.test(entry.name)) out.push(full);
  }
  return out.sort();
}

function render(value, indent = "") {
  if (value === null || value === undefined) return "";
  if (typeof value !== "object") return `${indent}${String(value)}`;
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item && typeof item === "object") {
          const inner = render(item, indent + "  ").trimStart();
          return `${indent}- ${inner}`;
        }
        return `${indent}- ${String(item)}`;
      })
      .join("\n");
  }
  return Object.entries(value)
    .map(([k, v]) => {
      const label = k.replace(/_/g, " ");
      if (v && typeof v === "object") return `${indent}${label}:\n${render(v, indent + "  ")}`;
      return `${indent}${label}: ${String(v ?? "")}`;
    })
    .join("\n");
}

const chunks = [];
const packs = [];
const problems = [];
const seenTopics = new Map();

for (const file of findYaml(knowledgeDir)) {
  const rel = path.relative(root, file);
  let doc;
  try {
    doc = yaml.load(fs.readFileSync(file, "utf8"));
  } catch (error) {
    problems.push(`${rel}: cannot be read (${String(error.message).split("\n")[0]})`);
    continue;
  }
  const pack = doc?.knowledge_pack;
  if (!pack?.topic?.name || !pack?.topic?.domain) {
    problems.push(`${rel}: missing knowledge_pack.topic.name or .domain`);
    continue;
  }
  const id = `${pack.topic.domain}:${pack.topic.name}`.toLowerCase().replace(/\s+/g, "_");
  if (seenTopics.has(id)) {
    problems.push(`${rel}: duplicate of ${seenTopics.get(id)}`);
    continue;
  }
  seenTopics.set(id, rel);
  packs.push({ id, name: pack.topic.name, domain: pack.topic.domain, file: rel, draft: Boolean(pack.status) });

  for (const [key, value] of Object.entries(pack)) {
    if (SKIP_KEYS.has(key)) continue;
    const isGroup =
      value && typeof value === "object" && !Array.isArray(value) && key !== "topic" && key !== "overview";
    const entries = isGroup ? Object.entries(value).map(([k, v]) => [`${key} > ${k}`, v]) : [[key, value]];
    for (const [section, body] of entries) {
      const text = render(body);
      if (!text.trim()) continue;
      const heading = `${pack.topic.name} > ${section.replace(/_/g, " ")}`;
      chunks.push({
        pack: id,
        section: heading,
        text: text.length > 2400 ? text.slice(0, 2400) + " ..." : text,
        headingTerms: [...new Set(tokens(heading))],
        terms: [...new Set(tokens(`${heading} ${text}`))],
      });
    }
  }
}

let rules;
try {
  rules = yaml.load(fs.readFileSync(rulesFile, "utf8"))?.rules;
} catch (error) {
  problems.push(`rules/jessie_teacher_rules.yaml: cannot be read (${error.message})`);
}

function ruleLines(list) {
  return (list ?? []).map((r) => `${r.id}. ${r.rule}`).join("\n");
}

const rulesText = rules
  ? [
      `Stated purpose: ${rules.stated_purpose}`,
      `Priority order:\n${(rules.priority_order ?? []).join("\n")}`,
      `Safety rules:\n${ruleLines(rules.safety)}`,
      `Honesty rules:\n${ruleLines(rules.honesty)}`,
      `Teaching rules:\n${ruleLines(rules.teaching)}`,
      `Wellbeing rules:\n${ruleLines(rules.wellbeing)}`,
      `Storyteller rules:\n${ruleLines(rules.storyteller)}`,
      `Picture rules:\n${ruleLines(rules.pictures)}`,
    ].join("\n\n")
  : "";

const df = {};
for (const c of chunks) for (const t of c.terms) df[t] = (df[t] ?? 0) + 1;

const brain = {
  version: 1,
  builtAt: new Date().toISOString(),
  rulesVersion: rules?.version ?? null,
  rulesText,
  packs,
  chunkCount: chunks.length,
  documentFrequency: df,
  chunks,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(brain));
console.log(`Jessie brain: ${packs.length} packs, ${chunks.length} sections, rules v${brain.rulesVersion}`);
for (const p of problems) console.warn(`Warning: ${p}`);
if (check && (problems.length > 0 || !rulesText)) {
  console.error("Knowledge check failed.");
  process.exit(1);
}
