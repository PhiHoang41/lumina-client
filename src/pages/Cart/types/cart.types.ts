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
  appliedCoupon?: AppliedCoupon | null;
}

export type CouponType = "PERCENTAGE" | "FIXED_AMOUNT";

export interface Coupon {
  _id: string;
  code: string;
  type: CouponType;
  value: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  description?: string;
}

export interface AppliedCoupon {
  code: string;
  type: CouponType;
  value: number;
  maxDiscountAmount?: number;
}

export interface ValidateCouponResponse {
  success: boolean;
  message?: string;
  data?: {
    code: string;
    type: CouponType;
    value: number;
    discountAmount: number;
    finalAmount: number;
  };
}
