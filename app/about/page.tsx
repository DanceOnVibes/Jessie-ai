export default function AboutPage() {
  return (
    <main>
      <section
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>About Jessie</h1>
        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          Jessie’s World is a soft and meaningful little space made to hold
          memories, warmth, creativity, and the simple beautiful things that
          make life feel special.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "1.75rem",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Who Jessie Is</h2>
          <p>
            Jessie is gentle, creative, thoughtful, and full of warmth. This
            little world reflects her love for soft moments, dreamy colours,
            treasured memories, and meaningful details.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "1.75rem",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>What This Space Holds</h2>
          <ul style={{ paddingLeft: "1.2rem", margin: 0, lineHeight: "1.8" }}>
            <li>Memories worth keeping close</li>
            <li>Beautiful little details and feelings</li>
            <li>Creativity, comfort, and softness</li>
            <li>A place that feels personal and warm</li>
          </ul>
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "22px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          marginBottom: "3rem",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          A Little Note
        </h2>
        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
            lineHeight: "1.8",
          }}
        >
          Jessie’s World is not just a website — it is a soft collection of
          feelings, moments, and lovely things. It is a gentle corner of the
          internet designed to feel calm, personal, and full of heart.
        </p>
      </section>
    </main>
  );
}
