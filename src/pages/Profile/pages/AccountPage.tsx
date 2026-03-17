import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";
import { uploadImage } from "../../../services/uploadService";
import { queryClient } from "../../../main";
import { useAuth } from "../../../hooks/useAuth";
import styles from "../components/AccountForm.module.css";

const accountSchema = z.object({
  fullName: z
    .string()
    .min(1, "Họ tên là bắt buộc")
    .min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type AccountFormData = z.infer<typeof accountSchema>;

const AccountPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user, isLoading: isLoadingUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user, reset]);

  const updateUserMutation = useMutation({
    mutationFn: async (data: AccountFormData) => {
      let avatarUrl: string | undefined;

      if (avatarFile) {
        const uploadResult = await uploadImage(avatarFile, "avatars");
        avatarUrl = uploadResult.secure_url;
      } else if (user?.avatar) {
        avatarUrl = user.avatar;
      }

      return authService.updateUser({
        fullName: data.fullName,
        phone: data.phone || null,
        address: data.address || null,
        avatar: avatarUrl || null,
      });
    },
    onSuccess: (data) => {
      setSuccessMessage(data.message || "Cập nhật thông tin thành công!");
      setErrorMessage(null);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setAvatarFile(null);
      setNewAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error: any) => {
      setErrorMessage(
        error.response?.data?.message ||
          "Cập nhật thông tin thất bại. Vui lòng thử lại.",
      );
      setSuccessMessage(null);
    },
  });

  const onSubmit = (data: AccountFormData) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    updateUserMutation.mutate(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatarPreview(reader.result as string);
        setAvatarFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const avatarSrc = newAvatarPreview || user?.avatar || null;

  if (isLoadingUser) {
    return (
      <div>
        <h2 className={styles.contentTitle}>Thông tin tài khoản</h2>
        <p className={styles.contentDesc}>Quản lý thông tin cá nhân của bạn</p>
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
          <p className={styles.placeholderText}>Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-1">Thông tin tài khoản</h2>
      <p className="mb-3" style={{ color: "#777", marginBottom: "24px" }}>
        Quản lý thông tin cá nhân của bạn
      </p>

      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className={styles.form}
      >
        <div className={styles.avatarSection}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Avatar"
              className={styles.avatarPreview}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <i className="fa fa-user"></i>
            </div>
          )}
          <div className={styles.avatarInfo}>
            <p className={styles.avatarLabel}>Ảnh đại diện</p>
            <button
              type="button"
              className={styles.avatarButton}
              onClick={handleAvatarClick}
            >
              Chọn ảnh
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={styles.avatarInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Họ tên <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            {...register("fullName")}
            className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
            placeholder="Nhập họ tên của bạn"
          />
          {errors.fullName && (
            <span className={styles.errorMessage}>
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            disabled
            className={`${styles.input} ${styles.inputDisabled}`}
            placeholder="Nhập email của bạn"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Số điện thoại</label>
          <input
            type="tel"
            {...register("phone")}
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && (
            <span className={styles.errorMessage}>{errors.phone.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Địa chỉ</label>
          <textarea
            {...register("address")}
            className={`${styles.input} ${styles.textarea} ${errors.address ? styles.inputError : ""}`}
            placeholder="Nhập địa chỉ của bạn"
            rows={3}
          />
          {errors.address && (
            <span className={styles.errorMessage}>
              {errors.address.message}
            </span>
          )}
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            <i className="fa fa-check-circle"></i> {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>
            <i className="fa fa-exclamation-circle"></i> {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? (
            <>
              <span className={styles.spinner}></span>
              Đang lưu...
            </>
          ) : (
            <>
              <i className="fa fa-save"></i>
              Lưu thay đổi
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
