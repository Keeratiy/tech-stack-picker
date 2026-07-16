import { useCallback, useEffect, useState } from "react";
import { Monitor, Server } from "lucide-react";
import type { Domain } from "../types/catalog";

interface DomainTabsProps {
  activeDomain: Domain;
  onChange: (domain: Domain) => void;
}

const domains: { key: Domain; label: string; Icon: typeof Server }[] = [
  { key: "backend", label: "Backend", Icon: Server },
  { key: "frontend", label: "Frontend", Icon: Monitor },
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
      aria-label="Domain switcher"
    >
      {domains.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          aria-pressed={activeDomain === key}
          aria-label={label}
          title={label}
          onClick={() => handleClick(key)}
          className={`grid size-10 place-items-center transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/30 ${activeDomain === key ? "bg-ink text-paper" : "text-muted hover:bg-white hover:text-ink"}`}
        >
          <Icon className="size-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
