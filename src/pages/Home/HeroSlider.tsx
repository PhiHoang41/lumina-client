import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import styles from "./HeroSlider.module.css";

const HeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      background: "/assets/img/slider/slider4.jpg",
      image: "/assets/img/slider/content3.png",
      description:
        "the wooboom clothing summer collection is back at half price",
      buttonText: "Discover Now",
    },
    {
      id: 2,
      background: "/assets/img/slider/slider5.jpg",
      image: "/assets/img/slider/content4.png",
      description:
        "the wooboom clothing summer collection is back at half price",
      buttonText: "Discover Now",
    },
    {
      id: 3,
      background: "/assets/img/slider/slider6.jpg",
      image: "/assets/img/slider/content5.png",
      description:
        "the wooboom clothing summer collection is back at half price",
      buttonText: "Discover Now",
    },
  ];

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  const handleBulletClick = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={800}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className={styles.heroSwiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={styles.slide}
              style={{
                backgroundImage: `url(${slide.background})`,
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-12">
                    <div className={styles.slideContent}>
                      <img src={slide.image} alt="" />
                      <p>{slide.description}</p>
                      <a href="/shop">{slide.buttonText}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        className={`${styles.navigationButton} ${styles.prevButton}`}
        onClick={handlePrevClick}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        className={`${styles.navigationButton} ${styles.nextButton}`}
        onClick={handleNextClick}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>

      {/* Pagination Bullets */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationBullet} ${
              activeIndex === index ? styles.paginationBulletActive : ""
            }`}
            onClick={() => handleBulletClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
