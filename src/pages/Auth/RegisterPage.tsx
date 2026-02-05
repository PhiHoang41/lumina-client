import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "register" },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="customer_login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="account_form">
                <h2>Already have an account?</h2>
                <p>
                  If you already have an account with us, please login to access
                  your personalized shopping experience.
                </p>
                <div className="login_submit">
                  <Link to="/login">
                    <button type="button">Login to Your Account</button>
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
