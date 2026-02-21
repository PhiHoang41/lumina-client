import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Product } from "../../types/product";
import SwiperProductCard from "../../components/SwiperProductCard";

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  return (
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
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <SwiperProductCard product={product} />
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
  );
};

export default TrendingProducts;
