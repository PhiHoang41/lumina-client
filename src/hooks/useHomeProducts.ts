import { useQuery, useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import type { Product } from "../types/product";
import categoryService from "../services/categoryService";
import type { Product as ApiProduct } from "../services/productService";
import productService from "../services/productService";

export function useHomeProducts() {
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
  });

  const categories = categoriesData?.data || [];

  const productsQueries = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["products", "home", category.slug],
      queryFn: () =>
        productService.getProducts({
          category: category._id,
          limit: 8,
          isActive: true,
        }),
      enabled: categories.length > 0,
    })),
  });

  const productsByCategory = useMemo(() => {
    const result: Record<string, Product[]> = {};

    categories.forEach((category, index) => {
      const productsData = productsQueries[index].data;
      if (productsData) {
        result[category.slug] = productsData.data.map((item: ApiProduct) => {
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
        });
      }
    });

    return result;
  }, [categories, productsQueries]);

  const isLoadingProducts = productsQueries.some((q) => q.isLoading);

  return {
    categories,
    productsByCategory,
    isLoadingCategories,
    isLoadingProducts,
  };
}
