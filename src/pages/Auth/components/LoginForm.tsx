const LoginForm = () => {
  return (
    <div className="account_form">
      <h2>login</h2>
      <form action="#">
        <p>
          <label>
            Username or email <span>*</span>
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
          <a href="#">Lost your password?</a>
          <label htmlFor="remember">
            <input id="remember" type="checkbox" />
            Remember me
          </label>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
