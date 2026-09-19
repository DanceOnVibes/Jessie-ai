export default function Home() {
  const memoryCards = [
    {
      title: "Little Sunshine",
      text: "Bright beach days and tiny footsteps full of joy.",
      image: "/jessie2.jpg",
    },
    {
      title: "Golden Evening",
      text: "A soft sunset memory by the water.",
      image: "/jessie3.jpg",
    },
    {
      title: "Sweet Moment",
      text: "A quiet and beautiful little memory to hold onto.",
      image: "/jessie4.jpg",
    },
    {
      title: "Harbor Day",
      text: "A charming little scene filled with color and wonder.",
      image: "/jessie5.jpg",
    },
    {
      title: "Beach Baby",
      text: "A playful memory under sunny skies.",
      image: "/jessie6.jpg",
    },
    {
      title: "Birthday Joy",
      text: "A magical celebration filled with smiles and love.",
      image: "/jessie7.jpg",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fff8fc 0%, #fff3f8 35%, #fef6fb 65%, #fffdfd 100%)",
        color: "#3d2b35",
        padding: "40px 20px 60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.72)",
            border: "1px solid #f7d7e6",
            borderRadius: "32px",
            padding: "72px 30px",
            textAlign: "center",
            boxShadow: "0 12px 40px rgba(232, 163, 192, 0.16)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            style={{
              color: "#d86c9a",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              marginBottom: "16px",
            }}
          >
            Welcome to a dreamy little world
          </p>

          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5.4rem)",
              margin: 0,
              lineHeight: 1,
              color: "#6e3550",
            }}
          >
            Jessie’s World ✨
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "22px auto 0",
              fontSize: "1.12rem",
              lineHeight: 1.9,
              color: "#6b5560",
            }}
          >
            A soft and creative little place filled with beautiful memories,
            warm feelings, playful imagination, and all the lovely moments that
            make Jessie shine.
          </p>

          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#about"
              style={{
                background: "linear-gradient(135deg, #f45b93, #ff8ab2)",
                color: "white",
                padding: "14px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                boxShadow: "0 10px 24px rgba(244, 91, 147, 0.28)",
              }}
            >
              Enter the Magic
            </a>

            <a
              href="#memories"
              style={{
                background: "white",
                color: "#d14e84",
                padding: "14px 24px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                border: "1px solid #f2bfd3",
              }}
            >
              See the Memories
            </a>
          </div>
        </div>

        <section
          id="about"
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "26px",
              padding: "30px",
              border: "1px solid #f6dce7",
              boxShadow: "0 8px 24px rgba(230, 186, 205, 0.12)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.55rem", color: "#7a435b" }}>
              About Jessie
            </h2>
            <p style={{ lineHeight: 1.85, color: "#6b5560" }}>
              Jessie’s World is a cozy and creative corner of the internet — a
              place for dreamy colors, treasured memories, sweet personality,
              and all the gentle little details that make life feel magical.
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "26px",
              padding: "30px",
              border: "1px solid #f6dce7",
              boxShadow: "0 8px 24px rgba(230, 186, 205, 0.12)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "1.55rem", color: "#7a435b" }}>
              Little Lovely Things
            </h2>
            <ul
              style={{
                paddingLeft: "18px",
                margin: 0,
                lineHeight: 2,
                color: "#6b5560",
              }}
            >
              <li>Sunsets, soft skies, and golden light</li>
              <li>Warm memories full of love and laughter</li>
              <li>Creativity, comfort, and beautiful details</li>
            </ul>
          </div>
        </section>

        <section
          id="memories"
          style={{
            marginTop: "30px",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "26px",
            padding: "32px",
            border: "1px solid #f6dce7",
            boxShadow: "0 8px 24px rgba(230, 186, 205, 0.12)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.8rem", color: "#7a435b" }}>
            Featured Memory
          </h2>
          <p style={{ color: "#6b5560", lineHeight: 1.85, marginBottom: "18px" }}>
            The heart of Jessie’s World — a beautiful moment held gently in the center
            of this little dream space.
          </p>

          <div
            style={{
              marginTop: "22px",
              background: "#fff6fa",
              border: "1px solid #f6d7e5",
              borderRadius: "26px",
              overflow: "hidden",
              boxShadow: "0 10px 28px rgba(235, 188, 208, 0.16)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(180deg, #fff8fc 0%, #fff6fa 100%)",
                padding: "28px 20px 12px",
              }}
            >
              <img
                src="/jessie-main.jpg"
                alt="Jessie"
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "18px",
                  boxShadow: "0 10px 24px rgba(122, 67, 91, 0.12)",
                }}
              />
            </div>

            <div
              style={{
                padding: "18px 26px 26px",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "1.7rem",
                  color: "#7a435b",
                }}
              >
                Jessie 🌸
              </h3>
              <p
                style={{
                  margin: 0,
                  lineHeight: 1.85,
                  color: "#6b5560",
                  maxWidth: "760px",
                  marginInline: "auto",
                }}
              >
                A treasured portrait at the center of this world — warm, gentle,
                creative, and full of the kind of beauty that makes a memory last forever.
              </p>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: "30px",
            background: "linear-gradient(135deg, #fff7fb, #fff0f6)",
            borderRadius: "26px",
            padding: "42px 28px",
            border: "1px solid #f6dce7",
            boxShadow: "0 8px 24px rgba(230, 186, 205, 0.12)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              lineHeight: 1.7,
              color: "#7a435b",
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            “The smallest memories can hold the greatest beauty.” ✨
          </p>
        </section>

        <section
          style={{
            marginTop: "30px",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "26px",
            padding: "32px",
            border: "1px solid #f6dce7",
            boxShadow: "0 8px 24px rgba(230, 186, 205, 0.12)",
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: "1.8rem", color: "#7a435b" }}>
            More Memories
          </h2>
          <p style={{ color: "#6b5560", lineHeight: 1.85 }}>
            A gallery of little moments, sweet feelings, and snapshots of joy.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
              marginTop: "22px",
            }}
          >
            {memoryCards.map((card, index) => (
              <div
                key={index}
                style={{
                  background: "#fff6fa",
                  border: "1px solid #f6d7e5",
                  borderRadius: "24px",
                  overflow: "hidden",
                  color: "#7a5f69",
                  boxShadow: "0 8px 24px rgba(235, 188, 208, 0.16)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "pointer",
                }}
              >
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

                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontSize: "1.12rem",
                      color: "#7a435b",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.75 }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
          }}
        >
          {[
            "Made with softness, sparkle, and care ✨",
            "A peaceful little home for lovely memories 🌷",
            "Dreamy, warm, creative, and uniquely Jessie 💖",
          ].map((text, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid #f4d8e5",
                borderRadius: "24px",
                padding: "22px",
                textAlign: "center",
                color: "#7a5f69",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(235, 188, 208, 0.1)",
              }}
            >
              {text}
            </div>
          ))}
        </section>

        <footer
          style={{
            textAlign: "center",
            marginTop: "36px",
            color: "#8a6d78",
            fontSize: "0.96rem",
          }}
        >
          Built with love, imagination, and a little bit of AI magic ✨
        </footer>
      </section>
    </main>
  );
}
