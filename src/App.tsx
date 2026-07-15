import { useEffect, useRef, useState } from "react";
import technologies from "./data/technologies.json";
import { AppHeader } from "./components/AppHeader";
import { DomainCatalog } from "./components/DomainCatalog";
import { MobileViewTabs } from "./components/MobileViewTabs";
import { SelectedStack } from "./components/SelectedStack";
import { StackSummary } from "./components/StackSummary";
import { useStackPicker } from "./hooks/useStackPicker";
import type { Catalog } from "./types/catalog";

const catalog = technologies as Catalog;

function App() {
  const picker = useStackPicker(catalog);
  const [pageView, setPageView] = useState<"picker" | "summary">("picker");
  const [mobileView, setMobileView] = useState<"picker" | "stack">("picker");
  const shouldFocusView = useRef(false);

  useEffect(() => {
    if (!shouldFocusView.current) return;

    document
      .getElementById(
        pageView === "summary" ? "summary-heading" : "picker-heading",
      )
      ?.focus();
    shouldFocusView.current = false;
  }, [pageView]);

  function navigateTo(view: "picker" | "summary") {
    shouldFocusView.current = true;
    setPageView(view);
  }

  if (pageView === "summary") {
    return (
      <main className="min-h-svh bg-paper text-ink">
        <div className="mx-auto max-w-[1720px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
          <StackSummary
            selectedCategories={picker.selectedCategories}
            selectedCount={picker.selectedCount}
            onBack={() => navigateTo("picker")}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-paper text-ink">
      <div className="mx-auto max-w-[1720px] px-4 py-4 sm:px-6 lg:px-8 lg:py-7">
        <AppHeader
          query={picker.query}
          selectedCount={picker.selectedCount}
          onQueryChange={picker.setQuery}
          onClearQuery={() => picker.setQuery("")}
        />
        <MobileViewTabs
          activeView={mobileView}
          selectedCount={picker.selectedCount}
          onChange={setMobileView}
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section
            className={`lg:col-span-10 ${mobileView === "stack" ? "hidden lg:block" : ""}`}
            aria-label="Technology picker"
          >
            <DomainCatalog
              domain="backend"
              categories={picker.catalog.categories.filter(
                (category) => category.domain === "backend",
              )}
              selections={picker.selections}
              onToggle={picker.toggle}
            />
            <DomainCatalog
              domain="frontend"
              categories={picker.catalog.categories.filter(
                (category) => category.domain === "frontend",
              )}
              selections={picker.selections}
              onToggle={picker.toggle}
              className="mt-10 border-t border-rule pt-10"
            />
            {!picker.catalog.categories.length && (
              <div className="border border-dashed border-rule px-5 py-12 text-center text-sm text-muted">
                No technologies match “{picker.query}”. Try a different term.
              </div>
            )}
          </section>
          <aside
            className={`lg:col-span-2 ${mobileView === "picker" ? "hidden lg:block" : ""}`}
            aria-label="Selected stack"
          >
            <div className="lg:sticky lg:top-7 lg:max-h-[calc(100svh-3.5rem)] lg:overflow-y-auto lg:pr-1">
              <SelectedStack
                selectedCategories={picker.selectedCategories}
                selectedCount={picker.selectedCount}
                onClear={picker.clear}
                onViewSummary={() => navigateTo("summary")}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default App;
