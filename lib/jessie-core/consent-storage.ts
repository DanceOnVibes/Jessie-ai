import type { PrivacyConsent } from "./types";

const CONSENT_KEY = "jessie_privacy_consent";

export const defaultPrivacyConsent: PrivacyConsent = {
  analytics: false,
  memoryRetention: false,
  externalApiSharing: false,
  agreedToTerms: false,
  timestamp: null,
};

export function readPrivacyConsent(): PrivacyConsent {
  if (typeof window === "undefined") {
    return defaultPrivacyConsent;
  }

  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return defaultPrivacyConsent;

  try {
    return {
      ...defaultPrivacyConsent,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultPrivacyConsent;
  }
}

export function writePrivacyConsent(consent: PrivacyConsent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
}

export function clearPrivacyConsent() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CONSENT_KEY);
}
