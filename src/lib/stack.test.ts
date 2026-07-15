import { describe, expect, it } from "vitest";
import {
  filterCatalog,
  getSelectedCategories,
  sanitizeSelections,
  toggleSelection,
} from "./stack";
import type { Catalog, TechnologyCategory } from "../types/catalog";

const singleCategory: TechnologyCategory = {
  id: "runtime",
  domain: "backend",
  name: "Runtime",
  description: "Server execution",
  mode: "single",
  technologies: [
    {
      id: "node",
      name: "Node.js",
      description: "JavaScript server runtime",
      strengths: ["Fast I/O"],
      icon: "nodedotjs",
      website: "https://nodejs.org",
    },
    {
      id: "bun",
      name: "Bun",
      description: "Fast JavaScript runtime",
      strengths: ["Quick startup"],
      icon: "bun",
      website: "https://bun.sh",
    },
  ],
};
const multiCategory: TechnologyCategory = {
  ...singleCategory,
  id: "custom",
  name: "Custom",
  mode: "multi",
};
const catalog: Catalog = { categories: [singleCategory, multiCategory] };

describe("stack utilities", () => {
  it("replaces and deselects choices in a single-select category", () => {
    const node = toggleSelection({}, singleCategory, "node");
    expect(node.runtime).toEqual(["node"]);
    const bun = toggleSelection(node, singleCategory, "bun");
    expect(bun.runtime).toEqual(["bun"]);
    expect(toggleSelection(bun, singleCategory, "bun").runtime).toEqual([]);
  });

  it("toggles individual choices in a multi-select category", () => {
    const first = toggleSelection({}, multiCategory, "node");
    const second = toggleSelection(first, multiCategory, "bun");
    expect(second.custom).toEqual(["node", "bun"]);
    expect(toggleSelection(second, multiCategory, "node").custom).toEqual([
      "bun",
    ]);
  });

  it("searches names, descriptions, strengths, and category metadata without changing selection order", () => {
    expect(
      filterCatalog(catalog, "quick startup").categories[0].technologies.map(
        (technology) => technology.id,
      ),
    ).toEqual(["bun"]);
    expect(filterCatalog(catalog, "server").categories).toHaveLength(2);
    expect(
      getSelectedCategories(catalog, {
        runtime: ["bun", "node"],
      })[0].technologies.map((technology) => technology.id),
    ).toEqual(["node", "bun"]);
  });

  it("removes stale persisted ids and limits old single-select data", () => {
    expect(
      sanitizeSelections(catalog, {
        runtime: ["node", "bun", "gone"],
        custom: ["bun", "gone"],
      }),
    ).toEqual({ runtime: ["node"], custom: ["bun"] });
    expect(sanitizeSelections(catalog, "not an object")).toEqual({});
  });
});
