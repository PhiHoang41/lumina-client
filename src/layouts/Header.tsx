import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import SearchForm from "../components/SearchForm";
import { isAuthenticated } from "../utils/token";
import authService from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user } = useAuth();

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
                <span>Free Delivery:</span> Take advantage of our time to save
                event
              </li>
              <li>
                <span>Free Returns *</span> Satisfaction guaranteed
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
                    Hi, {user?.fullName || "User"} <i className="ion-chevron-down"></i>
                  </a>
                  <ul
                    className={`dropdown_links ${activeDropdown === "user" ? "open" : ""}`}
                  >
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
                    <Link to="/login">Login</Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link to="/register">Register</Link>
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
                  <img src="/assets/img/logo/language.png" alt="" /> English{" "}
                  <i className="ion-chevron-down"></i>
                </a>
                <ul
                  className={`dropdown_language ${activeDropdown === "language" ? "open" : ""}`}
                >
                  <li>
                    <a href="#">
                      <img src="/assets/img/logo/cigar.jpg" alt="" /> French
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src="/assets/img/logo/language2.png" alt="" /> German
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
                  USD <i className="ion-chevron-down"></i>
                </a>
                <ul
                  className={`dropdown_currency ${activeDropdown === "currency" ? "open" : ""}`}
                >
                  <li>
                    <a href="#">EUR</a>
                  </li>
                  <li>
                    <a href="#">BRL</a>
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
                      Hi, {user?.fullName || "User"}<i className="ion-chevron-down"></i>
                    </a>
                    <ul
                      className={`dropdown_links ${activeDropdown === "user2" ? "open" : ""}`}
                    >
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
                      <Link to="/login">Login</Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="cart_link">
              <a href="#">
                <i className="fa fa-shopping-basket"></i>2 item(s)
              </a>
              <div className="mini_cart">
                <div className="cart_item top">
                  <div className="cart_img">
                    <a href="#">
                      <img src="/assets/img/s-product/product.jpg" alt="" />
                    </a>
                  </div>
                  <div className="cart_info">
                    <a href="#">Apple iPhone SE 16GB</a>
                    <span>1x $60.00</span>
                  </div>
                  <div className="cart_remove">
                    <a href="#">
                      <i className="ion-android-close"></i>
                    </a>
                  </div>
                </div>
                <div className="cart_item bottom">
                  <div className="cart_img">
                    <a href="#">
                      <img src="/assets/img/s-product/product2.jpg" alt="" />
                    </a>
                  </div>
                  <div className="cart_info">
                    <a href="#">Marshall Portable Bluetooth</a>
                    <span>1x $160.00</span>
                  </div>
                  <div className="cart_remove">
                    <a href="#">
                      <i className="ion-android-close"></i>
                    </a>
                  </div>
                </div>
                <div className="cart__table">
                  <table>
                    <tbody>
                      <tr>
                        <td className="text-left">Sub-Total :</td>
                        <td className="text-right">$150.00</td>
                      </tr>
                      <tr>
                        <td className="text-left">Total :</td>
                        <td className="text-right">$184.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="cart_button view_cart">
                  <Link to="/cart">View Cart</Link>
                </div>
                <div className="cart_button checkout">
                  <a href="checkout.html">Checkout</a>
                </div>
              </div>
            </div>
          </div>

          <div id="menu" className="text-left">
            <ul className="offcanvas_main_menu">
              <li className="menu-item-has-children">
                <a href="#">Home</a>
                <ul className="sub-menu">
                  <li>
                    <a href="/">Home 1</a>
                  </li>
                  <li>
                    <a href="index-2.html">Home 2</a>
                  </li>
                  <li>
                    <a href="index-3.html">Home 3</a>
                  </li>
                  <li>
                    <a href="index-4.html">Home 4</a>
                  </li>
                  <li>
                    <a href="index-5.html">Home 5</a>
                  </li>
                  <li>
                    <a href="index-6.html">Home 6</a>
                  </li>
                  <li>
                    <a href="index-7.html">Home 7</a>
                  </li>
                  <li>
                    <a href="index-8.html">Home 8</a>
                  </li>
                  <li>
                    <a href="index-9.html">Home 9</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#">Shop</a>
                <ul className="sub-menu">
                  <li className="menu-item-has-children">
                    <a href="#">Shop Layouts</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="shop.html">shop</a>
                      </li>
                      <li>
                        <a href="shop-fullwidth.html">Full Width</a>
                      </li>
                      <li>
                        <a href="shop-fullwidth-list.html">Full Width list</a>
                      </li>
                      <li>
                        <a href="shop-right-sidebar.html">Right Sidebar</a>
                      </li>
                      <li>
                        <a href="shop-right-sidebar-list.html">
                          Right Sidebar list
                        </a>
                      </li>
                      <li>
                        <a href="shop-list.html">List View</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">other Pages</a>
                    <ul className="sub-menu">
                      <li>
                        <a href="portfolio.html">portfolio</a>
                      </li>
                      <li>
                        <a href="portfolio-details.html">portfolio details</a>
                      </li>
                      <li>
                        <a href="cart.html">cart</a>
                      </li>
                      <li>
                        <a href="checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="my-account.html">my account</a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Product Types</a>
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
                <a href="#">blog</a>
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
                <a href="#">pages</a>
                <ul className="sub-menu">
                  <li>
                    <a href="about.html">About Us</a>
                  </li>
                  <li>
                    <a href="services.html">services</a>
                  </li>
                  <li>
                    <a href="faq.html">Frequently Questions</a>
                  </li>
                  <li>
                    <a href="contact.html">contact</a>
                  </li>
                  <li>
                    <a href="login.html">login</a>
                  </li>
                  <li>
                    <a href="wishlist.html">Wishlist</a>
                  </li>
                  <li>
                    <a href="404.html">Error 404</a>
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
                <a href="my-account.html">my account</a>
              </li>
              <li className="menu-item-has-children">
                <a href="about.html">About Us</a>
              </li>
              <li className="menu-item-has-children">
                <a href="contact.html">Contact Us</a>
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
                      <span>Free Delivery:</span> Take advantage of our time to
                      save event
                    </li>
                    <li>
                      <span>Free Returns *</span> Satisfaction guaranteed
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
                          Hi, {user?.fullName || "User"} <i className="ion-chevron-down"></i>
                        </a>
                        <ul
                          className={`dropdown_links ${activeDropdown === "user3" ? "open" : ""}`}
                        >
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
                          <Link to="/login">Login</Link>
                        </li>
                        <li>/</li>
                        <li>
                          <Link to="/register">Register</Link>
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
                    <div className="cart_link">
                      <a href="#">
                        <i className="fa fa-shopping-basket"></i>2 item(s)
                      </a>
                      <div className="mini_cart">
                        <div className="cart_item top">
                          <div className="cart_img">
                            <a href="#">
                              <img
                                src="/assets/img/s-product/product.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="cart_info">
                            <a href="#">Apple iPhone SE 16GB</a>
                            <span>1x $60.00</span>
                          </div>
                          <div className="cart_remove">
                            <a href="#">
                              <i className="ion-android-close"></i>
                            </a>
                          </div>
                        </div>
                        <div className="cart_item bottom">
                          <div className="cart_img">
                            <a href="#">
                              <img
                                src="/assets/img/s-product/product2.jpg"
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="cart_info">
                            <a href="#">Marshall Portable Bluetooth</a>
                            <span>1x $160.00</span>
                          </div>
                          <div className="cart_remove">
                            <a href="#">
                              <i className="ion-android-close"></i>
                            </a>
                          </div>
                        </div>
                        <div className="cart__table">
                          <table>
                            <tbody>
                              <tr>
                                <td className="text-left">Sub-Total :</td>
                                <td className="text-right">$150.00</td>
                              </tr>
                              <tr>
                                <td className="text-left">Total :</td>
                                <td className="text-right">$184.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="cart_button view_cart">
                          <Link to="/cart">View Cart</Link>
                        </div>
                        <div className="cart_button checkout">
                          <a href="checkout.html">Checkout</a>
                        </div>
                      </div>
                    </div>
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
                        <NavLink to="/">Home</NavLink>
                      </li>
                      <li>
                        <NavLink to="/products">Products</NavLink>
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
                        <a href="about.html">About Us</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact Us</a>
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
                          <a href="about.html">About Us</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact Us</a>
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
