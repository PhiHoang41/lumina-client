import { useState } from "react";

interface CouponSectionProps {
  onApplyCoupon: (code: string) => void;
}

const CouponSection = ({ onApplyCoupon }: CouponSectionProps) => {
  const [couponCode, setCouponCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.trim());
    }
  };

  return (
    <div className="coupon_code left">
      <h3>Mã giảm giá</h3>
      <div className="coupon_inner">
        <p>Nhập mã giảm giá nếu bạn có.</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nhập mã giảm giá"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit">Áp dụng</button>
        </form>
      </div>
    </div>
  );
};

export default CouponSection;
