import api from "./api";

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductVariant {
  _id: string;
  size: string;
  color: {
    name: string;
    hex: string;
  };
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: Category;
  images: string[];
  variants: ProductVariant[];
  isActive: boolean;
  totalStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
  relatedProducts?: Product[];
}

const productService = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: string;
    size?: string;
    color?: string;
    inStock?: boolean;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>("/products", {
      params,
    });
    return response.data;
  },

  getProductById: async (id: string): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(`/products/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<ProductResponse> => {
    const response = await api.get<ProductResponse>(`/products/slug/${slug}`);
    return response.data;
  },
};

export default productService;
