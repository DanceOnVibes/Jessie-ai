import Link from "next/link";

export default function MemoriesPage() {
  const memories = [
    {
      title: "Golden Evening",
      text: "A soft sunset painted the sky in peach and rose, wrapping the whole moment in warmth.",
    },
    {
      title: "A Gentle Laugh",
      text: "One of those small, perfect memories filled with comfort, love, and lightness.",
    },
    {
      title: "Dreamy Day",
      text: "A quiet and beautiful day made special by tiny details, peaceful feelings, and sweet simplicity.",
    },
    {
      title: "Little Lovely Moment",
      text: "The kind of memory that stays close to the heart and feels warm every time it returns.",
    },
    {
      title: "Soft Skies",
      text: "Clouds, evening light, and a peaceful feeling that made everything feel calm and magical.",
    },
    {
      title: "A Beautiful Detail",
      text: "Sometimes the smallest things become the most meaningful parts of a memory.",
    },
  ];

  return (
    <main
      style={{
        padding: "4rem 2rem 5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <section
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <p
          style={{
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontSize: "0.8rem",
            color: "#9a7d88",
            marginBottom: "1rem",
          }}
        >
          A tender collection from Jessie’s World
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            marginBottom: "1rem",
            color: "#5a2d3b",
          }}
        >
          Memories
        </h1>

        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto 2rem",
            lineHeight: "1.9",
            fontSize: "1.1rem",
            color: "#6b5960",
          }}
        >
          A collection of soft, meaningful, and beautiful little moments that
          make Jessie’s World feel personal, warm, and full of heart.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              background: "#5a2d3b",
              color: "white",
              padding: "0.9rem 1.4rem",
              borderRadius: "999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to Jessie’s World
          </Link>

          <Link
            href="/jessie"
            style={{
              background: "#f3e6eb",
              color: "#5a2d3b",
              padding: "0.9rem 1.4rem",
              borderRadius: "999px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Create with Jessie
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {memories.map((memory, index) => (
          <div
            key={index}
            style={{
              background: "linear-gradient(180deg, #ffffff, #fffafa)",
              padding: "1.6rem",
              borderRadius: "24px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
              border: "1px solid rgba(90,45,59,0.06)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "0.8rem",
                fontSize: "1.35rem",
                color: "#5a2d3b",
              }}
            >
              {memory.title}
            </h2>
            <p
              style={{
                margin: 0,
                lineHeight: "1.85",
                color: "#6b5960",
              }}
            >
              {memory.text}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
