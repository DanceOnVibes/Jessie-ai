import { KnowledgeItem } from "@/lib/jessie-core/knowledge-storage";
import { MemoryCard } from "./memory-card";

type MemoryGridProps = {
  items: KnowledgeItem[];
};

export function MemoryGrid({ items }: MemoryGridProps) {
  return (
    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <MemoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
