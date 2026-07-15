import { Search, X } from "lucide-react";

interface AppHeaderProps {
  query: string;
  selectedCount: number;
  onQueryChange: (query: string) => void;
  onClearQuery: () => void;
}

export function AppHeader({
  query,
  selectedCount,
  onQueryChange,
  onClearQuery,
}: AppHeaderProps) {
  return (
    <header className="border-b border-rule pb-5 sm:flex sm:items-end sm:justify-between sm:gap-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral">
          Field notes / 2026
        </p>
        <h1
          id="picker-heading"
          tabIndex={-1}
          className="mt-1 font-editorial text-4xl leading-none font-medium outline-none sm:text-5xl"
        >
          Tech Stack Picker
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Compose a considered stack. One choice per discipline; Custom remains
          deliberately open.
        </p>
      </div>
      <div className="mt-5 flex items-center gap-3 sm:mt-0">
        <label className="relative block min-w-0 flex-1 sm:w-72">
          <span className="sr-only">Search technologies</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search the catalog"
            className="h-10 w-full border border-rule bg-white py-2 pr-9 pl-9 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink focus-visible:ring-2 focus-visible:ring-coral/30"
          />
          {query && (
            <button
              type="button"
              onClick={onClearQuery}
              className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center text-muted transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-coral/30"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </label>
        <span className="hidden border-l border-rule pl-3 text-right text-xs leading-tight text-muted sm:block">
          <strong className="block text-lg font-medium text-ink">
            {selectedCount}
          </strong>
          {"selected"}
        </span>
      </div>
    </header>
  );
}
