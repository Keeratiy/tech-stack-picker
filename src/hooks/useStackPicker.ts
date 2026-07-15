import { useEffect, useState } from "react";
import type {
  Catalog,
  SelectionState,
  TechnologyCategory,
} from "../types/catalog";
import {
  filterCatalog,
  getSelectedCategories,
  sanitizeSelections,
  toggleSelection,
} from "../lib/stack";

const STORAGE_KEY = "tech-stack-picker:v1";

function readStoredSelections(catalog: Catalog): SelectionState {
  try {
    return sanitizeSelections(
      catalog,
      JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}"),
    );
  } catch {
    return {};
  }
}

export function useStackPicker(catalog: Catalog) {
  const [selections, setSelections] = useState<SelectionState>(() =>
    readStoredSelections(catalog),
  );
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  }, [selections]);

  function toggle(category: TechnologyCategory, technologyId: string) {
    setSelections((current) =>
      toggleSelection(current, category, technologyId),
    );
  }

  function clear() {
    setSelections({});
  }

  const selectedCategories = getSelectedCategories(catalog, selections);
  const selectedCount = selectedCategories.reduce(
    (count, item) => count + item.technologies.length,
    0,
  );

  return {
    catalog: filterCatalog(catalog, query),
    query,
    selections,
    selectedCategories,
    selectedCount,
    setQuery,
    toggle,
    clear,
  };
}
