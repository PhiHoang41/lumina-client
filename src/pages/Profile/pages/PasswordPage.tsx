import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import api from "../../../services/api";
import styles from "../components/AccountForm.module.css";
import passwordStyles from "./PasswordPage.module.css";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc"),
    newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Xác nhận mật khẩu là bắt buộc"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Mật khẩu mới phải khác mật khẩu hiện tại",
    path: ["newPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

const PasswordPage = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const passwordChangeMutation = useMutation<
    ChangePasswordResponse,
    Error,
    PasswordFormData
  >({
    mutationFn: async (data) => {
      const response = await api.put<ChangePasswordResponse>(
        "/users/me/password",
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Đổi mật khẩu thành công!");
      reset();
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: PasswordFormData) => {
    passwordChangeMutation.mutate(data);
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div>
      <h2 className="mb-1">Đổi mật khẩu</h2>
      <p className={passwordStyles.pageDesc}>
        Thay đổi mật khẩu để bảo mật tài khoản
      </p>

      {passwordChangeMutation.isSuccess && (
        <div className={styles.successMessage}>
          <i className="fa fa-check-circle"></i>
          Đổi mật khẩu thành công!
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${styles.passwordForm}`}
      >
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Mật khẩu hiện tại <span className={styles.required}>*</span>
          </label>
          <div className={passwordStyles.inputWrapper}>
            <input
              type={showPasswords.current ? "text" : "password"}
              {...register("currentPassword")}
              className={`${styles.input} ${errors.currentPassword ? styles.inputError : ""} ${passwordStyles.input}`}
              placeholder="Nhập mật khẩu hiện tại"
              disabled={passwordChangeMutation.isPending}
            />
            <button
              type="button"
              onClick={() => togglePassword("current")}
              className={passwordStyles.toggleButton}
            >
              <i
                className={`fa ${showPasswords.current ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          {errors.currentPassword && (
            <span className={styles.errorMessage}>
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Mật khẩu mới <span className={styles.required}>*</span>
          </label>
          <div className={passwordStyles.inputWrapper}>
            <input
              type={showPasswords.new ? "text" : "password"}
              {...register("newPassword")}
              className={`${styles.input} ${errors.newPassword ? styles.inputError : ""} ${passwordStyles.input}`}
              placeholder="Nhập mật khẩu mới"
              disabled={passwordChangeMutation.isPending}
            />
            <button
              type="button"
              onClick={() => togglePassword("new")}
              className={passwordStyles.toggleButton}
            >
              <i
                className={`fa ${showPasswords.new ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          {errors.newPassword && (
            <span className={styles.errorMessage}>
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Xác nhận mật khẩu <span className={styles.required}>*</span>
          </label>
          <div className={passwordStyles.inputWrapper}>
            <input
              type={showPasswords.confirm ? "text" : "password"}
              {...register("confirmPassword")}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""} ${passwordStyles.input}`}
              placeholder="Nhập lại mật khẩu mới"
              disabled={passwordChangeMutation.isPending}
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className={passwordStyles.toggleButton}
            >
              <i
                className={`fa ${showPasswords.confirm ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={passwordChangeMutation.isPending}
        >
          {passwordChangeMutation.isPending ? (
            <>
              <span className={styles.spinner}></span>
              Đang đổi mật khẩu...
            </>
          ) : (
            <>
              <i className="fa fa-lock"></i>
              Đổi mật khẩu
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordPage;
