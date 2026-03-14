import { useState } from "react";
import type { AppliedCoupon } from "../types/cart.types";
import { formatVND } from "../../../utils/currency";
import styles from "./CouponSection.module.css";

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon?: () => void;
  isValidating?: boolean;
  appliedCoupon?: AppliedCoupon | null;
}

const CouponSection = ({
  onApplyCoupon,
  onRemoveCoupon,
  isValidating = false,
  appliedCoupon,
}: CouponSectionProps) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApply = () => {
    onApplyCoupon(couponCode.trim());
    setCouponCode("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
  };

  return (
    <div className="coupon_code left">
      <h3>Mã giảm giá</h3>
      <div className="coupon_inner">
        {appliedCoupon ? (
          <div className={styles.appliedCoupon}>
            <div className={styles.appliedCouponContent}>
              <span>
                <strong>{appliedCoupon.code}</strong>
                {appliedCoupon.type === "PERCENTAGE"
                  ? ` - Giảm ${appliedCoupon.value}%`
                  : ` - Giảm ${formatVND(appliedCoupon.value)}`}
              </span>
              {onRemoveCoupon && (
                <button
                  type="button"
                  onClick={onRemoveCoupon}
                  className={styles.removeButton}
                >
                  Xóa
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <p>Nhập mã giảm giá nếu bạn có.</p>
            <div className={styles.inputGroup}>
              <input
                placeholder="Nhập mã giảm giá"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                disabled={isValidating}
                className={styles.input}
              />
              <button
                type="button"
                onClick={handleApply}
                disabled={isValidating || !couponCode.trim()}
                className={styles.applyButton}
              >
                Áp dụng
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CouponSection;
