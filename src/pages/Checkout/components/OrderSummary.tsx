import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import cartService from "../../../services/cartService";
import { useCart } from "../../../contexts/CartContext";
import { formatVND } from "../../../utils/currency";
import styles from "./OrderSummary.module.css";

interface OrderSummaryProps {
  onPlaceOrder: () => void;
  isLoading?: boolean;
}

const OrderSummary = ({ onPlaceOrder, isLoading = false }: OrderSummaryProps) => {
  const { appliedCoupon } = useCart();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart(),
    select: (data) => data.cart?.items || [],
  });

  const { subtotal, discount, total } = useMemo(() => {
    const sub = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    let disc = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === "PERCENTAGE") {
        disc = (sub * appliedCoupon.value) / 100;
        if (appliedCoupon.maxDiscountAmount && disc > appliedCoupon.maxDiscountAmount) {
          disc = appliedCoupon.maxDiscountAmount;
        }
      } else {
        disc = appliedCoupon.value;
        if (disc > sub) disc = sub;
      }
    }

    return {
      subtotal: sub,
      discount: disc,
      total: sub - disc,
    };
  }, [cartItems, appliedCoupon]);

  const getImageUrl = (images?: string[]) => {
    if (images && images.length > 0) {
      return images[0];
    }
    return "https://via.placeholder.com/80";
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.orderSummary}>
        <h3 className={styles.sectionTitle}>Tóm tắt đơn hàng</h3>
        <p style={{ textAlign: "center", padding: "20px 0", color: "#666" }}>
          Giỏ hàng trống
        </p>
        <Link to="/cart" className={styles.backLink}>
          ← Quay lại giỏ hàng
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.sectionTitle}>Tóm tắt đơn hàng</h3>

      <div className={styles.productList}>
        {cartItems.map((item) => (
          <div key={`${item.product._id}-${item.variant._id}`} className={styles.productItem}>
            <img
              src={getImageUrl(item.product.images)}
              alt={item.product.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <p className={styles.productName}>{item.product.name}</p>
              <p className={styles.productVariant}>
                {item.variant.color ? `${item.variant.color.name} / ` : ""}
                {item.variant.size}
              </p>
              <p className={styles.productQty}>x{item.quantity}</p>
            </div>
            <p className={styles.productPrice}>
              {formatVND(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.summaryRow}>
        <span>Tạm tính</span>
        <span>{formatVND(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className={`${styles.summaryRow} ${styles.discount}`}>
          <span>Giảm giá{appliedCoupon && ` (${appliedCoupon.code})`}</span>
          <span>-{formatVND(discount)}</span>
        </div>
      )}
      <div className={`${styles.summaryRow} ${styles.total}`}>
        <span>Tổng cộng</span>
        <span>{formatVND(total)}</span>
      </div>

      <button
        type="button"
        className={styles.placeOrderButton}
        onClick={onPlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? "Đang xử lý..." : "Đặt hàng"}
      </button>

      <Link to="/cart" className={styles.backLink}>
        ← Quay lại giỏ hàng
      </Link>
    </div>
  );
};

export default OrderSummary;
