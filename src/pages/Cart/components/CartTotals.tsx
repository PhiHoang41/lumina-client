import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { CartTotals as CartTotalsType } from "../types/cart.types";
import { formatVND } from "../../../utils/currency";
import styles from "./CartTotals.module.css";

interface CartTotalsProps {
  totals: CartTotalsType;
  onRemoveCoupon?: () => void;
}

const CartTotals = ({ totals, onRemoveCoupon }: CartTotalsProps) => {
  const { appliedCoupon, subtotal, discount, total } = totals;

  const discountLabel = useMemo(() => {
    if (!appliedCoupon) return "";
    return appliedCoupon.type === "PERCENTAGE"
      ? `Giảm ${appliedCoupon.value}%${appliedCoupon.maxDiscountAmount ? ` (tối đa ${formatVND(appliedCoupon.maxDiscountAmount)})` : ""}`
      : `Giảm ${formatVND(appliedCoupon.value)}`;
  }, [appliedCoupon]);

  return (
    <div className="coupon_code right">
      <h3>Tổng giỏ hàng</h3>
      <div className="coupon_inner">
        <div className="cart_subtotal">
          <p>Tạm tính</p>
          <p className="cart_amount">{formatVND(subtotal)}</p>
        </div>

        {appliedCoupon && discount > 0 && (
          <div className="cart_subtotal">
            <div className={styles.couponRow}>
              <div className={styles.couponInfo}>
                <p className={styles.couponCode}>
                  Mã: <strong>{appliedCoupon.code}</strong>
                </p>
                <p className={styles.discountInfo}>
                  {discountLabel}
                </p>
              </div>
              {onRemoveCoupon && (
                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className={styles.removeButton}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {discount > 0 && (
          <div className="cart_subtotal">
            <p>Giảm giá</p>
            <p className={`cart_amount ${styles.discountLabel}`}>
              -{formatVND(discount)}
            </p>
          </div>
        )}

        <div className="cart_subtotal">
          <p>Tổng cộng</p>
          <p className="cart_amount">{formatVND(total)}</p>
        </div>
        <div className="checkout_btn">
          <Link to="/checkout">Tiến hành thanh toán</Link>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
