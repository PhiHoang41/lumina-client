import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "login" },
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
                <h2>New Customer</h2>
                <p>
                  Don't have an account yet? Register now to enjoy exclusive
                  benefits and personalized shopping experience.
                </p>
                <div className="login_submit">
                  <Link to="/register">
                    <button type="button">Create an Account</button>
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
