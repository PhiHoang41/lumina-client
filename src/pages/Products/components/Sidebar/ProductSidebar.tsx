import type { FilterOptions, FilterState } from "../../types/product.types";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import ManufacturerFilter from "./ManufacturerFilter";
import ColorFilter from "./ColorFilter";
import TagFilter from "./TagFilter";

interface ProductSidebarProps {
  filterOptions: FilterOptions;
  filters: FilterState;
  onPriceChange: (value: [number, number]) => void;
  onPriceFilter: () => void;
  onCategoryToggle: (categoryId: string) => void;
  onManufacturerToggle: (manufacturerId: string) => void;
  onColorToggle: (colorId: string) => void;
  onTagToggle: (tag: string) => void;
}

const ProductSidebar = ({
  filterOptions,
  filters,
  onPriceChange,
  onPriceFilter,
  onCategoryToggle,
  onManufacturerToggle,
  onColorToggle,
  onTagToggle,
}: ProductSidebarProps) => {
  return (
    <div className="sidebar_widget">
      <PriceFilter
        min={filterOptions.priceRange.min}
        max={filterOptions.priceRange.max}
        value={filters.priceRange}
        onChange={onPriceChange}
        onFilter={onPriceFilter}
      />

      <CategoryFilter
        categories={filterOptions.categories}
        selectedCategories={filters.selectedCategories}
        onToggle={onCategoryToggle}
      />

      <ManufacturerFilter
        manufacturers={filterOptions.manufacturers}
        selectedManufacturers={filters.selectedManufacturers}
        onToggle={onManufacturerToggle}
      />

      <ColorFilter
        colors={filterOptions.colors}
        selectedColors={filters.selectedColors}
        onToggle={onColorToggle}
      />

      <TagFilter
        tags={filterOptions.tags}
        selectedTags={filters.selectedTags}
        onToggle={onTagToggle}
      />
    </div>
  );
};

export default ProductSidebar;
