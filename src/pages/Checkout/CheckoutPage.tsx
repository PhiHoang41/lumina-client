import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import orderService, {
  type CreateOrderPayload,
} from "../../services/orderService";
import authService from "../../services/authService";
import { useCart } from "../../contexts/CartContext";
import styles from "./CheckoutPage.module.css";
import { queryClient } from "../../main";

interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: "COD" | "VNPAY";
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { appliedCoupon, setAppliedCoupon } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
  });

  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: userData?.data?.fullName || "",
      phone: userData?.data?.phone || "",
      email: userData?.data?.email || "",
      address: userData?.data?.address || "",
      note: "",
      paymentMethod: "COD",
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (userData?.data) {
      reset({
        fullName: userData.data.fullName || "",
        phone: userData.data.phone || "",
        email: userData.data.email || "",
        address: userData.data.address || "",
        note: "",
        paymentMethod: "COD",
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data: CheckoutFormData) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const payload: CreateOrderPayload = {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        note: data.note || undefined,
        paymentMethod: data.paymentMethod,
        couponCode: appliedCoupon?.code,
      };

      const response = await orderService.createOrder(payload);

      if (response.success) {
        setAppliedCoupon(null);

        if (response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
          navigate("/");
          queryClient.invalidateQueries({ queryKey: ["cartCount"] });
        }
      } else {
        toast.error(response.message || "Đặt hàng thất bại");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message || "Đặt hàng thất bại. Vui lòng thử lại.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    handleSubmit(onSubmit)();
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "checkout" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles.checkoutArea}>
        <div className="container">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-8 col-md-7">
                  <CheckoutForm />
                </div>
                <div className="col-lg-4 col-md-5">
                  <OrderSummary
                    onPlaceOrder={handlePlaceOrder}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
