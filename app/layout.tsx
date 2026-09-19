import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jessie’s World ✨",
  description:
    "A dreamy little world filled with beautiful memories, warmth, and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
