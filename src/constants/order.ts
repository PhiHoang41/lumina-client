export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  DELIVERED: "Đã giao hàng",
  CANCELLED: "Đã hủy",
};

export const ORDER_STATUS_CLASS: Record<string, string> = {
  PENDING: "warning",
  CONFIRMED: "info",
  SHIPPING: "primary",
  DELIVERED: "success",
  CANCELLED: "danger",
};

export const getOrderStatusInfo = (status: string) => {
  return {
    label: ORDER_STATUS_LABELS[status] || status,
    class: ORDER_STATUS_CLASS[status] || "secondary",
  };
};

export const PAYMENT_STATUS = {
  UNPAID: "UNPAID",
  PAID: "PAID",
} as const;

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
};

export const PAYMENT_STATUS_CLASS: Record<string, string> = {
  UNPAID: "danger",
  PAID: "success",
};

export const getPaymentStatusInfo = (status: string) => {
  return {
    label: PAYMENT_STATUS_LABELS[status] || status,
    class: PAYMENT_STATUS_CLASS[status] || "secondary",
  };
};

export const PAYMENT_METHOD = {
  COD: "COD",
  VNPAY: "VNPAY",
} as const;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  COD: "Tiền mặt",
  VNPAY: "VNPay",
};
