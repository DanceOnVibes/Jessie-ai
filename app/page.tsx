import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section
        style={{
          textAlign: "center",
          padding: "2rem 0 4rem",
        }}
      >
        <p
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
            color: "#9a7d88",
            marginBottom: "1rem",
          }}
        >
          A dreamy little corner of the internet
        </p>

        <h1
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            marginBottom: "1rem",
            color: "#5a2d3b",
          }}
        >
          Jessie’s World
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto 2rem",
            fontSize: "1.15rem",
            lineHeight: "1.9",
            color: "#6b5960",
          }}
        >
          A soft place filled with treasured memories, gentle beauty, dreamy
          colors, and all the tiny lovely things that make life feel warm and
          magical.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/about"
            style={{
              background: "#5a2d3b",
              color: "white",
              padding: "0.9rem 1.4rem",
              borderRadius: "999px",
              fontWeight: 600,
            }}
          >
            About Jessie
          </a>

          <a
            href="/memories"
            style={{
              background: "#f3e6eb",
              color: "#5a2d3b",
              padding: "0.9rem 1.4rem",
              borderRadius: "999px",
              fontWeight: 600,
            }}
          >
            Explore Memories
          </a>
        </div>
      </section>

      <section
        style={{
          marginBottom: "4rem",
        }}
      >
        <div
          style={{
            background: "#fffafa",
            borderRadius: "28px",
            padding: "1rem",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3 / 4",
              overflow: "hidden",
              borderRadius: "22px",
            }}
          >
            <Image
              src="/jessie-main.jpg"
              alt="Featured memory of Jessie"
              fill
              style={{ 
               objectFit: "cover",
               objectPosition: "center top",
              }}
              priority
            />
          </div>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
          marginBottom: "4rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "1.8rem",
            borderRadius: "22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>About Jessie</h2>
          <p style={{ margin: 0, lineHeight: "1.8" }}>
            Jessie’s World is a cozy and creative corner of the internet — a
            place for dreamy colors, treasured memories, sweet personality, and
            all the gentle little details that make life feel magical.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "1.8rem",
            borderRadius: "22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
            Little Lovely Things
          </h2>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.9" }}>
            <li>Sunsets, soft skies, and golden light</li>
            <li>Warm memories full of love and laughter</li>
            <li>Creativity, comfort, and beautiful details</li>
          </ul>
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          background: "#fffafa",
          borderRadius: "28px",
          padding: "2.5rem 1.5rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>Featured Memory</h2>
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.9",
            fontSize: "1.08rem",
          }}
        >
          The heart of Jessie’s World — a beautiful moment held gently in the
          center of this little dream space, full of softness, warmth, and
          quiet joy.
        </p>
      </section>
    </main>
  );
}
