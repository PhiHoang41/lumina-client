import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatVND } from "../../utils/currency";
import orderService from "../../services/orderService";
import {
  getOrderStatusInfo,
  getPaymentStatusInfo,
  PAYMENT_METHOD_LABELS,
  ORDER_STATUS,
} from "../../constants/order";
import styles from "./OrderDetail.module.css";

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cancelError, setCancelError] = useState<string | null>(null);

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrderById(id!),
    enabled: !!id,
  });

  const cancelMutation = useMutation({
    mutationFn: () => orderService.cancelOrder(id!),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["order", id] });
      } else {
        setCancelError(data.message);
      }
    },
    onError: () => {
      setCancelError("Đã xảy ra lỗi khi huỷ đơn hàng");
    },
  });

  const displayData = order?.data;

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

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  if (error || !displayData) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to="/profile/orders" className={styles.backLink}>
            <i className="fa fa-arrow-left"></i>
            Quay lại danh sách đơn hàng
          </Link>
        </div>
        <div className={styles.error}>
          {error ? "Đã xảy ra lỗi khi tải đơn hàng" : "Không tìm thấy đơn hàng"}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/profile/orders" className={styles.backLink}>
          <i className="fa fa-arrow-left"></i>
          Quay lại danh sách đơn hàng
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Chi tiết đơn hàng</h1>
          <span className={styles.orderId}>#{displayData._id}</span>
        </div>
      </div>

      <div className={styles.statusSection}>
        <div className={styles.statusBadges}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Trạng thái:</span>
            {getStatusBadge(displayData.status)}
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Thanh toán:</span>
            {getPaymentBadge(displayData.paymentStatus)}
          </div>
        </div>
        {(displayData.status === ORDER_STATUS.PENDING ||
          displayData.status === ORDER_STATUS.CONFIRMED) && (
          <div className={styles.cancelWrapper}>
            {cancelError && (
              <span className={styles.cancelError}>{cancelError}</span>
            )}
            <button
              className={styles.cancelButton}
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này?")) {
                  cancelMutation.mutate();
                }
              }}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "Đang huỷ..." : "Huỷ đơn hàng"}
            </button>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Sản phẩm</h3>
            <div className={styles.productList}>
              {displayData.products.map((item, index: number) => (
                <div key={index} className={styles.productItem}>
                  <div className={styles.productImage}>
                    <img
                      src={
                        item.product?.images?.[0] ||
                        "https://via.placeholder.com/200"
                      }
                      alt={item.product?.name || item.productName}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>
                      {item.product?.name || item.productName}
                    </h4>
                    <div className={styles.productVariant}>
                      {item.variant?.color && (
                        <span className={styles.productVariantItem}>
                          <span
                            className={styles.colorDot}
                            style={{
                              backgroundColor: item.variant.color.hex || "#ddd",
                            }}
                          ></span>
                          {item.variant.color.name}
                        </span>
                      )}
                      {item.variant?.size && (
                        <span className={styles.productVariantItem}>
                          Size: {item.variant.size}
                        </span>
                      )}
                    </div>
                    <div className={styles.productPrice}>
                      <span className={styles.quantity}>x{item.quantity}</span>
                      <span className={styles.price}>
                        {formatVND(item.price)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.productTotal}>
                    <span className={styles.productTotalPrice}>
                      {formatVND(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Tạm tính</span>
                <span>{formatVND(displayData.subtotal)}</span>
              </div>
              {displayData.discountAmount > 0 && (
                <div className={styles.summaryRow}>
                  <span>
                    Giảm giá{" "}
                    {displayData.coupon?.code && `(${displayData.coupon.code})`}
                  </span>
                  <span className={styles.discount}>
                    -{formatVND(displayData.discountAmount)}
                  </span>
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Tổng cộng</span>
                <span className={styles.totalAmount}>
                  {formatVND(displayData.totalPrice)}
                </span>
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
                <p className={styles.infoName}>{displayData.customerName}</p>
                <p className={styles.infoText}>{displayData.customerPhone}</p>
                <p className={styles.infoText}>{displayData.address}</p>
              </div>
              <div className={styles.infoDivider}></div>
              <div className={styles.infoBlock}>
                <span className={styles.infoBlockLabel}>Thanh toán</span>
                <span className={styles.infoValue}>
                  {PAYMENT_METHOD_LABELS[displayData.paymentMethod] ||
                    displayData.paymentMethod}
                </span>
              </div>
              {displayData.note && (
                <>
                  <div className={styles.infoDivider}></div>
                  <div className={styles.infoBlock}>
                    <span className={styles.infoBlockLabel}>Ghi chú</span>
                    <p className={styles.infoText}>{displayData.note}</p>
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
