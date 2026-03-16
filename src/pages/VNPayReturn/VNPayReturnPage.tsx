import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import orderService from "../../services/orderService";
import styles from "./VNPayReturnPage.module.css";

const VNPayReturnPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"processing" | "success" | "failed">(
    "processing",
  );

  useEffect(() => {
    const handleVNPayReturn = async () => {
      try {
        const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
        const vnp_TxnRef = searchParams.get("vnp_TxnRef");
        const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");

        if (!vnp_TxnRef) {
          setStatus("failed");
          toast.error("Không tìm thấy mã đơn hàng");
          return;
        }

        // Extract order ID from vnp_TxnRef (format: LUMINA_{orderId})
        const orderId = vnp_TxnRef.replace("LUMINA_", "");

        if (vnp_ResponseCode === "00" || vnp_TransactionStatus === "00") {
          // Payment successful
          await orderService.confirmPayment(orderId, {
            status: "CONFIRMED",
            paymentStatus: "PAID",
            vnpTransactionId:
              searchParams.get("vnp_TransactionNo") || undefined,
          });

          setStatus("success");
          toast.success("Thanh toán thành công!");
        } else {
          // Payment failed
          await orderService.confirmPayment(orderId, {
            status: "CANCELLED",
            paymentStatus: "UNPAID",
          });

          setStatus("failed");
          toast.error("Thanh toán thất bại hoặc bị hủy");
        }
      } catch (error) {
        console.error("VNPay return error:", error);
        setStatus("failed");
        toast.error("Có lỗi xảy ra khi xử lý kết quả thanh toán");
      }
    };

    handleVNPayReturn();
  }, [searchParams]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoOrders = () => {
    navigate("/profile/orders");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {status === "processing" && (
          <>
            <div className={styles.spinner}></div>
            <h2>Đang xử lý...</h2>
            <p>Vui lòng chờ trong khi chúng tôi xác nhận kết quả thanh toán.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className={styles.successIcon}>✓</div>
            <h2>Thanh toán thành công!</h2>
            <p>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.</p>
            <div className={styles.actions}>
              <button onClick={handleGoHome} className={styles.primaryButton}>
                Về trang chủ
              </button>
              <button
                onClick={handleGoOrders}
                className={styles.secondaryButton}
              >
                Xem đơn hàng
              </button>
            </div>
          </>
        )}

        {status === "failed" && (
          <>
            <div className={styles.failedIcon}>✕</div>
            <h2>Thanh toán thất bại</h2>
            <p>
              Rất tiếc, thanh toán của bạn không thành công. Vui lòng thử lại
              hoặc liên hệ hỗ trợ.
            </p>
            <div className={styles.actions}>
              <button onClick={handleGoHome} className={styles.primaryButton}>
                Về trang chủ
              </button>
              <button
                onClick={() => navigate("/cart")}
                className={styles.secondaryButton}
              >
                Quay lại giỏ hàng
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VNPayReturnPage;
