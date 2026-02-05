import { useState, useMemo } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import CartTable from "./components/CartTable";
import CouponSection from "./components/CouponSection";
import CartTotals from "./components/CartTotals";
import { mockCartItems } from "./data/mockCart";
import type {
  CartItem,
  CartTotals as CartTotalsType,
} from "./types/cart.types";

const SHIPPING_COST = 40;
const VALID_COUPONS = {
  SAVE10: 10, // 10% discount
  SAVE20: 20, // 20% discount
  FREESHIP: 0, // Free shipping (handled separately)
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "cart" },
  ];

  // Calculate totals
  const totals = useMemo<CartTotalsType>(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    let shipping = SHIPPING_COST;
    let discount = 0;

    if (appliedCoupon && appliedCoupon in VALID_COUPONS) {
      if (appliedCoupon === "FREESHIP") {
        shipping = 0;
      } else {
        const discountPercent =
          VALID_COUPONS[appliedCoupon as keyof typeof VALID_COUPONS];
        discount = (subtotal * discountPercent) / 100;
      }
    }

    const total = subtotal + shipping - discount;

    return {
      subtotal,
      shipping,
      discount,
      total,
    };
  }, [cartItems, appliedCoupon]);

  // Handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Handle remove item
  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle update cart
  const handleUpdateCart = () => {
    alert("Cart updated successfully!");
  };

  // Handle apply coupon
  const handleApplyCoupon = (code: string) => {
    const upperCode = code.toUpperCase();
    if (upperCode in VALID_COUPONS) {
      setAppliedCoupon(upperCode);
      alert(`Coupon "${upperCode}" applied successfully!`);
    } else {
      alert("Invalid coupon code!");
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="shopping_cart_area">
        <div className="container">
          <form action="#">
            <div className="row">
              <div className="col-12">
                <CartTable
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  onUpdateCart={handleUpdateCart}
                />
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="coupon_area">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <CouponSection onApplyCoupon={handleApplyCoupon} />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <CartTotals totals={totals} />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CartPage;
