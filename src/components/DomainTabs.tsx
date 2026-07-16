import { useCallback, useEffect, useState } from "react";
import type { Domain } from "../types/catalog";

interface DomainTabsProps {
  activeDomain: Domain;
  onChange: (domain: Domain) => void;
}

const domains: { key: Domain; label: string }[] = [
  { key: "backend", label: "Backend" },
  { key: "frontend", label: "Frontend" },
];

export function DomainTabs({ activeDomain, onChange }: DomainTabsProps) {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      setAtBottom(scrollBottom >= pageBottom - 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(
    (domain: Domain) => {
      onChange(domain);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [onChange],
  );

  return (
    <div
      className={`fixed left-6 z-50 flex flex-col overflow-hidden rounded-xl border border-rule bg-paper shadow-lg ${atBottom ? "bottom-auto top-6" : "bottom-6 top-auto"}`}
      role="group"
      aria-label="Domain switcher"
    >
      {domains.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={activeDomain === key}
          onClick={() => handleClick(key)}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/30 ${activeDomain === key ? "bg-ink text-paper" : "text-muted hover:bg-white hover:text-ink"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
