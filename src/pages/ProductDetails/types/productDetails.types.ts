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

export interface ProductDetails {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
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
  oldPrice?: number;
  image: string;
  secondaryImage: string;
  salePercent?: number;
}
