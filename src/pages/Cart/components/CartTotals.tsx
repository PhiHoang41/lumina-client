import { Link } from "react-router-dom";
import type { CartTotals as CartTotalsType } from "../types/cart.types";

interface CartTotalsProps {
  totals: CartTotalsType;
}

const CartTotals = ({ totals }: CartTotalsProps) => {
  return (
    <div className="coupon_code right">
      <h3>Cart Totals</h3>
      <div className="coupon_inner">
        <div className="cart_subtotal">
          <p>Subtotal</p>
          <p className="cart_amount">£{totals.subtotal.toFixed(2)}</p>
        </div>
        <div className="cart_subtotal">
          <p>Shipping</p>
          <p className="cart_amount">
            <span>Flat Rate:</span> £{totals.shipping.toFixed(2)}
          </p>
        </div>
        {totals.discount > 0 && (
          <div className="cart_subtotal">
            <p>Discount</p>
            <p className="cart_amount" style={{ color: "#ff4136" }}>
              -£{totals.discount.toFixed(2)}
            </p>
          </div>
        )}
        <a href="#">Calculate shipping</a>

        <div className="cart_subtotal">
          <p>Total</p>
          <p className="cart_amount">£{totals.total.toFixed(2)}</p>
        </div>
        <div className="checkout_btn">
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
