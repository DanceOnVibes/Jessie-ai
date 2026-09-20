"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { MemoryRecord, PrivacyConsent } from "./types";
import {
  defaultPrivacyConsent,
  readPrivacyConsent,
  writePrivacyConsent,
} from "./consent-storage";
import {
  addMemoryRecord,
  readMemoryRecords,
  removeMemoryRecord,
  writeMemoryRecords,
} from "./memory-storage";

type JessieCoreContextValue = {
  consent: PrivacyConsent;
  memories: MemoryRecord[];
  setConsent: (next: PrivacyConsent) => void;
  acceptAllConsent: () => void;
  rejectOptionalConsent: () => void;
  addMemory: (record: MemoryRecord) => void;
  removeMemory: (id: string) => void;
  clearAllMemories: () => void;
};

const JessieCoreContext = createContext<JessieCoreContextValue | null>(null);

export function JessieCoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsentState] = useState<PrivacyConsent>(defaultPrivacyConsent);
  const [memories, setMemories] = useState<MemoryRecord[]>([]);

  useEffect(() => {
    setConsentState(readPrivacyConsent());
    setMemories(readMemoryRecords());
  }, []);

  const setConsent = (next: PrivacyConsent) => {
    setConsentState(next);
    writePrivacyConsent(next);
  };

  const acceptAllConsent = () => {
    const next: PrivacyConsent = {
      analytics: true,
      memoryRetention: true,
      externalApiSharing: true,
      agreedToTerms: true,
      timestamp: Date.now(),
    };
    setConsent(next);
  };

  const rejectOptionalConsent = () => {
    const next: PrivacyConsent = {
      analytics: false,
      memoryRetention: false,
      externalApiSharing: false,
      agreedToTerms: true,
      timestamp: Date.now(),
    };
    setConsent(next);
  };

  const addMemory = (record: MemoryRecord) => {
    setMemories((current) => {
      const next = [record, ...current];
      addMemoryRecord(record);
      return next;
    });
  };

  const removeMemory = (id: string) => {
    setMemories((current) => {
      const next = current.filter((record) => record.id !== id);
      removeMemoryRecord(id);
      return next;
    });
  };

  const clearAllMemories = () => {
    setMemories([]);
    writeMemoryRecords([]);
  };

  const value = useMemo<JessieCoreContextValue>(
    () => ({
      consent,
      memories,
      setConsent,
      acceptAllConsent,
      rejectOptionalConsent,
      addMemory,
      removeMemory,
      clearAllMemories,
    }),
    [consent, memories]
  );

  return (
    <JessieCoreContext.Provider value={value}>
      {children}
    </JessieCoreContext.Provider>
  );
}

export function useJessieCore() {
  const context = useContext(JessieCoreContext);

  if (!context) {
    throw new Error("useJessieCore must be used within JessieCoreProvider");
  }

  return context;
}
