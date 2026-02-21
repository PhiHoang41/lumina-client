import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatVND } from "../utils/currency";
import styles from "./ProductCard.module.css";

export type ViewMode = "grid-3" | "grid-4" | "grid-5" | "list";

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
}

const ProductCard = ({ product, viewMode = "grid-4" }: ProductCardProps) => {
  const colClass =
    viewMode === "grid-3"
      ? "4"
      : viewMode === "grid-4"
        ? "3"
        : viewMode === "grid-5"
          ? "2-4"
          : "12";

  return (
    <div className={`col-lg-${colClass} col-md-4 col-12`}>
      <div className={`single_product ${styles.singleProduct}`}>
        <div className={styles.productThumb}>
          <Link className={styles.primaryImg} to={`/products/${product.slug}`}>
            <img src={product.image} alt={product.name} />
          </Link>

          <div className="quick_button">
            <Link to={`/products/${product.slug}`} title="quick_view">
              Xem sản phẩm
            </Link>
          </div>
        </div>

        {/* Grid Content */}
        <div className="product_content grid_content">
          <h3>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <span className="current_price">{formatVND(product.price)}</span>
        </div>

        {/* List Content */}
        <div className="product_content list_content">
          <h3>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <div className="product_ratting">
            <ul>
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <a href="#">
                    <i className="fa fa-star"></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="product_price">
            <span className="current_price">{formatVND(product.price)}</span>
          </div>
          {product.description && (
            <div className="product_desc">
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
