import type {
  Catalog,
  SelectedCategory,
  SelectionState,
  TechnologyCategory,
} from "../types/catalog";

export function toggleSelection(
  selections: SelectionState,
  category: TechnologyCategory,
  technologyId: string,
): SelectionState {
  const current = selections[category.id] ?? [];
  const isSelected = current.includes(technologyId);
  const next =
    category.mode === "single"
      ? isSelected
        ? []
        : [technologyId]
      : isSelected
        ? current.filter((id) => id !== technologyId)
        : [...current, technologyId];

  return { ...selections, [category.id]: next };
}

export function filterCatalog(catalog: Catalog, query: string): Catalog {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return catalog;

  return {
    categories: catalog.categories.flatMap((category) => {
      const categoryMatches = `${category.name} ${category.description}`
        .toLocaleLowerCase()
        .includes(normalized);
      const technologies = category.technologies.filter(
        (technology) =>
          categoryMatches ||
          [technology.name, technology.description, ...technology.strengths]
            .join(" ")
            .toLocaleLowerCase()
            .includes(normalized),
      );
      return technologies.length ? [{ ...category, technologies }] : [];
    }),
  };
}

export function getSelectedCategories(
  catalog: Catalog,
  selections: SelectionState,
): SelectedCategory[] {
  return catalog.categories.flatMap((category) => {
    const selectedIds = selections[category.id] ?? [];
    const technologies = category.technologies.filter((technology) =>
      selectedIds.includes(technology.id),
    );
    return technologies.length ? [{ category, technologies }] : [];
  });
}

export function sanitizeSelections(
  catalog: Catalog,
  selections: unknown,
): SelectionState {
  if (
    !selections ||
    typeof selections !== "object" ||
    Array.isArray(selections)
  )
    return {};

  return catalog.categories.reduce<SelectionState>((clean, category) => {
    const candidate = (selections as Record<string, unknown>)[category.id];
    if (!Array.isArray(candidate)) return clean;
    const validIds = candidate.filter(
      (id): id is string =>
        typeof id === "string" &&
        category.technologies.some((technology) => technology.id === id),
    );
    if (validIds.length)
      clean[category.id] =
        category.mode === "single" ? [validIds[0]] : validIds;
    return clean;
  }, {});
}
