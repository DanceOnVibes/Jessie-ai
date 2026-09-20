"use client";

import { useMemo, useState } from "react";
import { useJessieCore } from "@/lib/jessie-core/provider";

export function PrivacyConsent() {
  const { consent, setConsent, acceptAllConsent, rejectOptionalConsent } = useJessieCore();

  const [analytics, setAnalytics] = useState(consent.analytics);
  const [memoryRetention, setMemoryRetention] = useState(consent.memoryRetention);
  const [externalApiSharing, setExternalApiSharing] = useState(consent.externalApiSharing);

  const shouldShow = useMemo(() => consent.timestamp === null, [consent.timestamp]);

  if (!shouldShow) return null;

  const saveCustomChoices = () => {
    setConsent({
      analytics,
      memoryRetention,
      externalApiSharing,
      agreedToTerms: true,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-950/95 p-5 shadow-2xl backdrop-blur">
      <div className="space-y-4 text-white">
        <div>
          <h2 className="text-lg font-semibold">Privacy choices</h2>
          <p className="mt-1 text-sm text-zinc-300">
            Jessie uses privacy controls for analytics, memory retention, and optional external API sharing.
            You can accept all, reject optional items, or save custom choices.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span>Allow analytics</span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span>Allow memory retention</span>
            <input
              type="checkbox"
              checked={memoryRetention}
              onChange={(e) => setMemoryRetention(e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <span>Allow external API sharing</span>
            <input
              type="checkbox"
              checked={externalApiSharing}
              onChange={(e) => setExternalApiSharing(e.target.checked)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={acceptAllConsent}
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            Accept all
          </button>

          <button
            onClick={rejectOptionalConsent}
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
          >
            Reject optional
          </button>

          <button
            onClick={saveCustomChoices}
            className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/15"
          >
            Save choices
          </button>
        </div>
      </div>
    </div>
  );
}
