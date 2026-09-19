export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #fff7fb, #ffeaf4, #fffafc)",
        color: "#3d2b35",
        fontFamily:
          'Arial, Helvetica, sans-serif',
        padding: "40px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "1px solid #f7d7e6",
            borderRadius: "28px",
            padding: "60px 28px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(232, 163, 192, 0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              color: "#d86c9a",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.8rem",
              marginBottom: "14px",
            }}
          >
            A little magical corner
          </p>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Jessie’s World
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "20px auto 0",
              fontSize: "1.08rem",
              lineHeight: 1.8,
              color: "#6b5560",
            }}
          >
            A dreamy little place on the internet made with love, imagination,
            and a sprinkle of AI magic.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#about"
              style={{
                background: "#f45b93",
                color: "white",
                padding: "14px 22px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                boxShadow: "0 8px 20px rgba(244, 91, 147, 0.28)",
              }}
            >
              Enter Jessie’s World
            </a>

            <a
              href="#memories"
              style={{
                background: "white",
                color: "#d14e84",
                padding: "14px 22px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                border: "1px solid #f2bfd3",
              }}
            >
              View Memories
            </a>
          </div>
        </div>

        <section
          id="about"
          style={{
            marginTop: "28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px",
              border: "1px solid #f6dce7",
              boxShadow: "0 6px 20px rgba(230, 186, 205, 0.14)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>About Jessie</h2>
            <p style={{ lineHeight: 1.8, color: "#6b5560" }}>
              Jessie’s World is a soft, cozy, and joyful digital space — a place
              for sweet memories, favorite things, and all the little details
              that make life feel magical.
            </p>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "28px",
              border: "1px solid #f6dce7",
              boxShadow: "0 6px 20px rgba(230, 186, 205, 0.14)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.5rem" }}>Favorite Things</h2>
            <ul
              style={{
                paddingLeft: "18px",
                margin: 0,
                lineHeight: 2,
                color: "#6b5560",
              }}
            >
              <li>Soft pink skies and dreamy mornings</li>
              <li>Sweet memories and tiny magical moments</li>
              <li>Creativity, comfort, and beautiful little details</li>
            </ul>
          </div>
        </section>

        <section
          id="memories"
          style={{
            marginTop: "28px",
            background: "white",
            borderRadius: "24px",
            padding: "30px",
            border: "1px solid #f6dce7",
            boxShadow: "0 6px 20px rgba(230, 186, 205, 0.14)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.7rem" }}>Memory Wall</h2>
          <p style={{ color: "#6b5560", lineHeight: 1.8 }}>
            A place to collect sweet notes, beautiful snapshots, favorite days,
            and moments worth keeping forever.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            {[
              "A lovely moment worth remembering",
              "A small joy that made the day brighter",
              "A future photo or note can live here",
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  background: "#fff6fa",
                  border: "1px solid #f6d7e5",
                  borderRadius: "20px",
                  padding: "20px",
                  minHeight: "120px",
                  display: "flex",
                  alignItems: "center",
                  color: "#7a5f69",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </section>

        <footer
          style={{
            textAlign: "center",
            marginTop: "34px",
            color: "#8a6d78",
            fontSize: "0.95rem",
          }}
        >
          Built with love, imagination, and a little bit of AI magic ✨
        </footer>
      </section>
    </main>
  );
}
