import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jessie’s World",
  description: "A soft and dreamy little corner of the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            width: "100%",
            borderBottom: "1px solid #eee",
            background: "#fffafc",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "1rem clamp(1rem, 4vw, 2rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/"
              style={{
                fontFamily: "var(--font-heading), serif",
                fontSize: "1.6rem",
                color: "#5a2d3b",
                fontWeight: 700,
              }}
            >
              Jessie’s World
            </a>

            <nav>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  gap: "1.25rem",
                  margin: 0,
                  padding: 0,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/memories">Memories</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer
          style={{
            borderTop: "1px solid #eee",
            marginTop: "3rem",
            background: "#fffafc",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              padding: "1.5rem clamp(1rem, 4vw, 2rem)",
              textAlign: "center",
              color: "#6d5a61",
            }}
          >
            <p style={{ margin: 0 }}>
              Made with love for Jessie’s World ✨
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
