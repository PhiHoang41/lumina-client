import { NavLink, Outlet } from "react-router-dom";
import styles from "../ProfilePage.module.css";

const ProfileLayout = () => {
  return (
    <div className={styles.profilePage}>
      <div className="container">
        <div className={styles.profileLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  <i className="fa fa-user"></i>
                </div>
                <h3 className={styles.userName}>Tài khoản của tôi</h3>
              </div>
              <ul className={styles.navMenu}>
                <li className={styles.navItem}>
                  <NavLink
                    to="/profile/orders"
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ""}`
                    }
                  >
                    <span className={styles.navIcon}>
                      <i className="fa fa-shopping-bag"></i>
                    </span>
                    Đơn hàng của tôi
                  </NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink
                    to="/profile/account"
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ""}`
                    }
                  >
                    <span className={styles.navIcon}>
                      <i className="fa fa-user"></i>
                    </span>
                    Thông tin tài khoản
                  </NavLink>
                </li>
                <li className={styles.navItem}>
                  <NavLink
                    to="/profile/password"
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.active : ""}`
                    }
                  >
                    <span className={styles.navIcon}>
                      <i className="fa fa-lock"></i>
                    </span>
                    Đổi mật khẩu
                  </NavLink>
                </li>
              </ul>
            </div>
          </aside>

          {/* Content */}
          <main className={styles.content}>
            <div className={styles.contentCard}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
