import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbff, #efe7ff)",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "#7c6ee6", fontWeight: "bold" }}>
          Home
        </Link>
        <Link href="/about" style={{ textDecoration: "none", color: "#7c6ee6", fontWeight: "bold" }}>
          About
        </Link>
        <Link href="/contact" style={{ textDecoration: "none", color: "#7c6ee6", fontWeight: "bold" }}>
          Contact
        </Link>
      </nav>

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "24px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(124, 110, 230, 0.15)",
        }}
      >
        <h1 style={{ fontSize: "48px", color: "#7c6ee6", marginBottom: "16px" }}>
          Welcome to Jessie’s Website
        </h1>

        <p style={{ fontSize: "20px", color: "#444", lineHeight: "1.7" }}>
          A small, sweet website made with love.
        </p>
      </div>
    </main>
  );
}
