import type { MemoryRecord } from "./types";

const MEMORY_KEY = "jessie_memory_records";

export function readMemoryRecords(): MemoryRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(MEMORY_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeMemoryRecords(records: MemoryRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(records));
}

export function addMemoryRecord(record: MemoryRecord) {
  const current = readMemoryRecords();
  writeMemoryRecords([record, ...current]);
}

export function removeMemoryRecord(id: string) {
  const current = readMemoryRecords();
  writeMemoryRecords(current.filter((record) => record.id !== id));
}

export function clearMemoryRecords() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MEMORY_KEY);
}
