import { useFormContext } from "react-hook-form";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.checkoutForm}>
      <div className={styles.shippingInfo}>
        <h3 className={styles.sectionTitle}>Thông tin giao hàng</h3>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Họ và tên <span className={styles.required}>*</span></label>
          <input
            type="text"
            id="fullName"
            placeholder="Nhập họ và tên"
            {...register("fullName", { required: "Vui lòng nhập họ và tên" })}
          />
          {errors.fullName && (
            <span className={styles.error}>
              {errors.fullName.message as string}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Số điện thoại <span className={styles.required}>*</span></label>
          <input
            type="tel"
            id="phone"
            placeholder="Nhập số điện thoại"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
          />
          {errors.phone && (
            <span className={styles.error}>
              {errors.phone.message as string}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email <span className={styles.required}>*</span></label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Địa chỉ <span className={styles.required}>*</span></label>
          <input
            type="text"
            id="address"
            placeholder="Nhập địa chỉ"
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
          />
          {errors.address && (
            <span className={styles.error}>
              {errors.address.message as string}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="note">Ghi chú đơn hàng</label>
          <textarea
            id="note"
            rows={3}
            placeholder="Ghi chú về đơn hàng"
            {...register("note")}
          />
        </div>
      </div>

      <div className={styles.paymentMethod}>
        <h3 className={styles.sectionTitle}>Phương thức thanh toán</h3>
        <div className={styles.paymentOptions}>
          <label className={styles.paymentOption}>
            <input type="radio" value="cod" {...register("paymentMethod")} />
            <span className={styles.paymentRadio}></span>
            <span className={styles.paymentLabel}>
              Tiền mặt khi nhận hàng (COD)
            </span>
          </label>
          <label className={styles.paymentOption}>
            <input type="radio" value="vnpay" {...register("paymentMethod")} />
            <span className={styles.paymentRadio}></span>
            <span className={styles.paymentLabel}>
              Thanh toán qua VNPay
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
