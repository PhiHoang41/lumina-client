import { createContext, useContext, useState, type ReactNode } from "react";
import type { AppliedCoupon } from "../services/cartService";

export interface CartContextType {
  appliedCoupon: AppliedCoupon | null;
  setAppliedCoupon: (coupon: AppliedCoupon | null) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CART_COUPON_KEY = "lumina_applied_coupon";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const getInitialCoupon = (): AppliedCoupon | null => {
    if (typeof window === "undefined") return null;
    const savedCoupon = localStorage.getItem(CART_COUPON_KEY);
    if (savedCoupon) {
      try {
        return JSON.parse(savedCoupon);
      } catch {
        return null;
      }
    }
    return null;
  };

  const [appliedCoupon, setAppliedCouponState] = useState<AppliedCoupon | null>(
    getInitialCoupon,
  );

  const setAppliedCoupon = (coupon: AppliedCoupon | null) => {
    setAppliedCouponState(coupon);
    if (coupon) {
      localStorage.setItem(CART_COUPON_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(CART_COUPON_KEY);
    }
  };

  return (
    <CartContext.Provider
      value={{
        appliedCoupon,
        setAppliedCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
