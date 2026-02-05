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
      <h3>Coupon</h3>
      <div className="coupon_inner">
        <p>Enter your coupon code if you have one.</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Coupon code"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit">Apply coupon</button>
        </form>
      </div>
    </div>
  );
};

export default CouponSection;
