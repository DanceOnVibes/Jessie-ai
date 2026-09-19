import Link from "next/link";

export default function ContactPage() {
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
        <h1 style={{ fontSize: "42px", color: "#7c6ee6", marginBottom: "16px" }}>
          Contact
        </h1>

        <p style={{ fontSize: "20px", color: "#444", lineHeight: "1.7" }}>
          Thanks for visiting Jessie’s website. You can imagine this page holding
          contact details, social links, or a kind message.
        </p>
      </div>
    </main>
  );
}
