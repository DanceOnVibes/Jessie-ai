"use client";

import { JessieCoreProvider } from "@/lib/jessie-core/provider";
import { PrivacyConsent } from "@/components/trust/privacy-consent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JessieCoreProvider>
      {children}
      <PrivacyConsent />
    </JessieCoreProvider>
  );
}
