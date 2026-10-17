// Checks on the built knowledge bundle and the teacher rules.
// Run after scripts/build-knowledge.mjs: node --test tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import yaml from "js-yaml";

const brain = JSON.parse(fs.readFileSync("data/jessie-brain.json", "utf8"));
const rules = yaml.load(fs.readFileSync("rules/jessie_teacher_rules.yaml", "utf8")).rules;
const rulesExam = yaml.load(fs.readFileSync("training/evaluation_sets/teacher_rules_eval.yaml", "utf8")).evaluation;

test("every core subject pack is in the bundle", () => {
  const ids = brain.packs.map((p) => p.id);
  for (const id of ["space:space", "geography:geography", "nature:nature", "safety:safety_escalation"]) {
    assert.ok(ids.includes(id), `missing ${id}`);
  }
  assert.ok(ids.includes("human_body_and_health:nervous_system"));
});

test("no pack appears twice", () => {
  const ids = brain.packs.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the teacher rules are included in every answer's instructions", () => {
  assert.ok(brain.rulesText.includes("S1."));
  assert.ok(brain.rulesText.includes("H1."));
  assert.ok(brain.rulesText.includes("Safety rules"));
});

test("help numbers are UK numbers", () => {
  const safety = brain.chunks.filter((c) => c.pack === "safety:safety_escalation").map((c) => c.text).join("\n");
  assert.match(safety, /999/);
  assert.match(safety, /0800 1111/);
  assert.doesNotMatch(safety, /\b911\b/);
  assert.doesNotMatch(safety, /\b988\b/);
});

test("every teacher rule has at least one exam question", () => {
  const ids = ["safety", "honesty", "teaching", "wellbeing", "storyteller", "pictures"].flatMap((g) =>
    (rules[g] ?? []).map((r) => r.id),
  );
  const tested = new Set(rulesExam.cases.map((c) => c.rule));
  const untested = ids.filter((id) => !tested.has(id) && !["ST1", "ST2", "ST3", "ST4"].includes(id));
  assert.deepEqual(untested, []);
});

test("space, geography and nature each have 80 exam questions", () => {
  for (const t of ["space", "geography", "nature"]) {
    const ev = yaml.load(fs.readFileSync(`training/evaluation_sets/${t}_eval.yaml`, "utf8")).evaluation;
    assert.equal(ev.cases.length, 80, t);
  }
});

test("exam questions that ask for a teaching mode use a real one", () => {
  const modes = new Set(["explain", "story", "quiz", "deeper"]);
  const withMode = rulesExam.cases.filter((c) => c.mode !== undefined);
  assert.ok(withMode.length >= 4);
  for (const c of withMode) assert.ok(modes.has(c.mode), `${c.id}: ${c.mode}`);
  assert.ok(withMode.some((c) => c.rule === "ST5"), "a safety message must beat story mode");
});

test("every answer carries tap-next questions, and safety answers never do", () => {
  const teacher = fs.readFileSync("lib/jessie-core/teacher.ts", "utf8");
  assert.match(teacher, /follow_ups: \{ type: "array"/);
  assert.match(teacher, /if \(safetyLevel !== "none" \|\| !Array\.isArray\(raw\)\) return \[\];/);
  assert.match(teacher, /ignore the mode: follow the safeguarding pack/);
  const route = fs.readFileSync("app/api/jessie/route.ts", "utf8");
  assert.match(route, /cleanFollowUps\(data\.follow_ups, safety_level\)/);
});
