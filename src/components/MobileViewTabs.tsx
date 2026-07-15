interface MobileViewTabsProps {
  activeView: "picker" | "stack";
  selectedCount: number;
  onChange: (view: "picker" | "stack") => void;
}

export function MobileViewTabs({
  activeView,
  selectedCount,
  onChange,
}: MobileViewTabsProps) {
  return (
    <div
      className="mt-5 flex border border-rule p-1 lg:hidden"
      role="tablist"
      aria-label="Mobile view"
    >
      {(["picker", "stack"] as const).map((view) => (
        <button
          key={view}
          type="button"
          role="tab"
          aria-selected={activeView === view}
          onClick={() => onChange(view)}
          className={`h-9 flex-1 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:ring-2 focus-visible:ring-coral/30 ${activeView === view ? "bg-ink text-paper" : "text-muted hover:bg-white hover:text-ink"}`}
        >
          {view === "picker" ? "Picker" : `Stack (${selectedCount})`}
        </button>
      ))}
    </div>
  );
}
