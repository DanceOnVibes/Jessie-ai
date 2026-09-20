"use client";

import { useMemo, useState } from "react";

export type JessieResult = {
  mode?: string;
  title?: string;
  summary?: string;
  final_prompt?: string;
  why_this_works?: string;
};

export type JessieResponse = {
  success: boolean;
  result?: JessieResult;
  error?: string;
};

export function useJessie() {
  const [userInput, setUserInput] = useState("");
  const [page, setPage] = useState("create");
  const [premium, setPremium] = useState(false);
  const [response, setResponse] = useState<JessieResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const canSubmit = useMemo(() => {
    return userInput.trim().length > 0 && !loading;
  }, [userInput, loading]);

  const submit = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setResponse(null);
    setCopied(false);

    try {
      const res = await fetch("/api/jessie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_input: userInput,
          page,
          premium,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Jessie request failed:", error);
      setResponse({
        success: false,
        error: "Something went wrong while contacting Jessie.",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = async () => {
    if (!response?.result?.final_prompt) return;

    try {
      await navigator.clipboard.writeText(response.result.final_prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const reset = () => {
    setUserInput("");
    setPage("create");
    setPremium(false);
    setResponse(null);
    setCopied(false);
    setLoading(false);
  };

  return {
    userInput,
    setUserInput,
    page,
    setPage,
    premium,
    setPremium,
    response,
    loading,
    copied,
    canSubmit,
    submit,
    copyPrompt,
    reset,
  };
}
