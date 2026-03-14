import api from "./api";
import type { Cart, CartItem, CartResponse, CartCountResponse, AddToCartPayload, UpdateCartPayload, RemoveFromCartPayload } from "../pages/Cart/types/cart.types";

export type { Cart, CartItem, CartResponse, CartCountResponse, AddToCartPayload, UpdateCartPayload, RemoveFromCartPayload };

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
