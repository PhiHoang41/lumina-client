export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  image: string;
  hoverImage: string;
  category: string;
  manufacturer: string;
  color: string;
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  description: string;
}

export interface FilterOptions {
  categories: CategoryOption[];
  manufacturers: ManufacturerOption[];
  colors: ColorOption[];
  tags: string[];
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

export interface ManufacturerOption {
  id: string;
  name: string;
  count: number;
}

export interface ColorOption {
  id: string;
  name: string;
  count: number;
}

export type ViewMode = "grid-3" | "grid-4" | "grid-5" | "list";
export type SortOption =
  | "rating"
  | "popularity"
  | "newness"
  | "price-low"
  | "price-high"
  | "name";

export interface FilterState {
  priceRange: [number, number];
  selectedCategories: string[];
  selectedManufacturers: string[];
  selectedColors: string[];
  selectedTags: string[];
}
