const RegisterForm = () => {
  return (
    <div className="account_form register">
      <h2>Register</h2>
      <form action="#">
        <p>
          <label>
            Email address <span>*</span>
          </label>
          <input type="text" />
        </p>
        <p>
          <label>
            Passwords <span>*</span>
          </label>
          <input type="password" />
        </p>
        <div className="login_submit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
