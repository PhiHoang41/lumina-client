import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { formatVND } from "../../../utils/currency";
import orderService from "../../../services/orderService";
import {
  getOrderStatusInfo,
  getPaymentStatusInfo,
  PAYMENT_METHOD_LABELS,
} from "../../../constants/order";
import styles from "./OrderList.module.css";

dayjs.locale("vi");

const OrderList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["myOrders", page],
    queryFn: () => orderService.getMyOrders({ page, limit: 10 }),
  });

  const orders = data?.data || [];
  const pagination = data?.pagination;

  const getStatusBadge = (status: string) => {
    const info = getOrderStatusInfo(status);
    const badgeClass =
      styles[
        `badge${info.class.charAt(0).toUpperCase() + info.class.slice(1)}`
      ] || styles.badgeSecondary;
    return (
      <span className={`${styles.badge} ${badgeClass}`}>{info.label}</span>
    );
  };

  const getPaymentBadge = (paymentStatus: string) => {
    const info = getPaymentStatusInfo(paymentStatus);
    const badgeClass =
      styles[
        `badge${info.class.charAt(0).toUpperCase() + info.class.slice(1)}`
      ] || styles.badgeSecondary;
    return (
      <span className={`${styles.badge} ${badgeClass}`}>{info.label}</span>
    );
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD/MM/YYYY HH:mm");
  };

  if (isLoading) {
    return (
      <div className={styles.orderList}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đơn hàng của tôi</h2>
          <p className={styles.subtitle}>Quản lý và theo dõi đơn hàng</p>
        </div>
        <div className={styles.empty}>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.orderList}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đơn hàng của tôi</h2>
          <p className={styles.subtitle}>Quản lý và theo dõi đơn hàng</p>
        </div>
        <div className={styles.empty}>
          <p className={styles.emptyText}>Lỗi khi tải đơn hàng</p>
        </div>
      </div>
    );
  }

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
              <th>Phương thức</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className={styles.orderId}>{order._id}</td>
                <td className={styles.date}>{formatDate(order.createdAt)}</td>
                <td>
                  <div className={styles.productList}>
                    {order.products.slice(0, 2).map((item, idx) => (
                      <div key={idx} className={styles.productItem}>
                        {item.productName}
                        {item.variantName && (
                          <span className={styles.variantInfo}>
                            {" "}
                            ({item.variantName})
                          </span>
                        )}
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
                <td className={styles.paymentMethod}>
                  {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}
                </td>
                <td className={styles.actions}>
                  <Link
                    to={`/profile/orders/${order._id}`}
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

      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                className={`${styles.pageBtn} ${pageNum === page ? styles.active : ""}`}
                onClick={() => setPage(pageNum)}
              >
                {pageNum}
              </button>
            ),
          )}
          <button
            className={styles.pageBtn}
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
