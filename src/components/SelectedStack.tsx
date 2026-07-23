import { ArrowRight, ExternalLink, Layers3, Trash2 } from "lucide-react";
import type { SelectedCategory } from "../types/catalog";

interface SelectedStackProps {
  selectedCategories: SelectedCategory[];
  selectedCount: number;
  onClear: () => void;
  onViewSummary: () => void;
}

export function SelectedStack({
  selectedCategories,
  selectedCount,
  onClear,
  onViewSummary,
}: SelectedStackProps) {
  const domains = ["backend", "frontend"] as const;
  return (
    <section
      className="flex flex-col border border-rule bg-white/60 lg:h-[calc(100svh-3.5rem)]"
      aria-labelledby="stack-heading"
    >
      <header className="flex items-start justify-between border-b border-rule p-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-coral">
            Live stack
          </p>
          <h2
            id="stack-heading"
            className="mt-1 font-editorial text-2xl font-medium"
          >
            Your selection
          </h2>
        </div>
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="grid size-8 place-items-center border border-rule text-muted transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-coral/30"
            aria-label="Clear stack"
            title="Clear stack"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        )}
      </header>
      {selectedCount === 0 ? (
        <div className="p-5">
          <Layers3 className="size-5 text-coral" aria-hidden="true" />
          <p className="mt-3 text-sm leading-6 text-muted">
            Nothing selected yet. Choose technologies from the catalog to
            annotate your stack here.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col p-4 pb-28 lg:pb-4">
          <div className="min-h-0 flex-1 overflow-y-auto lg:pr-1">
            {domains.map((domain) => {
              const groups = selectedCategories.filter(
                (item) => item.category.domain === domain,
              );
              if (!groups.length) return null;
              return (
                <div key={domain} className="mb-6 last:mb-0">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
                    {domain}
                  </p>
                  <div className="space-y-3">
                    {groups.map(({ category, technologies }) => (
                      <section key={category.id}>
                        <h3 className="text-[11px] font-semibold">
                          {category.name}
                        </h3>
                        <ul className="mt-1.5 space-y-1.5">
                          {technologies.map((technology) => (
                            <li
                              key={technology.id}
                              className="border-l-2 border-coral bg-paper px-2 py-2 text-xs leading-4 transition-opacity duration-200"
                            >
                              <span className="flex items-start justify-between gap-2">
                                <strong className="min-w-0 font-medium">
                                  {technology.name}
                                </strong>
                                <span className="flex shrink-0 items-center gap-2">
                                  <a
                                    href={technology.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid size-6 place-items-center border border-rule text-muted transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-coral/30"
                                    aria-label={`Open ${technology.name} official website`}
                                    title={`Open ${technology.name} official website`}
                                  >
                                    <ExternalLink
                                      className="size-3"
                                      aria-hidden="true"
                                    />
                                  </a>
                                  <span className="border border-rule px-1 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-muted">
                                    {domain}
                                  </span>
                                </span>
                              </span>
                              <span className="mt-1 block text-muted">
                                {technology.description}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fixed inset-x-4 bottom-0 z-20 border-t border-rule bg-white/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:inset-x-6 lg:static lg:z-auto lg:-mx-4 lg:mt-auto">
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted">
              {selectedCount} {selectedCount === 1 ? "choice" : "choices"}{" "}
              recorded
            </p>
            <button
              type="button"
              onClick={onViewSummary}
              className="mt-4 flex h-10 w-full items-center justify-between bg-ink px-3 text-xs font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-coral focus-visible:ring-2 focus-visible:ring-coral/30 focus-visible:ring-offset-2"
            >
              View summary
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
