export type Domain = "backend" | "frontend";
export type SelectionMode = "single" | "multi";

export interface Technology {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  icon: string;
  website: string;
}

export interface TechnologyCategory {
  id: string;
  domain: Domain;
  name: string;
  description: string;
  mode: SelectionMode;
  technologies: Technology[];
}

export interface Catalog {
  categories: TechnologyCategory[];
}

export type SelectionState = Record<string, string[]>;

export interface SelectedCategory {
  category: TechnologyCategory;
  technologies: Technology[];
}
