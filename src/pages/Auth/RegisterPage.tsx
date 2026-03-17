import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Trang chủ", path: "/" },
    { label: "Đăng ký" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="customer_login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="account_form">
                <h2>Bạn đã có tài khoản?</h2>
                <p>
                  Nếu bạn đã có tài khoản, vui lòng đăng nhập để truy cập
                  trải nghiệm mua sắm cá nhân hóa của bạn.
                </p>
                <div className="login_submit">
                  <Link to="/login">
                    <button type="button">Đăng nhập</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
