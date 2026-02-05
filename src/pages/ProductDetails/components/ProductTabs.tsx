import { useState } from "react";
import type { ProductDetails } from "../types/productDetails.types";

interface ProductTabsProps {
  product: ProductDetails;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<"info" | "sheet" | "reviews">(
    "info",
  );

  return (
    <div className="product_d_info">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="product_d_inner">
              {/* Tab Navigation */}
              <div className="product_info_button">
                <ul className="nav" role="tablist">
                  <li>
                    <a
                      className={activeTab === "info" ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("info");
                      }}
                      href="#"
                    >
                      More info
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeTab === "sheet" ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("sheet");
                      }}
                      href="#"
                    >
                      Data sheet
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeTab === "reviews" ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("reviews");
                      }}
                      href="#"
                    >
                      Reviews
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {/* More Info Tab */}
                {activeTab === "info" && (
                  <div className="tab-pane fade show active">
                    <div className="product_info_content">
                      <p>{product.moreInfo}</p>
                    </div>
                  </div>
                )}

                {/* Data Sheet Tab */}
                {activeTab === "sheet" && (
                  <div className="tab-pane fade show active">
                    <div className="product_d_table">
                      <form action="#">
                        <table>
                          <tbody>
                            {product.specifications.map((spec, index) => (
                              <tr key={index}>
                                <td className="first_child">{spec.key}</td>
                                <td>{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </form>
                    </div>
                    <div className="product_info_content">
                      <p>{product.moreInfo}</p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="tab-pane fade show active">
                    <div className="product_info_content">
                      <p>{product.moreInfo}</p>
                    </div>

                    {/* Display Reviews */}
                    {product.reviews.map((review, index) => (
                      <div className="product_info_inner" key={index}>
                        <div className="product_ratting mb-10">
                          <ul>
                            {[...Array(5)].map((_, i) => (
                              <li key={i}>
                                <a href="#">
                                  <i
                                    className={`fa fa-star${i < review.rating ? "" : "-o"}`}
                                  ></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                          <strong>{review.author}</strong>
                          <p>{review.date}</p>
                        </div>
                        <div className="product_demo">
                          <strong>review</strong>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))}

                    {/* Review Form */}
                    <div className="product_review_form">
                      <form action="#">
                        <h2>Add a review </h2>
                        <p>
                          Your email address will not be published. Required
                          fields are marked{" "}
                        </p>
                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="review_comment">Your review </label>
                            <textarea
                              name="comment"
                              id="review_comment"
                            ></textarea>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label htmlFor="author">Name</label>
                            <input id="author" type="text" />
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <label htmlFor="email">Email </label>
                            <input id="email" type="text" />
                          </div>
                        </div>
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
