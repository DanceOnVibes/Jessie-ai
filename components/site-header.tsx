import Link from "next/link";

export function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: "1px solid rgba(120, 90, 100, 0.12)",
        background: "rgba(255, 250, 250, 0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#5a2d3b",
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
          }}
        >
          <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>
            Jessie’s World
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "#9a7d88",
              marginTop: "0.25rem",
            }}
          >
            Dreamy Little Corner
          </span>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#6b5960",
              fontWeight: 500,
            }}
          >
            Home
          </Link>

          <Link
            href="/jessie"
            style={{
              textDecoration: "none",
              color: "#6b5960",
              fontWeight: 500,
            }}
          >
            Create with Jessie
          </Link>

          <Link
            href="/memories"
            style={{
              textDecoration: "none",
              color: "#6b5960",
              fontWeight: 500,
            }}
          >
            Memories
          </Link>
        </nav>
      </div>
    </header>
  );
}
