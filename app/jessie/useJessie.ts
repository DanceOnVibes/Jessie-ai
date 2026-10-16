// app/jessie/useJessie.ts
"use client";

import { useEffect, useMemo, useState } from "react";

export type LearnerAge = "under_8" | "8_to_11" | "11_to_14" | "14_plus" | "unknown";

export type JessieResult = {
  title?: string;
  /** The teaching answer. */
  summary?: string;
  /** A child-safe picture idea, with no words in the picture. */
  final_prompt?: string;
  /** One short question for the learner. */
  why_this_works?: string;
  safety_level?: "none" | "upset" | "hurt" | "danger";
};

export type JessieResponse = {
  success: boolean;
  result?: JessieResult;
  error?: string;
};

type Turn = { role: "user" | "model"; text: string };

const AGE_KEY = "jessie-learner-age";
const MAX_TURNS = 6;

export function useJessie() {
  const [userInput, setUserInput] = useState("");
  const [age, setAgeState] = useState<LearnerAge>("unknown");
  const [response, setResponse] = useState<JessieResponse | null>(null);
  const [history, setHistory] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(AGE_KEY);
      if (saved === "under_8" || saved === "8_to_11" || saved === "11_to_14" || saved === "14_plus") {
        setAgeState(saved);
      }
    } catch {
      // Not remembered; Jessie assumes a young learner.
    }
  }, []);

  const setAge = (next: LearnerAge) => {
    setAgeState(next);
    try {
      window.localStorage.setItem(AGE_KEY, next);
    } catch {
      // Not remembered.
    }
  };

  const canSubmit = useMemo(() => userInput.trim().length > 0 && !loading, [userInput, loading]);

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const submit = async () => {
    const message = userInput.trim();
    if (!message) return;

    stopSpeaking();
    setLoading(true);
    setResponse(null);
    setCopied(false);

    try {
      const res = await fetch("/api/jessie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, age, history: history.slice(-MAX_TURNS) }),
      });

      const data = (await res.json().catch(() => null)) as JessieResponse | null;
      if (!data) {
        setResponse({ success: false, error: "Jessie can't answer just now. Please try again in a little while." });
        return;
      }
      setResponse(data);
      if (res.ok && data.success && data.result?.summary) {
        setHistory((prev) =>
          [...prev, { role: "user" as const, text: message }, { role: "model" as const, text: data.result!.summary! }].slice(
            -MAX_TURNS,
          ),
        );
        setUserInput("");
      }
    } catch {
      setResponse({ success: false, error: "Jessie can't answer just now. Please try again in a little while." });
    } finally {
      setLoading(false);
    }
  };

  /** Reads the answer aloud with the device's own voice (free, works offline on most phones). */
  const speak = () => {
    const text = [response?.result?.summary, response?.result?.why_this_works].filter(Boolean).join(" ");
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speaking) {
      stopSpeaking();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.92;
    const british = window.speechSynthesis.getVoices().find((v) => v.lang === "en-GB");
    if (british) utterance.voice = british;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyPrompt = async () => {
    if (!response?.result?.final_prompt) return;
    try {
      await navigator.clipboard.writeText(response.result.final_prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copy is a convenience only.
    }
  };

  const reset = () => {
    stopSpeaking();
    setUserInput("");
    setResponse(null);
    setHistory([]);
    setCopied(false);
    setLoading(false);
  };

  return {
    userInput,
    setUserInput,
    age,
    setAge,
    response,
    loading,
    copied,
    speaking,
    canSubmit,
    submit,
    speak,
    copyPrompt,
    reset,
  };
}
