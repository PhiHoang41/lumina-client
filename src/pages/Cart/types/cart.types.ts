export interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    images: string[];
    slug?: string;
  };
  variant: {
    _id: string;
    size?: string;
    color?: {
      name: string;
      hex?: string;
    };
    price: number;
    stock?: number;
  };
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string | null;
  user: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartResponse {
  success: boolean;
  message?: string;
  cart?: Cart;
}

export interface CartCountResponse {
  success: boolean;
  itemCount: number;
}

export interface AddToCartPayload {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
  variantId: string;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}
