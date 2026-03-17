import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", path: "/" },
    { label: "Đăng nhập" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="customer_login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <LoginForm />
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="account_form register">
                <h2>Khách hàng mới</h2>
                <p>
                  Bạn chưa có tài khoản? Đăng ký ngay để nhận các ưu đãi độc quyền
                  và trải nghiệm mua sắm cá nhân hóa.
                </p>
                <div className="login_submit">
                  <Link to="/register">
                    <button type="button">Tạo tài khoản</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
