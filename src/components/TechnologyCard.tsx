import { Check } from "lucide-react";
import { useState } from "react";
import type { Technology, TechnologyCategory } from "../types/catalog";

interface TechnologyCardProps {
  category: TechnologyCategory;
  technology: Technology;
  selected: boolean;
  onToggle: (category: TechnologyCategory, technologyId: string) => void;
}

export function TechnologyCard({
  category,
  technology,
  selected,
  onToggle,
}: TechnologyCardProps) {
  const [iconFailed, setIconFailed] = useState(false);
  const tooltipId = `${category.id}-${technology.id}-tooltip`;
  return (
    <div className="group relative">
      <button
        type="button"
        aria-pressed={selected}
        aria-describedby={tooltipId}
        onClick={() => onToggle(category, technology.id)}
        className={`flex min-h-20 w-full flex-col justify-between border p-2.5 text-left transition-[background-color,border-color,transform] duration-200 focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-coral ${selected ? "border-coral bg-coral-soft" : "border-rule bg-paper hover:-translate-y-0.5 hover:border-ink"}`}
      >
        <span className="flex items-start justify-between gap-2">
          {iconFailed ? (
            <span
              className="grid size-5 shrink-0 place-items-center bg-ink font-editorial text-[10px] text-paper"
              aria-hidden="true"
            >
              {technology.name[0]}
            </span>
          ) : (
            <img
              src={`https://cdn.simpleicons.org/${technology.icon}/191919`}
              className="size-5 shrink-0"
              alt=""
              onError={() => setIconFailed(true)}
            />
          )}
          <span
            className={`grid size-4 shrink-0 place-items-center border transition-colors ${selected ? "border-coral bg-coral text-white" : "border-rule text-transparent"}`}
            aria-hidden="true"
          >
            <Check className="size-3" />
          </span>
        </span>
        <span className="mt-2 line-clamp-2 text-xs leading-4 font-medium">
          {technology.name}
        </span>
      </button>
      <div
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute z-20 right-0 bottom-[calc(100%+0.4rem)] hidden w-60 border border-ink bg-ink p-3 text-xs leading-5 text-paper group-hover:block"
      >
        <p>{technology.description}</p>
        <p className="mt-2 border-t border-white/20 pt-2 text-paper/70">
          {technology.strengths.join(" · ")}
        </p>
      </div>
    </div>
  );
}
