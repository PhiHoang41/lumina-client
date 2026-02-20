import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import authService from "../../../services/authService";
import type { RegisterRequest, RegisterResponse } from "../../../services/authService";

const registerSchema = z
  .object({
    fullName: z.string().min(1, "Họ tên là bắt buộc"),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu không được quá 50 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const registerMutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success(data.message || "Đăng ký thành công!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const { confirmPassword: _confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="account_form register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Họ và tên <span>*</span>
          </label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Nhập họ và tên của bạn"
            disabled={registerMutation.isPending}
          />
          {errors.fullName && (
            <span className="error-message">{errors.fullName.message}</span>
          )}
        </p>
        <p>
          <label>
            Email address <span>*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Nhập email của bạn"
            disabled={registerMutation.isPending}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </p>
        <p>
          <label>
            Password <span>*</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            disabled={registerMutation.isPending}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </p>
        <p>
          <label>
            Confirm Password <span>*</span>
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Nhập lại mật khẩu"
            disabled={registerMutation.isPending}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              {errors.confirmPassword.message}
            </span>
          )}
        </p>
        <div className="login_submit">
          <button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? "Đang đăng ký..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
