import type {
  Domain,
  SelectionState,
  TechnologyCategory,
} from "../types/catalog";
import { CategoryPanel } from "./CategoryPanel";

interface DomainCatalogProps {
  domain: Domain;
  categories: TechnologyCategory[];
  selections: SelectionState;
  onToggle: (category: TechnologyCategory, technologyId: string) => void;
  className?: string;
}

export function DomainCatalog({
  domain,
  categories,
  selections,
  onToggle,
  className = "",
}: DomainCatalogProps) {
  const title = domain === "backend" ? "Backend" : "Frontend";
  const subtitle =
    domain === "backend"
      ? "The systems that run, store, and deliver the product."
      : "The interface, interaction, and client-side toolkit.";
  if (!categories.length) return null;
  return (
    <section className={className} aria-labelledby={`${domain}-heading`}>
      <div className="mb-4 flex items-baseline gap-3">
        <h2
          id={`${domain}-heading`}
          className="font-editorial text-2xl font-medium"
        >
          {title}
        </h2>
        <p className="hidden text-xs text-muted sm:block">{subtitle}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryPanel
            key={category.id}
            category={category}
            selectedIds={selections[category.id] ?? []}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}
