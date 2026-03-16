import styles from "../ProfilePage.module.css";

const AccountPage = () => {
  return (
    <div>
      <h2 className={styles.contentTitle}>Thông tin tài khoản</h2>
      <p className={styles.contentDesc}>Quản lý thông tin cá nhân của bạn</p>
      <div className={styles.placeholder}>
        <div className={styles.placeholderIcon}>
          <i className="fa fa-user-circle-o"></i>
        </div>
        <p className={styles.placeholderText}>Chức năng đang được phát triển</p>
      </div>
    </div>
  );
};

export default AccountPage;
