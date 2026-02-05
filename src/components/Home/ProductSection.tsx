import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState("clothing");

  // Complete product data for all tabs
  const products = {
    clothing: [
      {
        id: 1,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product21.jpg",
        img2: "product22.jpg",
      },
      {
        id: 2,
        name: "Koss KPH7 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product4.jpg",
        img2: "product3.jpg",
      },
      {
        id: 3,
        name: "Beats Solo2 Solo 2",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product6.jpg",
        img2: "product5.jpg",
      },
      {
        id: 4,
        name: "Beats EP Wired",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product7.jpg",
        img2: "product8.jpg",
      },
      {
        id: 5,
        name: "Bose SoundLink Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product24.jpg",
        img2: "product25.jpg",
      },
      {
        id: 6,
        name: "Apple iPhone SE 16GB",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product10.jpg",
        img2: "product11.jpg",
      },
      {
        id: 7,
        name: "JBL Flip 3 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product23.jpg",
        img2: "product24.jpg",
      },
      {
        id: 8,
        name: "Beats Solo Wireless",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product15.jpg",
        img2: "product16.jpg",
      },
      {
        id: 9,
        name: "Apple iPad with Retina",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product18.jpg",
        img2: "product17.jpg",
      },
      {
        id: 10,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product19.jpg",
        img2: "product20.jpg",
      },
    ],
    handbag: [
      {
        id: 1,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product20.jpg",
        img2: "product19.jpg",
      },
      {
        id: 2,
        name: "Koss KPH7 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product19.jpg",
        img2: "product18.jpg",
      },
      {
        id: 3,
        name: "Beats Solo2 Solo 2",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product17.jpg",
        img2: "product16.jpg",
      },
      {
        id: 4,
        name: "Beats EP Wired",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product15.jpg",
        img2: "product14.jpg",
      },
      {
        id: 5,
        name: "Bose SoundLink Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product13.jpg",
        img2: "product12.jpg",
      },
      {
        id: 6,
        name: "Apple iPhone SE 16GB",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product11.jpg",
        img2: "product10.jpg",
      },
      {
        id: 7,
        name: "JBL Flip 3 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product9.jpg",
        img2: "product18.jpg",
      },
      {
        id: 8,
        name: "Beats Solo Wireless",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product7.jpg",
        img2: "product6.jpg",
      },
      {
        id: 9,
        name: "Apple iPad with Retina",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product5.jpg",
        img2: "product4.jpg",
      },
      {
        id: 10,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product3.jpg",
        img2: "product2.jpg",
      },
    ],
    shoes: [
      {
        id: 1,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product10.jpg",
        img2: "product11.jpg",
      },
      {
        id: 2,
        name: "Koss KPH7 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product11.jpg",
        img2: "product12.jpg",
      },
      {
        id: 3,
        name: "Beats Solo2 Solo 2",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product13.jpg",
        img2: "product9.jpg",
      },
      {
        id: 4,
        name: "Beats EP Wired",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product8.jpg",
        img2: "product7.jpg",
      },
      {
        id: 5,
        name: "Bose SoundLink Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product12.jpg",
        img2: "product13.jpg",
      },
      {
        id: 6,
        name: "Apple iPhone SE 16GB",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product10.jpg",
        img2: "product11.jpg",
      },
      {
        id: 7,
        name: "JBL Flip 3 Portable",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        isNew: true,
        img1: "product13.jpg",
        img2: "product14.jpg",
      },
      {
        id: 8,
        name: "Beats Solo Wireless",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product15.jpg",
        img2: "product16.jpg",
      },
      {
        id: 9,
        name: "Apple iPad with Retina",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product18.jpg",
        img2: "product17.jpg",
      },
      {
        id: 10,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product19.jpg",
        img2: "product20.jpg",
      },
    ],
    accessories: [
      {
        id: 1,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product1.jpg",
        img2: "product2.jpg",
      },
      {
        id: 2,
        name: "Koss KPH7 Portable",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product4.jpg",
        img2: "product3.jpg",
      },
      {
        id: 3,
        name: "Beats Solo2 Solo 2",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product6.jpg",
        img2: "product5.jpg",
      },
      {
        id: 4,
        name: "Beats EP Wired",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product7.jpg",
        img2: "product8.jpg",
      },
      {
        id: 5,
        name: "Bose SoundLink Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product10.jpg",
        img2: "product9.jpg",
      },
      {
        id: 6,
        name: "Apple iPhone SE 16GB",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product10.jpg",
        img2: "product11.jpg",
      },
      {
        id: 7,
        name: "JBL Flip 3 Portable",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        isNew: true,
        img1: "product13.jpg",
        img2: "product14.jpg",
      },
      {
        id: 8,
        name: "Beats Solo Wireless",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product15.jpg",
        img2: "product16.jpg",
      },
      {
        id: 9,
        name: "Apple iPad with Retina",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        isNew: true,
        img1: "product18.jpg",
        img2: "product17.jpg",
      },
      {
        id: 10,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product19.jpg",
        img2: "product20.jpg",
      },
    ],
    trending: [
      {
        id: 1,
        name: "Marshall Portable Bluetooth",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product21.jpg",
        img2: "product22.jpg",
      },
      {
        id: 2,
        name: "Koss KPH7 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product27.jpg",
        img2: "product28.jpg",
      },
      {
        id: 3,
        name: "Beats Solo2 Solo 2",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product6.jpg",
        img2: "product5.jpg",
      },
      {
        id: 4,
        name: "Beats EP Wired",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product7.jpg",
        img2: "product8.jpg",
      },
      {
        id: 5,
        name: "Bose SoundLink Bluetooth",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product24.jpg",
        img2: "product25.jpg",
      },
      {
        id: 6,
        name: "Apple iPhone SE 16GB",
        price: "£60.00",
        oldPrice: "£86.00",
        sale: "-7%",
        img1: "product10.jpg",
        img2: "product11.jpg",
      },
      {
        id: 7,
        name: "JBL Flip 3 Portable",
        price: "£60.00",
        oldPrice: null,
        sale: null,
        img1: "product23.jpg",
        img2: "product24.jpg",
      },
    ],
  };

  const ProductCard = ({
    product,
  }: {
    product: {
      id: number;
      name: string;
      price: string;
      oldPrice: string | null;
      sale: string | null;
      isNew?: boolean;
      img1: string;
      img2: string;
    };
  }) => (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="single_product">
        <div className="product_thumb">
          <a className="primary_img" href="product-details.html">
            <img src={`/assets/img/product/${product.img1}`} alt="" />
          </a>
          <a className="secondary_img" href="product-details.html">
            <img src={`/assets/img/product/${product.img2}`} alt="" />
          </a>
          <div className="quick_button">
            <a href="#" title="quick_view">
              Xem sản phẩm
            </a>
          </div>
          {product.sale && (
            <div className="product_sale">
              <span>{product.sale}</span>
            </div>
          )}
          {product.isNew && (
            <div className="label_product">
              <span>new</span>
            </div>
          )}
        </div>
        <div className="product_content">
          <h3>
            <a href="product-details.html">{product.name}</a>
          </h3>
          <span className="current_price">{product.price}</span>
          {product.oldPrice && (
            <span className="old_price">{product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Product Section */}
      <section className="product_section womens_product">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section_title">
                <h2>Sản phẩm của chúng tôi</h2>
                <p>Các sản phẩm thiết kế hiện đại,mới nhất</p>
              </div>
            </div>
          </div>
          <div className="product_area">
            <div className="row">
              <div className="col-12">
                <div className="product_tab_button">
                  <ul className="nav" role="tablist">
                    <li>
                      <a
                        className={activeTab === "clothing" ? "active" : ""}
                        data-toggle="tab"
                        href="#clothing"
                        role="tab"
                        aria-controls="clothing"
                        aria-selected={activeTab === "clothing"}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("clothing");
                        }}
                      >
                        Women's
                      </a>
                    </li>
                    <li>
                      <a
                        className={activeTab === "handbag" ? "active" : ""}
                        data-toggle="tab"
                        href="#handbag"
                        role="tab"
                        aria-controls="handbag"
                        aria-selected={activeTab === "handbag"}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("handbag");
                        }}
                      >
                        Men's
                      </a>
                    </li>
                    <li>
                      <a
                        className={activeTab === "shoes" ? "active" : ""}
                        data-toggle="tab"
                        href="#shoes"
                        role="tab"
                        aria-controls="shoes"
                        aria-selected={activeTab === "shoes"}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("shoes");
                        }}
                      >
                        Kid's
                      </a>
                    </li>
                    <li>
                      <a
                        className={activeTab === "accessories" ? "active" : ""}
                        data-toggle="tab"
                        href="#accessories"
                        role="tab"
                        aria-controls="accessories"
                        aria-selected={activeTab === "accessories"}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("accessories");
                        }}
                      >
                        Shoes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "clothing" ? "show active" : ""}`}
                id="clothing"
                role="tabpanel"
              >
                <div className="product_container">
                  <div className="row product_column4">
                    {products.clothing.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${activeTab === "handbag" ? "show active" : ""}`}
                id="handbag"
                role="tabpanel"
              >
                <div className="product_container">
                  <div className="row product_column4">
                    {products.handbag.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${activeTab === "shoes" ? "show active" : ""}`}
                id="shoes"
                role="tabpanel"
              >
                <div className="product_container">
                  <div className="row product_column4">
                    {products.shoes.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane fade ${activeTab === "accessories" ? "show active" : ""}`}
                id="accessories"
                role="tabpanel"
              >
                <div className="product_container">
                  <div className="row product_column4">
                    {products.accessories.slice(0, 8).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="product_section womens_product bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section_title">
                <h2>Sản phẩm thịnh hành</h2>
                <p>Sản phẩm ấn tượng và bán chạy nhất</p>
              </div>
            </div>
          </div>
          <div className="product_area">
            <div className="row">
              <div
                className="product_carousel product_three_column4"
                style={{ position: "relative" }}
              >
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={30}
                  slidesPerView={4}
                  navigation={{
                    nextEl: ".trending-swiper-button-next",
                    prevEl: ".trending-swiper-button-prev",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                    },
                    576: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    992: {
                      slidesPerView: 4,
                    },
                  }}
                  className="trending-swiper"
                >
                  {products.trending.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="col-lg-3 col-md-4">
                        <div className="single_product">
                          <div className="product_thumb">
                            <a
                              className="primary_img"
                              href="product-details.html"
                            >
                              <img
                                src={`/assets/img/product/${product.img1}`}
                                alt=""
                              />
                            </a>
                            <a
                              className="secondary_img"
                              href="product-details.html"
                            >
                              <img
                                src={`/assets/img/product/${product.img2}`}
                                alt=""
                              />
                            </a>
                            <div className="quick_button">
                              <a href="#" title="quick_view">
                                Xem sản phẩm
                              </a>
                            </div>
                            {product.sale && (
                              <div className="product_sale">
                                <span>{product.sale}</span>
                              </div>
                            )}
                          </div>
                          <div className="product_content">
                            <h3>
                              <a href="product-details.html">{product.name}</a>
                            </h3>
                            <span className="current_price">
                              {product.price}
                            </span>
                            {product.oldPrice && (
                              <span className="old_price">
                                {product.oldPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="trending-swiper-button-next">
                  <i className="fa fa-angle-right"></i>
                </div>
                <div className="trending-swiper-button-prev">
                  <i className="fa fa-angle-left"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSection;
