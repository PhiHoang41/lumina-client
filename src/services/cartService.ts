import api from "./api";

export interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    images: string[];
  };
  variant: {
    _id: string;
    size?: string;
    color?: string;
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

const cartService = {
  getCart: async (): Promise<CartResponse> => {
    const response = await api.get<CartResponse>("/cart");
    return response.data;
  },

  getCartCount: async (): Promise<CartCountResponse> => {
    const response = await api.get<CartCountResponse>("/cart/count");
    return response.data;
  },

  addToCart: async (payload: AddToCartPayload): Promise<CartResponse> => {
    const response = await api.post<CartResponse>("/cart/add", payload);
    return response.data;
  },

  updateCart: async (payload: UpdateCartPayload): Promise<CartResponse> => {
    const response = await api.put<CartResponse>("/cart/update", payload);
    return response.data;
  },

  removeFromCart: async (payload: RemoveFromCartPayload): Promise<CartResponse> => {
    const response = await api.delete<CartResponse>("/cart/remove", { data: payload });
    return response.data;
  },
};

export default cartService;
