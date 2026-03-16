import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { formatVND } from "../../../utils/currency";
import styles from "./OrderList.module.css";

dayjs.locale("vi");

interface Order {
  _id: string;
  createdAt: string;
  products: Array<{
    product: { name: string };
    variant: { size: string; color?: { name: string } };
    quantity: number;
  }>;
  totalPrice: number;
  status: string;
  paymentStatus: string;
}

const mockOrders: Order[] = [
  {
    _id: "65f2abc1234567890abcd01",
    createdAt: "2024-03-15T10:30:00Z",
    products: [
      {
        product: { name: "Áo Thun Cotton Basic" },
        variant: { size: "L", color: { name: "Trắng" } },
        quantity: 2,
      },
      {
        product: { name: "Quần Jean Slim Fit" },
        variant: { size: "32" },
        quantity: 1,
      },
    ],
    totalPrice: 650000,
    status: "DELIVERED",
    paymentStatus: "PAID",
  },
  {
    _id: "65f2abc1234567890abcd02",
    createdAt: "2024-03-10T14:20:00Z",
    products: [
      {
        product: { name: "Giày Sneaker Classic" },
        variant: { size: "42", color: { name: "Đen" } },
        quantity: 1,
      },
    ],
    totalPrice: 890000,
    status: "SHIPPED",
    paymentStatus: "PAID",
  },
  {
    _id: "65f2abc1234567890abcd03",
    createdAt: "2024-03-08T09:15:00Z",
    products: [
      {
        product: { name: "Áo Khoác Hoodie" },
        variant: { size: "XL", color: { name: "Xám" } },
        quantity: 1,
      },
      {
        product: { name: "Mũ Baseball Cap" },
        variant: { size: "Free" },
        quantity: 2,
      },
      {
        product: { name: "Túi Đeo Chéo" },
        variant: { size: "Free", color: { name: "Nâu" } },
        quantity: 1,
      },
    ],
    totalPrice: 450000,
    status: "PROCESSING",
    paymentStatus: "PAID",
  },
  {
    _id: "65f2abc1234567890abcd04",
    createdAt: "2024-03-05T16:45:00Z",
    products: [
      {
        product: { name: "Áo Sơ Mi Oxford" },
        variant: { size: "M", color: { name: "Xanh navy" } },
        quantity: 1,
      },
    ],
    totalPrice: 320000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
  },
  {
    _id: "65f2abc1234567890abcd05",
    createdAt: "2024-03-01T11:00:00Z",
    products: [
      {
        product: { name: "Quần Short Khaki" },
        variant: { size: "30" },
        quantity: 1,
      },
    ],
    totalPrice: 280000,
    status: "PENDING",
    paymentStatus: "UNPAID",
  },
];

const OrderList = () => {
  const orders = mockOrders;

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

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD/MM/YYYY HH:mm");
  };

  if (orders.length === 0) {
    return (
      <div className={styles.orderList}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đơn hàng của tôi</h2>
          <p className={styles.subtitle}>Quản lý và theo dõi đơn hàng</p>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <i className="fa fa-shopping-bag"></i>
          </div>
          <p className={styles.emptyText}>Bạn chưa có đơn hàng nào.</p>
          <Link to="/products" className={styles.shopBtn}>
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.orderList}>
      <div className={styles.header}>
        <h2 className={styles.title}>Đơn hàng của tôi</h2>
        <p className={styles.subtitle}>Quản lý và theo dõi đơn hàng</p>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Sản phẩm</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thanh toán</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className={styles.orderId}>
                  #{order._id.slice(-8).toUpperCase()}
                </td>
                <td className={styles.date}>{formatDate(order.createdAt)}</td>
                <td>
                  <div className={styles.productList}>
                    {order.products.slice(0, 2).map((item, idx) => (
                      <div key={idx} className={styles.productItem}>
                        {item.product.name}
                        {item.variant.color && (
                          <span className={styles.variantInfo}>
                            {" - "}
                            {item.variant.color.name}
                          </span>
                        )}
                        <span className={styles.variantInfo}>
                          {" "}
                          ({item.variant.size})
                        </span>
                        <span className={styles.variantInfo}>
                          {" "}
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.products.length > 2 && (
                      <div className={styles.moreProducts}>
                        +{order.products.length - 2} sản phẩm khác
                      </div>
                    )}
                  </div>
                </td>
                <td className={styles.total}>{formatVND(order.totalPrice)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{getPaymentBadge(order.paymentStatus)}</td>
                <td className={styles.actions}>
                  <Link
                    to={`/orders/${order._id}`}
                    className={styles.viewBtn}
                  >
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
