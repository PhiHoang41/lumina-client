import { Link } from "react-router-dom";
import type { CartTotals as CartTotalsType } from "../types/cart.types";
import { formatVND } from "../../../utils/currency";

interface CartTotalsProps {
  totals: CartTotalsType;
}

const CartTotals = ({ totals }: CartTotalsProps) => {

  return (
    <div className="coupon_code right">
      <h3>Tổng giỏ hàng</h3>
      <div className="coupon_inner">
        <div className="cart_subtotal">
          <p>Tạm tính</p>
          <p className="cart_amount">{formatVND(totals.subtotal)}</p>
        </div>
        {totals.discount > 0 && (
          <div className="cart_subtotal">
            <p>Giảm giá</p>
            <p className="cart_amount" style={{ color: "#ff4136" }}>
              -{formatVND(totals.discount)}
            </p>
          </div>
        )}

        <div className="cart_subtotal">
          <p>Tổng cộng</p>
          <p className="cart_amount">{formatVND(totals.total)}</p>
        </div>
        <div className="checkout_btn">
          <Link to="/checkout">Tiến hành thanh toán</Link>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
