export interface CartItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
  couponCode: string;
  discount: number;
}

export interface CartTotals {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}
