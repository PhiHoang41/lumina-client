import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { formatVND } from "../../../utils/currency";
import styles from "./OrderSummary.module.css";

const OrderSummary = () => {
  const { handleSubmit } = useFormContext();

  const subtotal = 1500000;
  const discount = 100000;
  const total = subtotal - discount;

  const orderItems = [
    {
      id: 1,
      name: "Áo Thun Nam Basic",
      variant: "Trắng / L",
      price: 350000,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Quần Jean Slim",
      variant: "Xanh đậm / 32",
      price: 800000,
      quantity: 1,
      image: "https://via.placeholder.com/80",
    },
  ];

  const onSubmit = (data: any) => {
    console.log("Order submitted:", data);
  };

  return (
    <div className={styles.orderSummary}>
      <h3 className={styles.sectionTitle}>Tóm tắt đơn hàng</h3>

      <div className={styles.productList}>
        {orderItems.map((item) => (
          <div key={item.id} className={styles.productItem}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <p className={styles.productName}>{item.name}</p>
              <p className={styles.productVariant}>{item.variant}</p>
              <p className={styles.productQty}>x{item.quantity}</p>
            </div>
            <p className={styles.productPrice}>
              {formatVND(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.summaryRow}>
        <span>Tạm tính</span>
        <span>{formatVND(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className={`${styles.summaryRow} ${styles.discount}`}>
          <span>Giảm giá</span>
          <span>-{formatVND(discount)}</span>
        </div>
      )}
      <div className={`${styles.summaryRow} ${styles.total}`}>
        <span>Tổng cộng</span>
        <span>{formatVND(total)}</span>
      </div>

      <button
        type="button"
        className={styles.placeOrderButton}
        onClick={handleSubmit(onSubmit)}
      >
        Đặt hàng
      </button>

      <Link to="/cart" className={styles.backLink}>
        ← Quay lại giỏ hàng
      </Link>
    </div>
  );
};

export default OrderSummary;
