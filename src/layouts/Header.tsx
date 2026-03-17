import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SearchForm from "../components/SearchForm";
import { isAuthenticated } from "../utils/token";
import authService from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import cartService from "../services/cartService";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user } = useAuth();
  const isAuth = isAuthenticated();

  const { data: cartCountData } = useQuery({
    queryKey: ["cartCount"],
    queryFn: () => cartService.getCartCount(),
    enabled: isAuth,
  });

  const cartCount = cartCountData?.itemCount || 0;

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".top_links, .currency, .language")) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    toast.success("Đăng xuất thành công!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <>
      {/* Offcanvas menu area */}
      <div
        className={`off_canvars_overlay ${isOffcanvasOpen ? "active" : ""}`}
        onClick={() => setIsOffcanvasOpen(false)}
      ></div>
      <div className={`offcanvas_menu ${isOffcanvasOpen ? "active" : ""}`}>
        <div className="canvas_open">
          <a href="javascript:void(0)" onClick={() => setIsOffcanvasOpen(true)}>
            <i className="ion-navicon"></i>
          </a>
        </div>
        <div className="offcanvas_menu_wrapper">
          <div className="canvas_close">
            <a
              href="javascript:void(0)"
              onClick={() => setIsOffcanvasOpen(false)}
            >
              <i className="ion-android-close"></i>
            </a>
          </div>
          <div className="welcome_text">
            <ul>
              <li>
                <span>Miễn phí vận chuyển:</span> Tận dụng cơ hội tiết kiệm của
                chúng tôi
              </li>
              <li>
                <span>Miễn phí đổi trả *</span> Đảm bảo hài lòng
              </li>
            </ul>
          </div>

          <div className="top_right">
            <ul>
              {isAuthenticated() ? (
                <li className="top_links">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown("user");
                    }}
                  >
                    Xin chào, {user?.fullName || "User"}{" "}
                    <i className="ion-chevron-down"></i>
                  </a>
                  <ul
                    className={`dropdown_links ${activeDropdown === "user" ? "open" : ""}`}
                  >
                    <li>
                      <Link to="/profile">Hồ sơ</Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link to="/register">Đăng ký</Link>
                  </li>
                </>
              )}
              <li className="language">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("language");
                  }}
                >
                  <img src="/assets/img/logo/language.png" alt="" /> Tiếng Việt{" "}
                  <i className="ion-chevron-down"></i>
                </a>
                <ul
                  className={`dropdown_language ${activeDropdown === "language" ? "open" : ""}`}
                >
                  <li>
                    <a href="#">
                      <img src="/assets/img/logo/cigar.jpg" alt="" /> Tiếng Pháp
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/logo/language2.png" alt="" /> Tiếng Đức
                    </a>
                  </li>
                </ul>
              </li>
              <li className="currency">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("currency");
                  }}
                >
                  VND <i className="ion-chevron-down"></i>
                </a>
                <ul
                  className={`dropdown_currency ${activeDropdown === "currency" ? "open" : ""}`}
                >
                  <li>
                    <a href="#">EUR</a>
                  </li>
                  <li>
                    <a href="#">USD</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="search_bar">
            <SearchForm showCategorySelect={true} />
          </div>

          <div className="cart_area">
            <div className="middel_links">
              <ul>
                {isAuthenticated() ? (
                  <li className="top_links">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown("user2");
                      }}
                    >
                      Hi, {user?.fullName || "User"}
                      <i className="ion-chevron-down"></i>
                    </a>
                    <ul
                      className={`dropdown_links ${activeDropdown === "user2" ? "open" : ""}`}
                    >
                      <li>
                        <Link to="/profile">Hồ sơ</Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                          }}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link to="/register">Đăng ký</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {isAuth && (
              <div className="cart_link">
                <Link to="/cart">
                  <i className="fa fa-shopping-basket"></i>
                  {cartCount} sản phẩm
                </Link>
              </div>
            )}
          </div>

          <div id="menu" className="text-left">
            <ul className="offcanvas_main_menu">
              <li className="menu-item-has-children">
                <a href="#">Trang chủ</a>
                <ul className="sub-menu">
                  <li>
                    <a href="/">Trang chủ 1</a>
                  </li>
                  <li>
                    <a href="index-2.html">Trang chủ 2</a>
                  </li>
                  <li>
                    <a href="index-3.html">Trang chủ 3</a>
                  </li>
                  <li>
                    <a href="index-4.html">Trang chủ 4</a>
                  </li>
                  <li>
                    <a href="index-5.html">Trang chủ 5</a>
                  </li>
                  <li>
                    <a href="index-6.html">Trang chủ 6</a>
                  </li>
                  <li>
                    <a href="index-7.html">Trang chủ 7</a>
                  </li>
                  <li>
                    <a href="index-8.html">Trang chủ 8</a>
                  </li>
                  <li>
                    <a href="index-9.html">Trang chủ 9</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Sản phẩm</a>
                <ul className="sub-menu">
                  <li className="menu-item-has-children">
                    <a href="#">Bố cục cửa hàng</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="shop.html">Cửa hàng</a>
                      </li>
                      <li>
                        <a href="shop-fullwidth.html">Toàn chiều rộng</a>
                      </li>
                      <li>
                        <a href="shop-fullwidth-list.html">Danh sách toàn chiều rộng</a>
                      </li>
                      <li>
                        <a href="shop-right-sidebar.html">Thanh bên phải</a>
                      </li>
                      <li>
                        <a href="shop-right-sidebar-list.html">
                          Thanh bên phải list
                        </a>
                      </li>
                      <li>
                        <a href="shop-list.html">Xem danh sách</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Các trang khác</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="portfolio.html">portfolio</a>
                      </li>
                      <li>
                        <a href="portfolio-details.html">portfolio details</a>
                      </li>
                      <li>
                        <a href="checkout.html">Thanh toán</a>
                      </li>
                      <li>
                        <a href="checkout.html">Thanh toán</a>
                      </li>
                      <li>
                        <Link to="/profile">Tài khoản</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Loại sản phẩm</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="product-details.html">product details</a>
                      </li>
                      <li>
                        <a href="product-sidebar.html">product sidebar</a>
                      </li>
                      <li>
                        <a href="product-grouped.html">product grouped</a>
                      </li>
                      <li>
                        <a href="variable-product.html">product variable</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Tin tức</a>
                <ul className="sub-menu">
                  <li>
                    <a href="blog.html">blog</a>
                  </li>
                  <li>
                    <a href="blog-details.html">blog details</a>
                  </li>
                  <li>
                    <a href="blog-sidebar.html">blog Sidebar</a>
                  </li>
                  <li>
                    <a href="blog-fullwidth.html">blog fullwidth</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Trang</a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/about">Về chúng tôi</Link>
                  </li>
                  <li>
                    <a href="services.html">services</a>
                  </li>
                  <li>
                    <a href="faq.html">Câu hỏi thường gặp</a>
                  </li>
                  <li>
                    <Link to="/contact">Liên hệ</Link>
                  </li>
                  <li>
                    <a href="login.html">login</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Danh sách yêu thích</a>
                  </li>
                  <li>
                    <a href="404.html">Lỗi 404</a>
                  </li>
                  <li>
                    <a href="compare.html">compare</a>
                  </li>
                  <li>
                    <a href="privacy-policy.html">privacy policy</a>
                  </li>
                  <li>
                    <a href="coming-soon.html">coming soon</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link to="/profile">Tài khoản</Link>
              </li>
              <li className="menu-item-has-children">
                <Link to="/about">Về chúng tôi</Link>
              </li>
              <li className="menu-item-has-children">
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </div>

          <div className="offcanvas_footer">
            <span>
              <a href="#">
                <i className="fa fa-envelope-o"></i> info@yourdomain.com
              </a>
            </span>
            <ul>
              <li className="facebook">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="twitter">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="pinterest">
                <a href="#">
                  <i className="fa fa-pinterest-p"></i>
                </a>
              </li>
              <li className="google-plus">
                <a href="#">
                  <i className="fa fa-google-plus"></i>
                </a>
              </li>
              <li className="linkedin">
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Header area */}
      <header className="header_area header_three">
        {/* Header top */}
        <div className="header_top">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12">
                <div className="welcome_text">
                  <ul>
                    <li>
                      <span>Miễn phí vận chuyển:</span> Tận dụng cơ hội tiết
                      kiệm của chúng tôi
                    </li>
                    <li>
                      <span>Miễn phí đổi trả *</span> Đảm bảo hài lòng
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-5 col-md-12">
                <div className="top_right text-right">
                  <ul>
                    {isAuthenticated() ? (
                      <li className="top_links">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDropdown("user3");
                          }}
                        >
                          Hi, {user?.fullName || "User"}{" "}
                          <i className="ion-chevron-down"></i>
                        </a>
                        <ul
                          className={`dropdown_links ${activeDropdown === "user3" ? "open" : ""}`}
                        >
                          <li>
                            <Link to="/profile">Hồ sơ</Link>
                          </li>
                          <li>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                              }}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link to="/login">Đăng nhập</Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link to="/register">Đăng ký</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header middle */}
        <div className="header_middel">
          <div className="container-fluid">
            <div className="middel_inner">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="search_bar">
                    <SearchForm showCategorySelect={false} />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="logo">
                    <Link to="/">
                      <img src="/assets/img/logo/logo.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="cart_area">
                    {isAuth && (
                      <div className="cart_link">
                        <Link to="/cart">
                          <i className="fa fa-shopping-basket"></i>
                          {cartCount > 0 && `${cartCount} sản phẩm`}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="horizontal_menu">
              <div className="left_menu">
                <div className="main_menu">
                  <nav>
                    <ul>
                      <li>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Trang chủ
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/products"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Sản phẩm
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="logo_container">
                <Link to="/">
                  <img src="/assets/img/logo/logo.png" alt="" />
                </Link>
              </div>
              <div className="right_menu">
                <div className="main_menu">
                  <nav>
                    <ul>
                      <li>
                        <NavLink
                          to="/about"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Về chúng tôi
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contact"
                          className={({ isActive }) =>
                            isActive ? "active" : ""
                          }
                        >
                          Liên hệ
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header bottom */}
        <div className="header_bottom sticky-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="main_menu_inner">
                  <div className="main_menu">
                    <nav>
                      <ul>
                        <li>
                          <NavLink
                            to="/"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/products"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Products
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/about"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Về chúng tôi
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                          >
                            Liên hệ
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
