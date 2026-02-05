import Header from "../../components/Home/Header";
import HeroSlider from "../../components/Home/HeroSlider";
import BannerSection from "../../components/Home/BannerSection";
import ProductSection from "../../components/Home/ProductSection";
import BlogSection from "../../components/Home/BlogSection";
import Footer from "../../components/Home/Footer";

const HomePage = () => {
  return (
    <>
      {/* Main Wrapper */}
      <Header />
      <HeroSlider />
      <BannerSection />
      <ProductSection />
      <BlogSection />
      <Footer />
    </>
  );
};

export default HomePage;
