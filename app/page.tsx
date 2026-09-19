export default function HomePage() {
  return (
    <main>
      <section
        style={{
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        <h1
          style={{
            fontSize: "3.2rem",
            marginBottom: "1rem",
          }}
        >
          Jessie’s World
        </h1>
        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          A soft and dreamy little corner of the internet filled with lovely
          memories, warm colours, creativity, and all the tiny beautiful things
          that make Jessie smile.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "4rem",
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
          <h2 style={{ marginBottom: "1rem" }}>About Jessie</h2>
          <p style={{ lineHeight: "1.8", margin: 0 }}>
            Jessie’s World is a cozy and creative corner of the internet — a
            place for dreamy colors, treasured memories, sweet personality, and
            all the gentle little details that make life feel magical.
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
          <h2 style={{ marginBottom: "1rem" }}>Little Lovely Things</h2>
          <ul style={{ paddingLeft: "1.2rem", margin: 0, lineHeight: "1.8" }}>
            <li>Sunsets, soft skies, and golden light</li>
            <li>Warm memories full of love and laughter</li>
            <li>Creativity, comfort, and beautiful details</li>
          </ul>
        </div>
      </section>

      <section
        style={{
          textAlign: "center",
          marginBottom: "4rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Featured Memory</h2>
        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto 2rem",
            lineHeight: "1.8",
          }}
        >
          The heart of Jessie’s World — a beautiful moment held gently in the
          center of this little dream space.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            margin: "0 auto",
            background: "#fff",
            padding: "1rem",
            borderRadius: "22px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          }}
        >
          <img
            src="/jessie-main.jpg"
            alt="Featured memory"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              display: "block",
            }}
          />
        </div>
      </section>

      <section
        style={{
          marginBottom: "3rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Gentle Highlights
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            "Soft memories worth keeping forever",
            "Tiny beautiful moments that feel magical",
            "A warm space filled with creativity and heart",
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "18px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <p style={{ margin: 0, lineHeight: "1.7" }}>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
