import { useState } from "react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="footer_widgets">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                <div className="widgets_container">
                  <h3>Information</h3>
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="about.html">About Us</a>
                      </li>
                      <li>
                        <a href="#">Delivery Information</a>
                      </li>
                      <li>
                        <a href="privacy-policy.html">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms & Conditions</a>
                      </li>
                      <li>
                        <a href="contact.html">Contact Us</a>
                      </li>
                      <li>
                        <a href="#">Returns</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                <div className="widgets_container">
                  <h3>Extras</h3>
                  <div className="footer_menu">
                    <ul>
                      <li>
                        <a href="#">Brands</a>
                      </li>
                      <li>
                        <a href="#">Gift Certificates</a>
                      </li>
                      <li>
                        <a href="#">Affiliate</a>
                      </li>
                      <li>
                        <a href="#">Specials</a>
                      </li>
                      <li>
                        <a href="contact.html">Site Map</a>
                      </li>
                      <li>
                        <a href="my-account.html">My Account</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="widgets_container contact_us">
                  <h3>Contact Us</h3>
                  <div className="footer_contact">
                    <p>
                      Address: 6688 Princess Road, London, Greater London BAS
                      23JK, UK
                    </p>
                    <p>
                      Phone:{" "}
                      <a href="tel:+(+012)800456789-987">
                        (+012) 800 456 789 - 987
                      </a>
                    </p>
                    <p>Email: demo@example.com</p>
                    <ul>
                      <li>
                        <a href="#" title="Twitter">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="google-plus">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="facebook">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" title="youtube">
                          <i className="fa fa-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="widgets_container newsletter">
                  <h3>Join Our Newsletter Now</h3>
                  <div className="newleter-content">
                    <p>
                      Exceptional quality. Ethical factories. Sign up to enjoy
                      free U.S. shipping and returns on your first order.
                    </p>
                    <div className="subscribe_form">
                      <form id="mc-form" className="mc-form footer-newsletter">
                        <input
                          id="mc-email"
                          type="email"
                          autoComplete="off"
                          placeholder="Enter you email address here..."
                        />
                        <button id="mc-submit">Subscribe !</button>
                      </form>
                      <div className="mailchimp-alerts text-centre">
                        <div className="mailchimp-submitting"></div>
                        <div className="mailchimp-success"></div>
                        <div className="mailchimp-error"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="copyright_area">
                  <p>
                    {" "}
                    &copy; 2021 <strong></strong> Made with ❤️ by{" "}
                    <a
                      href="https://hasthemes.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <strong>HasThemes</strong>
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="footer_custom_links">
                  <ul>
                    <li>
                      <a href="#">Order History</a>
                    </li>
                    <li>
                      <a href="wishlist.html">Wish List</a>
                    </li>
                    <li>
                      <a href="#">Newsletter</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          id="modal_box"
          tabIndex={-1}
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal_body">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-12">
                      <div className="modal_tab">
                        <div className="tab-content product-details-large">
                          <div
                            className="tab-pane fade show active"
                            id="tab1"
                            role="tabpanel"
                          >
                            <div className="modal_tab_img">
                              <a href="#">
                                <img
                                  src="/assets/img/product/product4.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab2"
                            role="tabpanel"
                          >
                            <div className="modal_tab_img">
                              <a href="#">
                                <img
                                  src="/assets/img/product/product6.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab3"
                            role="tabpanel"
                          >
                            <div className="modal_tab_img">
                              <a href="#">
                                <img
                                  src="/assets/img/product/product8.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab4"
                            role="tabpanel"
                          >
                            <div className="modal_tab_img">
                              <a href="#">
                                <img
                                  src="/assets/img/product/product2.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="tab5"
                            role="tabpanel"
                          >
                            <div className="modal_tab_img">
                              <a href="#">
                                <img
                                  src="/assets/img/product/product12.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="modal_tab_button">
                          <ul
                            className="nav product_navactive owl-carousel"
                            role="tablist"
                          >
                            <li>
                              <a
                                className="nav-link active"
                                data-toggle="tab"
                                href="#tab1"
                                role="tab"
                                aria-controls="tab1"
                                aria-selected="false"
                              >
                                <img
                                  src="/assets/img/s-product/product3.jpg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#tab2"
                                role="tab"
                                aria-controls="tab2"
                                aria-selected="false"
                              >
                                <img
                                  src="/assets/img/s-product/product.jpg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link button_three"
                                data-toggle="tab"
                                href="#tab3"
                                role="tab"
                                aria-controls="tab3"
                                aria-selected="false"
                              >
                                <img
                                  src="/assets/img/s-product/product2.jpg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#tab4"
                                role="tab"
                                aria-controls="tab4"
                                aria-selected="false"
                              >
                                <img
                                  src="/assets/img/s-product/product4.jpg"
                                  alt=""
                                />
                              </a>
                            </li>
                            <li>
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#tab5"
                                role="tab"
                                aria-controls="tab5"
                                aria-selected="false"
                              >
                                <img
                                  src="/assets/img/s-product/product5.jpg"
                                  alt=""
                                />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12">
                      <div className="modal_right">
                        <div className="modal_title mb-10">
                          <h2>Handbag feugiat</h2>
                        </div>
                        <div className="modal_price mb-10">
                          <span className="new_price">$64.99</span>
                          <span className="old_price">$78.99</span>
                        </div>
                        <div className="modal_description mb-15">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Mollitia iste laborum ad impedit pariatur esse
                            optio tempora sint ullam autem deleniti nam in quos
                            qui nemo ipsum numquam, reiciendis maiores quidem
                            aperiam, rerum vel recusandae
                          </p>
                        </div>
                        <div className="variants_selects">
                          <div className="variants_size">
                            <h2>size</h2>
                            <select className="select_option">
                              <option selected value="1">
                                s
                              </option>
                              <option value="1">m</option>
                              <option value="1">l</option>
                              <option value="1">xl</option>
                              <option value="1">xxl</option>
                            </select>
                          </div>
                          <div className="variants_color">
                            <h2>color</h2>
                            <select className="select_option">
                              <option selected value="1">
                                purple
                              </option>
                              <option value="1">violet</option>
                              <option value="1">black</option>
                              <option value="1">pink</option>
                              <option value="1">orange</option>
                            </select>
                          </div>
                          <div className="modal_add_to_cart">
                            <form action="#">
                              <input
                                min={0}
                                max={100}
                                step={2}
                                defaultValue={1}
                                type="number"
                              />
                              <button type="submit">add to cart</button>
                            </form>
                          </div>
                        </div>
                        <div className="modal_social">
                          <h2>Share this product</h2>
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
                                <i className="fa fa-pinterest"></i>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setIsModalOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default Footer;
