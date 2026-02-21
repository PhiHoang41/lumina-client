export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface ProductVariant {
  _id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
}

export interface ProductDetails {
  id: number;
  name: string;
  slug: string;
  minPrice: number;
  maxPrice: number;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  specifications: Specification[];
  moreInfo: string;
  reviews: Review[];
}

export interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  secondaryImage: string;
}
