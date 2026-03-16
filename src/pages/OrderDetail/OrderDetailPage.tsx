import { useParams, Link } from "react-router-dom";
import { formatVND } from "../../utils/currency";
import styles from "./OrderDetail.module.css";

interface Product {
  product: { name: string; images: string[] };
  variant: { size: string; color?: { name: string; hex?: string } };
  quantity: number;
  price: number;
}

interface OrderDetail {
  _id: string;
  createdAt: string;
  products: Product[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    ward: string;
    district: string;
    city: string;
  };
  paymentMethod: string;
  shippingMethod: string;
  note?: string;
  timeline: Array<{
    status: string;
    label: string;
    date: string;
    completed: boolean;
  }>;
}

const mockOrderDetail: OrderDetail = {
  _id: "65f2abc1234567890abcd01",
  createdAt: "2024-03-15T10:30:00Z",
  products: [
    {
      product: {
        name: "Áo Thun Cotton Basic",
        images: ["https://picsum.photos/200/200?random=1"],
      },
      variant: { size: "L", color: { name: "Trắng", hex: "#FFFFFF" } },
      quantity: 2,
      price: 250000,
    },
    {
      product: {
        name: "Quần Jean Slim Fit",
        images: ["https://picsum.photos/200/200?random=2"],
      },
      variant: { size: "32", color: { name: "Xanh đậm", hex: "#1a3a5c" } },
      quantity: 1,
      price: 400000,
    },
  ],
  totalPrice: 650000,
  status: "DELIVERED",
  paymentStatus: "PAID",
  shippingAddress: {
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    address: "123 Đường Nguyễn Trãi",
    ward: "Phường 5",
    district: "Quận 5",
    city: "TP. Hồ Chí Minh",
  },
  paymentMethod: "VNPay",
  shippingMethod: "Giao hàng nhanh",
  note: "Giao hàng vào giờ hành chính",
  timeline: [
    {
      status: "PENDING",
      label: "Đơn hàng đã đặt",
      date: "2024-03-15T10:30:00Z",
      completed: true,
    },
    {
      status: "CONFIRMED",
      label: "Đã xác nhận",
      date: "2024-03-15T14:00:00Z",
      completed: true,
    },
    {
      status: "PROCESSING",
      label: "Đang chuẩn bị hàng",
      date: "2024-03-16T09:00:00Z",
      completed: true,
    },
    {
      status: "SHIPPED",
      label: "Đã giao cho đơn vị vận chuyển",
      date: "2024-03-17T10:00:00Z",
      completed: true,
    },
    {
      status: "DELIVERED",
      label: "Đã giao hàng",
      date: "2024-03-18T15:30:00Z",
      completed: true,
    },
  ],
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const order = mockOrderDetail;

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { class: string; label: string }> = {
      PENDING: { class: "warning", label: "Chờ xác nhận" },
      CONFIRMED: { class: "info", label: "Đã xác nhận" },
      PROCESSING: { class: "info", label: "Đang xử lý" },
      SHIPPED: { class: "primary", label: "Đã giao vận" },
      DELIVERED: { class: "success", label: "Đã giao hàng" },
      CANCELLED: { class: "danger", label: "Đã hủy" },
    };

    const info = statusMap[status] || { class: "secondary", label: status };
    const badgeClass =
      styles[`badge${info.class.charAt(0).toUpperCase() + info.class.slice(1)}`] ||
      styles.badgeSecondary;
    return (
      <span className={`${styles.badge} ${badgeClass}`}>{info.label}</span>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const statusMap: Record<string, { class: string; label: string }> = {
      UNPAID: { class: "danger", label: "Chưa thanh toán" },
      PAID: { class: "success", label: "Đã thanh toán" },
      FAILED: { class: "danger", label: "Thất bại" },
    };

    const info =
      statusMap[paymentStatus] || { class: "secondary", label: paymentStatus };
    const badgeClass =
      styles[`badge${info.class.charAt(0).toUpperCase() + info.class.slice(1)}`] ||
      styles.badgeSecondary;
    return (
      <span className={`${styles.badge} ${badgeClass}`}>{info.label}</span>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/profile/orders" className={styles.backLink}>
          <i className="fa fa-arrow-left"></i>
          Quay lại danh sách đơn hàng
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Chi tiết đơn hàng</h1>
          <span className={styles.orderId}>#{order._id.slice(-8).toUpperCase()}</span>
        </div>
      </div>

      <div className={styles.statusSection}>
        <div className={styles.statusBadges}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Trạng thái:</span>
            {getStatusBadge(order.status)}
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Thanh toán:</span>
            {getPaymentBadge(order.paymentStatus)}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Sản phẩm</h3>
            <div className={styles.productList}>
              {order.products.map((item, index) => (
                <div key={index} className={styles.productItem}>
                  <div className={styles.productImage}>
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{item.product.name}</h4>
                    <div className={styles.productVariant}>
                      {item.variant.color && (
                        <span className={styles.productVariantItem}>
                          <span
                            className={styles.colorDot}
                            style={{ backgroundColor: item.variant.color.hex || "#ddd" }}
                          ></span>
                          {item.variant.color.name}
                        </span>
                      )}
                      <span className={styles.productVariantItem}>Size: {item.variant.size}</span>
                    </div>
                    <div className={styles.productPrice}>
                      <span className={styles.quantity}>x{item.quantity}</span>
                      <span className={styles.price}>{formatVND(item.price)}</span>
                    </div>
                  </div>
                  <div className={styles.productTotal}>
                    <span className={styles.productTotalPrice}>{formatVND(item.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Tạm tính</span>
                <span>{formatVND(order.totalPrice)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Tổng cộng</span>
                <span className={styles.totalAmount}>{formatVND(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Thông tin đơn hàng</h3>
            <div className={styles.infoGroup}>
              <div className={styles.infoBlock}>
                <span className={styles.infoBlockLabel}>Giao đến</span>
                <p className={styles.infoName}>{order.shippingAddress.fullName}</p>
                <p className={styles.infoText}>{order.shippingAddress.phone}</p>
                <p className={styles.infoText}>
                  {order.shippingAddress.address}, {order.shippingAddress.ward},{" "}
                  {order.shippingAddress.district}, {order.shippingAddress.city}
                </p>
              </div>
              <div className={styles.infoDivider}></div>
              <div className={styles.infoBlockRow}>
                <div className={styles.infoBlockSmall}>
                  <span className={styles.infoBlockLabel}>Thanh toán</span>
                  <span className={styles.infoValue}>{order.paymentMethod}</span>
                </div>
                <div className={styles.infoBlockSmall}>
                  <span className={styles.infoBlockLabel}>Vận chuyển</span>
                  <span className={styles.infoValue}>{order.shippingMethod}</span>
                </div>
              </div>
              {order.note && (
                <>
                  <div className={styles.infoDivider}></div>
                  <div className={styles.infoBlock}>
                    <span className={styles.infoBlockLabel}>Ghi chú</span>
                    <p className={styles.infoText}>{order.note}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
