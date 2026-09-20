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
    <main style={{ padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <section
        style={{
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Memories</h1>
        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            lineHeight: "1.8",
            fontSize: "1.1rem",
          }}
        >
          A collection of soft, meaningful, and beautiful little moments that
          make Jessie’s World feel personal, warm, and full of heart.
        </p>
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
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ marginBottom: "0.8rem", fontSize: "1.4rem" }}>
              {memory.title}
            </h2>
            <p style={{ margin: 0, lineHeight: "1.8" }}>{memory.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
