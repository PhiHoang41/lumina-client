import { Link } from "react-router-dom";
import type { RelatedProduct } from "../types/productDetails.types";

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <section className="product_section related_product">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_title">
              <h2>Related Products</h2>
              <p>
                Contemporary, minimal and modern designs embody the Lavish Alice
                handwriting
              </p>
            </div>
          </div>
        </div>
        <div className="product_area">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single_product">
                  <div className="product_thumb">
                    <Link
                      className="primary_img"
                      to={`/products/${product.slug}`}
                    >
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <Link
                      className="secondary_img"
                      to={`/products/${product.slug}`}
                    >
                      <img src={product.secondaryImage} alt={product.name} />
                    </Link>

                    {product.salePercent && (
                      <div className="product_sale">
                        <span>-{product.salePercent}%</span>
                      </div>
                    )}
                  </div>
                  <div className="product_content">
                    <h3>
                      <Link to={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <span className="current_price">
                      £{product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                      <span className="old_price">
                        £{product.oldPrice.toFixed(2)}
                      </span>
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

export default RelatedProducts;
