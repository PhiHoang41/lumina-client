import { useForm, FormProvider } from "react-hook-form";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import CheckoutForm from "./components/CheckoutForm";
import OrderSummary from "./components/OrderSummary";
import styles from "./CheckoutPage.module.css";

interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Checkout data:", data);
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
                  <OrderSummary />
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
