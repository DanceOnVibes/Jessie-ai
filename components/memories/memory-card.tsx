import type { KnowledgeItem } from "@/lib/jessie-core/knowledge-types";

type MemoryCardProps = {
  item: KnowledgeItem;
};

export function MemoryCard({ item }: MemoryCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[34px] border border-[#f1dfe5] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,248,250,0.98)_55%,rgba(253,244,247,1)_100%)] p-7 shadow-[0_14px_45px_rgba(122,92,102,0.08)] ring-1 ring-white/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(122,92,102,0.14)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,245,247,0.95),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(247,227,234,0.75),transparent_30%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)] opacity-100" />

      <div className="pointer-events-none absolute inset-[1px] rounded-[33px] border border-white/50" />

      <div className="pointer-events-none absolute right-5 top-5 h-24 w-24 rounded-full bg-[#fff6f8]/70 blur-2xl transition duration-500 group-hover:scale-110" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-20 w-20 rounded-full bg-[#f9e8ee]/80 blur-2xl transition duration-500 group-hover:scale-110" />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a06f7d]">
            {item.domain}
          </span>

          <span className="rounded-full border border-[#f3dfe6] bg-white/80 px-3.5 py-1 text-[11px] font-medium text-[#946672] shadow-[0_6px_18px_rgba(140,105,116,0.08)] backdrop-blur-md">
            {item.safetyLevel}
          </span>
        </div>

        <h3 className="mb-3 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#5a2d3b]">
          {item.title}
        </h3>

        <p className="mb-4 text-[1.05rem] leading-8 text-[#7b5d67]">
          {item.summary}
        </p>

        <div className="mb-5 h-px w-full bg-gradient-to-r from-[#f3dde4] via-[#ead3db] to-transparent" />

        <p className="text-[0.98rem] leading-8 text-[#5f4c54]">
          {item.simple}
        </p>

        {item.keyTerms?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {item.keyTerms.map((term: string) => (
              <span
                key={term}
                className="rounded-full border border-[#f3e3e8] bg-white/78 px-3.5 py-1.5 text-[12px] tracking-[0.01em] text-[#7e6069] shadow-[0_4px_14px_rgba(122,92,102,0.06)] backdrop-blur-md"
              >
                {term}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
