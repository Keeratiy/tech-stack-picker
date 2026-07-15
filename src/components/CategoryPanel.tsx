import type { TechnologyCategory } from "../types/catalog";
import { TechnologyCard } from "./TechnologyCard";

interface CategoryPanelProps {
  category: TechnologyCategory;
  selectedIds: string[];
  onToggle: (category: TechnologyCategory, technologyId: string) => void;
}

export function CategoryPanel({
  category,
  selectedIds,
  onToggle,
}: CategoryPanelProps) {
  return (
    <article className="border border-rule bg-white/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 border-b border-rule pb-3">
        <div>
          <h3 className="text-sm font-semibold">{category.name}</h3>
          <p className="mt-1 text-xs leading-5 text-muted">
            {category.description}
          </p>
        </div>
        <span className="shrink-0 border border-rule px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
          {category.mode}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {category.technologies.map((technology) => (
          <TechnologyCard
            key={technology.id}
            category={category}
            technology={technology}
            selected={selectedIds.includes(technology.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </article>
  );
}
