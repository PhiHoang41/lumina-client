import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";
import type { Product as ApiProduct } from "../services/productService";

interface UseProductDetailsResult {
  product: ApiProduct | null;
  relatedProducts: ApiProduct[];
  isLoading: boolean;
  error: unknown;
  isError: boolean;
}

export function useProductDetails(slug: string): UseProductDetailsResult {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["product", "slug", slug],
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });

  const product = data?.data || null;
  const relatedProducts = data?.relatedProducts || [];

  return {
    product,
    relatedProducts,
    isLoading,
    error,
    isError,
  };
}
