import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import authService from "../../../services/authService";
import { setToken } from "../../../utils/token";
import type {
  LoginRequest,
  LoginResponse,
} from "../../../services/authService";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setToken(data.data.accessToken, rememberMe);
      toast.success(data.message || "Đăng nhập thành công!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="account_form">
      <h2>login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>
            Username or email <span>*</span>
          </label>
          <input
            type="text"
            {...register("email")}
            placeholder="Nhập email của bạn"
            disabled={loginMutation.isPending}
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </p>
        <p>
          <label>
            Passwords <span>*</span>
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Nhập mật khẩu"
            disabled={loginMutation.isPending}
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </p>
        <div className="login_submit">
          <a href="#">Lost your password?</a>
          <label htmlFor="remember">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loginMutation.isPending}
            />
            Remember me
          </label>
          <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Đang đăng nhập..." : "login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
