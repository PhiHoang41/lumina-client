import { useState, useMemo } from "react";
import type { ViewMode, SortOption, FilterState } from "./types/product.types";
import { mockProducts } from "./data/mockProducts";
import { mockFilterOptions } from "./data/mockFilters";
import Breadcrumb from "./components/Breadcrumb";
import ProductSidebar from "./components/Sidebar/ProductSidebar";
import ProductToolbar from "./components/ProductList/ProductToolbar";
import ProductCard from "./components/ProductList/ProductCard";
import Pagination from "./components/ProductList/Pagination";

const ITEMS_PER_PAGE = 9;

const ProductListPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-3");
  const [sortOption, setSortOption] = useState<SortOption>("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [
      mockFilterOptions.priceRange.min,
      mockFilterOptions.priceRange.max,
    ],
    selectedCategories: [],
    selectedManufacturers: [],
    selectedColors: [],
    selectedTags: [],
  });

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Price filter
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Category filter
      if (
        filters.selectedCategories.length > 0 &&
        !filters.selectedCategories.includes(product.category)
      ) {
        return false;
      }

      // Manufacturer filter
      if (
        filters.selectedManufacturers.length > 0 &&
        !filters.selectedManufacturers.includes(product.manufacturer)
      ) {
        return false;
      }

      // Color filter
      if (
        filters.selectedColors.length > 0 &&
        !filters.selectedColors.includes(product.color)
      ) {
        return false;
      }

      // Tag filter
      if (
        filters.selectedTags.length > 0 &&
        !filters.selectedTags.some((tag) => product.tags.includes(tag))
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortOption) {
      case "rating":
        return products.sort((a, b) => b.rating - a.rating);
      case "popularity":
        return products.sort((a, b) => a.id - b.id);
      case "newness":
        return products.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
      case "price-low":
        return products.sort((a, b) => a.price - b.price);
      case "price-high":
        return products.sort((a, b) => b.price - a.price);
      case "name":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const currentStart = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const currentEnd = Math.min(
    currentPage * ITEMS_PER_PAGE,
    sortedProducts.length,
  );

  // Filter handlers
  const handlePriceChange = (value: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: value }));
  };

  const handlePriceFilter = () => {
    setCurrentPage(1);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter((id) => id !== categoryId)
        : [...prev.selectedCategories, categoryId],
    }));
    setCurrentPage(1);
  };

  const handleManufacturerToggle = (manufacturerId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedManufacturers: prev.selectedManufacturers.includes(manufacturerId)
        ? prev.selectedManufacturers.filter((id) => id !== manufacturerId)
        : [...prev.selectedManufacturers, manufacturerId],
    }));
    setCurrentPage(1);
  };

  const handleColorToggle = (colorId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(colorId)
        ? prev.selectedColors.filter((id) => id !== colorId)
        : [...prev.selectedColors, colorId],
    }));
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Breadcrumb />

      <div className="shop_area shop_reverse">
        <div className="container">
          <div className="shop_inner_area">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <ProductSidebar
                  filterOptions={mockFilterOptions}
                  filters={filters}
                  onPriceChange={handlePriceChange}
                  onPriceFilter={handlePriceFilter}
                  onCategoryToggle={handleCategoryToggle}
                  onManufacturerToggle={handleManufacturerToggle}
                  onColorToggle={handleColorToggle}
                  onTagToggle={handleTagToggle}
                />
              </div>

              <div className="col-lg-9 col-md-12">
                <div className="shop_title">
                  <h1>shop</h1>
                </div>

                <ProductToolbar
                  viewMode={viewMode}
                  onViewModeChange={handleViewModeChange}
                  sortOption={sortOption}
                  onSortChange={handleSortChange}
                  totalProducts={sortedProducts.length}
                  currentStart={currentStart}
                  currentEnd={currentEnd}
                />

                <div
                  className={`row shop_wrapper ${viewMode === "list" ? "list_view" : ""}`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
