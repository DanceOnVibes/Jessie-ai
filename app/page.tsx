export default function Home() {
  const memoryCards = [
    {
      title: "Jessie",
      text: "A beautiful memory saved in Jessie’s World.",
      emoji: "📸",
      image: "/jessie.jpg",
    },
    {
      title: "Golden Memory",
      text: "A beautiful snapshot of laughter, warmth, and love.",
      emoji: "☀️",
    },
    {
      title: "Dream Note",
      text: "A tiny reminder that soft dreams can become real things.",
      emoji: "✨",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#3d2b35",
        padding: "40px 20px 60px",
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
            padding: "64px 28px",
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
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            Jessie’s World
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "20px auto 0",
              fontSize: "1.08rem",
              lineHeight: 1.8,
              color: "#6b5560",
            }}
          >
            A dreamy little place on the internet made with love, imagination,
            soft memories, and a sprinkle of AI magic.
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
            {memoryCards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#fff6fa",
                  border: "1px solid #f6d7e5",
                  borderRadius: "20px",
                  overflow: "hidden",
                  color: "#7a5f69",
                  boxShadow: "0 4px 14px rgba(235, 188, 208, 0.16)",
                }}
              >
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: "2rem",
                      padding: "24px 20px 0",
                    }}
                  >
                    {card.emoji}
                  </div>
                )}

                <div style={{ padding: "20px" }}>
                  <h3 style={{ margin: "0 0 10px", fontSize: "1.1rem" }}>
                    {card.title}
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.7 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: "28px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {[
            "Made with softness and care",
            "A peaceful place for lovely memories",
            "Dreamy, warm, and uniquely Jessie",
          ].map((text, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid #f4d8e5",
                borderRadius: "22px",
                padding: "22px",
                textAlign: "center",
                color: "#7a5f69",
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
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
