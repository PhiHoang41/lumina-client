import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={`product-details-tab ${styles.productGallery}`}>
      {/* Main Image */}
      <div className="zoomWrapper single-zoom">
        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          navigation={false}
          className="single-product-main"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${productName} - ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Swiper */}
      <div className="single-zoom-thumb">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          navigation={true}
          className="s-tab-zoom owl-carousel single-product-active"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                style={{
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
