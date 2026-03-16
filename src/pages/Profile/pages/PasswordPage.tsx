import styles from "../ProfilePage.module.css";

const PasswordPage = () => {
  return (
    <div>
      <h2 className={styles.contentTitle}>Đổi mật khẩu</h2>
      <p className={styles.contentDesc}>Thay đổi mật khẩu để bảo mật tài khoản</p>
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>
          <i className="fa fa-shield"></i>
        </div>
        <p className={styles.placeholderText}>Chức năng đang được phát triển</p>
      </div>
    </div>
  );
};

export default PasswordPage;
