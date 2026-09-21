import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { MemoryGrid } from "@/components/memories/memory-grid";
import { getPublicKnowledge } from "@/lib/jessie-core/knowledge-storage";

export default function MemoriesPage() {
  const knowledgeItems = getPublicKnowledge();

  const memories = [
    {
      src: "/images/jessie1.jpg",
      title: "The Beginning",
      text: "The earliest chapter of Jessie’s story, full of innocence, softness, and the first quiet spark of who she would become.",
    },
    {
      src: "/images/jessie2.jpg",
      title: "Little Joys",
      text: "A sweet moment shaped by playfulness, warmth, and the kind of happiness that lives forever in memory.",
    },
    {
      src: "/images/jessie3.jpg",
      title: "Golden Days",
      text: "A gentle season of light, sweetness, and peaceful beauty — the kind of memory that never really fades.",
    },
    {
      src: "/images/jessie4.jpg",
      title: "Sunny Wonder",
      text: "A bright and playful chapter, where curiosity and joy made the world feel wide and magical.",
    },
    {
      src: "/images/jessie5.jpg",
      title: "Growing Wonder",
      text: "A lovely in-between moment, where Jessie’s warmth, imagination, and spirit began to shine more clearly.",
    },
    {
      src: "/images/jessie6.jpg",
      title: "A Quiet Becoming",
      text: "A thoughtful chapter filled with small changes, soft strength, and the beauty of slowly becoming.",
    },
    {
      src: "/images/jessie7.jpg",
      title: "Finding Herself",
      text: "Jessie growing more fully into herself, carrying tenderness, presence, and quiet confidence.",
    },
    {
      src: "/images/jessie8.jpg",
      title: "Almost Here",
      text: "A chapter close to the Jessie we know now — expressive, bright, creative, and full of heart.",
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>A tender collection from Jessie’s World</p>

          <h1 className={styles.title}>Memories</h1>

          <p className={styles.subtitle}>
            A collection of soft, meaningful, and beautiful little moments that
            shaped Jessie’s story — held with warmth, tenderness, and heart.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryButton}>
              Back to Jessie’s World
            </Link>

            <Link href="/jessie" className={styles.secondaryButton}>
              Create with Jessie
            </Link>
          </div>
        </section>

        <section className={styles.featuredSection}>
          <div className={styles.featuredCard}>
            <div className={styles.featuredImageWrap}>
              <Image
                src="/images/jessie-main.jpg"
                alt="Jessie today"
                width={560}
                height={700}
                priority
                className={styles.featuredImage}
              />
            </div>

            <div className={styles.featuredContent}>
              <p className={styles.smallLabel}>Present Day</p>
              <h2 className={styles.featuredTitle}>Jessie Today</h2>
              <p className={styles.featuredText}>
                The latest version of Jessie — thoughtful, creative, warm, and
                full of heart. A soft presence shaped by memory, growth, and
                imagination.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.timelineIntro}>
          <p className={styles.smallLabel}>Through the years</p>
          <h2 className={styles.timelineTitle}>Jessie’s Timeline</h2>
          <p className={styles.timelineText}>
            A gentle visual journey through Jessie’s early memories — each one a
            quiet chapter in the story of who she was becoming.
          </p>
        </section>

        <section className={styles.grid}>
          {memories.map((memory, index) => (
            <article key={index} className={styles.card}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={memory.src}
                  alt={memory.title}
                  width={420}
                  height={520}
                  className={styles.cardImage}
                />
              </div>

              <p className={styles.cardLabel}>Memory {index + 1}</p>
              <h3 className={styles.cardTitle}>{memory.title}</h3>
              <p className={styles.cardText}>{memory.text}</p>
            </article>
          ))}
        </section>

        <section className={styles.timelineIntro}>
          <p className={styles.smallLabel}>Jessie’s knowledge</p>
          <h2 className={styles.timelineTitle}>What Jessie knows</h2>
          <p className={styles.timelineText}>
            A gentle library of ideas, principles, and things Jessie can speak
            about with care — spanning biology, art, memory, and privacy.
          </p>
        </section>

        <section className={styles.knowledgeSection}>
          <MemoryGrid items={knowledgeItems} />
        </section>
      </div>
    </main>
  );
}
