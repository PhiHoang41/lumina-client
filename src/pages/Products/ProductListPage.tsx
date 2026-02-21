import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { FilterState } from "./types/product.types";
import type { Product } from "../../services/productService";
import Breadcrumb from "./components/Breadcrumb";
import ProductSidebar from "./components/Sidebar/ProductSidebar";
import ProductToolbar from "./components/ProductList/ProductToolbar";
import ProductCard from "../../components/ProductCard";
import Pagination from "./components/ProductList/Pagination";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

const ITEMS_PER_PAGE = 9;

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRangeInput, setPriceRangeInput] = useState<[number, number]>([
    0, 10000000,
  ]);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000000],
    selectedCategories: [],
    selectedColors: [],
    selectedSizes: [],
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  });

  const { data: allProductsData } = useQuery({
    queryKey: ["allProducts"],
    queryFn: () => productService.getProducts({ isActive: true, limit: 1000 }),
  });

  const categories = categoriesData?.data || [];
  const allProducts = useMemo(() => {
    return allProductsData?.data
      ? allProductsData.data.map((item: Product) => {
          const variants = item.variants || [];
          const activeVariants = variants.filter(
            (v) => v.isActive && v.stock > 0,
          );
          const minPrice =
            activeVariants.length > 0
              ? Math.min(...activeVariants.map((v) => v.price))
              : variants.length > 0
                ? Math.min(...variants.map((v) => v.price))
                : 0;

          const colors = new Set(variants.map((v) => v.color.name));
          const color = Array.from(colors)[0] || "";

          return {
            id: parseInt(item._id),
            name: item.name,
            slug: item.slug,
            price: minPrice,
            image: item.images?.[0] || "",
            color,
            description: item.description || "",
          };
        })
      : [];
  }, [allProductsData]);

  const queryParams = useMemo(() => {
    const params: Record<string, string | number | boolean> = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      isActive: true,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    if (filters.priceRange[0] > 0) {
      params.minPrice = filters.priceRange[0];
    }
    if (filters.priceRange[1] < 10000000) {
      params.maxPrice = filters.priceRange[1];
    }

    if (filters.selectedCategories.length > 0) {
      params.category = filters.selectedCategories[0];
    }

    if (filters.selectedColors.length > 0) {
      params.color = filters.selectedColors[0];
    }

    if (filters.selectedSizes.length > 0) {
      params.size = filters.selectedSizes[0];
    }

    return params;
  }, [filters, currentPage, searchQuery]);

  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productService.getProducts(queryParams),
  });

  const products = useMemo(() => {
    return productsData?.data
      ? productsData.data.map((item: Product) => {
          const variants = item.variants || [];
          const activeVariants = variants.filter(
            (v) => v.isActive && v.stock > 0,
          );
          const minPrice =
            activeVariants.length > 0
              ? Math.min(...activeVariants.map((v) => v.price))
              : variants.length > 0
                ? Math.min(...variants.map((v) => v.price))
                : 0;

          const colors = new Set(variants.map((v) => v.color.name));
          const color = Array.from(colors)[0] || "";

          return {
            id: parseInt(item._id),
            name: item.name,
            slug: item.slug,
            price: minPrice,
            image: item.images?.[0] || "",
            color,
            description: item.description || "",
          };
        })
      : [];
  }, [productsData]);
  const total = productsData?.pagination.total || 0;
  const totalPages = productsData?.pagination.totalPages || 1;

  const filterOptions = useMemo(() => {
    const categoryOptions = categories.map((cat) => ({
      id: cat._id,
      name: cat.name,
      count: 0,
    }));

    const colorSet = new Set<string>();
    allProducts.forEach((product) => {
      if (product.color) {
        colorSet.add(product.color);
      }
    });

    const colorOptions = Array.from(colorSet).map((color) => ({
      id: color,
      name: color,
      count: 0,
    }));

    const sizeSet = new Set<string>();
    allProductsData?.data.forEach((item) => {
      item.variants?.forEach((variant) => {
        if (variant.isActive) {
          sizeSet.add(variant.size);
        }
      });
    });

    const sizeOptions = Array.from(sizeSet).map((size) => ({
      id: size,
      name: size,
      count: 0,
    }));

    let minPrice = 0;
    let maxPrice = 10000000;
    if (allProducts.length > 0) {
      const prices = allProducts.map((p) => p.price);
      minPrice = Math.min(...prices);
      maxPrice = Math.max(...prices);
    }

    return {
      categories: categoryOptions,
      colors: colorOptions,
      sizes: sizeOptions,
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
    };
  }, [categories, allProducts, allProductsData]);

  const currentStart = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const currentEnd = Math.min(currentPage * ITEMS_PER_PAGE, total);

  const handlePriceChange = (value: [number, number]) => {
    setPriceRangeInput(value);
  };

  const handlePriceFilter = () => {
    setFilters((prev) => ({ ...prev, priceRange: priceRangeInput }));
    setCurrentPage(1);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? []
        : [categoryId],
    }));
    setCurrentPage(1);
  };

  const handleColorToggle = (colorId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedColors: prev.selectedColors.includes(colorId) ? [] : [colorId],
    }));
    setCurrentPage(1);
  };

  const handleSizeToggle = (sizeId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.includes(sizeId) ? [] : [sizeId],
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    const queryString = params.toString();
    navigate(`/products${queryString ? '?' + queryString : ''}`);
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
                  filterOptions={filterOptions}
                  filters={filters}
                  priceRangeInput={priceRangeInput}
                  onPriceChange={handlePriceChange}
                  onPriceFilter={handlePriceFilter}
                  onCategoryToggle={handleCategoryToggle}
                  onColorToggle={handleColorToggle}
                  onSizeToggle={handleSizeToggle}
                />
              </div>

              <div className="col-lg-9 col-md-12">
                <div className="shop_title">
                  <h1>shop</h1>
                </div>

                <ProductToolbar
                  totalProducts={total}
                  currentStart={currentStart}
                  currentEnd={currentEnd}
                  searchQuery={searchQuery}
                  onClearSearch={handleClearSearch}
                />

                {isLoading ? (
                  <div className="text-center py-10">
                    <p>Đang tải sản phẩm...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-10">
                    <p className="text-red-500">
                      Có lỗi xảy ra khi tải danh sách sản phẩm
                    </p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-10">
                    <p>Không tìm thấy sản phẩm nào</p>
                  </div>
                ) : (
                  <>
                    <div className="row shop_wrapper">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          viewMode="grid-3"
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListPage;
