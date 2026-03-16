import api from "./api";

export interface OrderItem {
  productName: string;
  variantName?: string;
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

export interface OrderListItem {
  _id: string;
  customerName: string;
  address: string;
  note?: string;
  products: OrderItem[];
  subtotal: number;
  discountAmount: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  coupon?: { code: string };
  createdAt: string;
}

export interface OrderListResponse {
  success: boolean;
  data: OrderListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const orderService = {
  getMyOrders: async (
    params?: { page?: number; limit?: number; status?: string; sort?: string }
  ): Promise<OrderListResponse> => {
    const response = await api.get<OrderListResponse>("/orders/my-orders", { params });
    return response.data;
  },

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
