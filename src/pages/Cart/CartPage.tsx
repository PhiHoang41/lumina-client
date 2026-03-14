import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import CartTable from "./components/CartTable";
import CouponSection from "./components/CouponSection";
import CartTotals from "./components/CartTotals";
import cartService, { type CartItem } from "../../services/cartService";
import type {
  CartTotals as CartTotalsType,
  AppliedCoupon,
} from "./types/cart.types";

const CartPage = () => {
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );

  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () => cartService.getCart(),
  });

  const updateCartMutation = useMutation({
    mutationFn: (payload: {
      productId: string;
      variantId: string;
      quantity: number;
    }) => cartService.updateCart(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Cập nhật giỏ hàng thành công!");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Cập nhật giỏ hàng thất bại",
      );
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (payload: { productId: string; variantId: string }) =>
      cartService.removeFromCart(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["cartCount"] });
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xóa sản phẩm thất bại");
    },
  });

  const validateCouponMutation = useMutation({
    mutationFn: ({
      code,
      orderAmount,
    }: {
      code: string;
      orderAmount: number;
    }) => cartService.validateCoupon(code, orderAmount),
    onSuccess: (data) => {
      if (data.success && data.data) {
        const coupon: AppliedCoupon = {
          code: data.data.code,
          type: data.data.type,
          value: data.data.value,
        };
        setAppliedCoupon(coupon);
        toast.success(`Coupon "${coupon.code}" đã được áp dụng!`);
      } else {
        setAppliedCoupon(null);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Coupon không hợp lệ!";
      toast.error(errorMessage);
    },
  });

  const cartItems: CartItem[] = useMemo(
    () => cartData?.cart?.items || [],
    [cartData],
  );

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "cart" },
  ];

  const totals = useMemo<CartTotalsType>(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.type === "PERCENTAGE") {
        discount = (subtotal * appliedCoupon.value) / 100;
        if (
          appliedCoupon.maxDiscountAmount &&
          discount > appliedCoupon.maxDiscountAmount
        ) {
          discount = appliedCoupon.maxDiscountAmount;
        }
      } else if (appliedCoupon.type === "FIXED_AMOUNT") {
        discount = appliedCoupon.value;
        if (discount > subtotal) {
          discount = subtotal;
        }
      }
    }

    const total = subtotal - discount;

    return {
      subtotal,
      shipping: 0,
      discount,
      total,
      appliedCoupon,
    };
  }, [cartItems, appliedCoupon]);

  const handleQuantityChange = (item: CartItem, quantity: number) => {
    updateCartMutation.mutate({
      productId: item.product._id,
      variantId: item.variant._id,
      quantity,
    });
  };

  const handleRemoveItem = (item: CartItem) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa "${item.product.name}" khỏi giỏ hàng?`,
    );
    if (!confirmDelete) return;

    removeFromCartMutation.mutate({
      productId: item.product._id,
      variantId: item.variant._id,
    });
  };

  const handleApplyCoupon = (code: string) => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode) {
      const orderAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      validateCouponMutation.mutate({ code: upperCode, orderAmount });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  if (isLoading) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="shopping_cart_area">
          <div className="container">
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <p>Đang tải giỏ hàng...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Breadcrumb items={breadcrumbItems} />
        <div className="shopping_cart_area">
          <div className="container">
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <p>Không thể tải giỏ hàng. Vui lòng thử lại sau.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="shopping_cart_area">
        <div className="container">
          <form action="#" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-12">
                <CartTable
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="coupon_area">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <CouponSection
                      onApplyCoupon={handleApplyCoupon}
                      onRemoveCoupon={handleRemoveCoupon}
                      isValidating={validateCouponMutation.isPending}
                      appliedCoupon={appliedCoupon}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <CartTotals
                      totals={totals}
                      onRemoveCoupon={handleRemoveCoupon}
                    />
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
