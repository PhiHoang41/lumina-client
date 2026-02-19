import type { FilterOptions, FilterState } from "../../types/product.types";
import PriceFilter from "./PriceFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";

interface ProductSidebarProps {
  filterOptions: FilterOptions;
  filters: FilterState;
  priceRangeInput: [number, number];
  onPriceChange: (value: [number, number]) => void;
  onPriceFilter: () => void;
  onCategoryToggle: (categoryId: string) => void;
  onColorToggle: (colorId: string) => void;
  onSizeToggle: (sizeId: string) => void;
}

const ProductSidebar = ({
  filterOptions,
  filters,
  priceRangeInput,
  onPriceChange,
  onPriceFilter,
  onCategoryToggle,
  onColorToggle,
  onSizeToggle,
}: ProductSidebarProps) => {
  return (
    <div className="sidebar_widget">
      <PriceFilter
        min={filterOptions.priceRange.min}
        max={filterOptions.priceRange.max}
        value={priceRangeInput}
        onChange={onPriceChange}
        onFilter={onPriceFilter}
      />

      <CategoryFilter
        categories={filterOptions.categories}
        selectedCategories={filters.selectedCategories}
        onToggle={onCategoryToggle}
      />

      <ColorFilter
        colors={filterOptions.colors}
        selectedColors={filters.selectedColors}
        onToggle={onColorToggle}
      />

      <SizeFilter
        sizes={filterOptions.sizes}
        selectedSizes={filters.selectedSizes}
        onToggle={onSizeToggle}
      />
    </div>
  );
};

export default ProductSidebar;
