import api from "./api";

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    image?: string;
  };
  variant: {
    _id: string;
    size: string;
    color?: { name: string };
  };
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  paymentMethod: "COD" | "VNPAY";
  couponCode?: string;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order?: {
    _id: string;
    vnpTxnRef?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    note?: string;
    products: OrderItem[];
    subtotal: number;
    discountAmount: number;
    totalPrice: number;
    paymentMethod: string;
    paymentStatus: string;
    status: string;
    createdAt: string;
  };
  paymentUrl?: string;
}

const orderService = {
  createOrder: async (payload: CreateOrderPayload): Promise<OrderResponse> => {
    const response = await api.post<OrderResponse>("/orders", payload);
    return response.data;
  },

  confirmPayment: async (
    orderId: string,
    payload: { paymentStatus: string; status: string; vnpTransactionId?: string },
  ): Promise<{ success: boolean; message: string; order?: any }> => {
    const response = await api.post(`/orders/${orderId}/confirm-payment`, payload);
    return response.data;
  },

  cancelOrder: async (orderId: string): Promise<{ success: boolean; message: string; order?: any }> => {
    const response = await api.put(`/orders/${orderId}/cancel`);
    return response.data;
  },
};

export default orderService;
