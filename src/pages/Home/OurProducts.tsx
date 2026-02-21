import { useState, useEffect } from "react";
import { useHomeProducts } from "../../hooks/useHomeProducts";
import ProductCard from "../../components/ProductCard";
import TabButtons from "../../components/TabButtons";

const OurProducts = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const { categories, productsByCategory, isLoadingProducts } =
    useHomeProducts();

  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].slug);
    }
  }, [categories, activeTab]);

  return (
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
            <TabButtons
              categories={categories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="tab-content">
            {categories.map((category) => (
              <div
                key={category.slug}
                className={`tab-pane fade ${activeTab === category.slug ? "show active" : ""}`}
                id={category.slug}
                role="tabpanel"
              >
                <div className="product_container">
                  <div className="row product_column4">
                    {isLoadingProducts ? (
                      <p>Đang tải...</p>
                    ) : productsByCategory[category.slug]?.length > 0 ? (
                      productsByCategory[category.slug].map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))
                    ) : (
                      <p>Không có sản phẩm nào.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
