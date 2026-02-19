export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  color: string;
  description: string;
}

export interface FilterOptions {
  categories: CategoryOption[];
  colors: ColorOption[];
  sizes: SizeOption[];
  priceRange: {
    min: number;
    max: number;
  };
}

export interface CategoryOption {
  id: string;
  name: string;
  count: number;
}

export interface ColorOption {
  id: string;
  name: string;
  count: number;
}

export interface SizeOption {
  id: string;
  name: string;
  count: number;
}

export type ViewMode = "grid-3" | "grid-4" | "grid-5" | "list";

export interface FilterState {
  priceRange: [number, number];
  selectedCategories: string[];
  selectedColors: string[];
  selectedSizes: string[];
}
