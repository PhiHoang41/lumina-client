import { useState, useMemo } from "react";
import type { ProductDetails } from "../types/productDetails.types";
import styles from "./ProductInfo.module.css";
import { formatVND } from "../../../utils/currency";

interface ProductInfoProps {
  product: ProductDetails;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const selectedVariant = useMemo(() => {
    if (selectedColor === "Choose an option" || selectedSize === "Size") {
      return null;
    }
    return (
      product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize,
      ) || null
    );
  }, [selectedColor, selectedSize, product.variants]);

  const displayPrice = useMemo(() => {
    if (selectedVariant) {
      return formatVND(selectedVariant.price);
    }
    if (product.minPrice !== product.maxPrice) {
      return `${formatVND(product.minPrice)} - ${formatVND(product.maxPrice)}`;
    }
    return formatVND(product.minPrice);
  }, [selectedVariant, product.minPrice, product.maxPrice]);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Added ${quantity} item(s) to cart`);
  };

  return (
    <div className="product_d_right">
      <form onSubmit={handleAddToCart}>
        <h1>{product.name}</h1>

        {/* Rating */}
        <div className="product_ratting">
          <ul>
            {[...Array(5)].map((_, index) => (
              <li key={index}>
                <a href="#">
                  <i
                    className={`fa fa-star${index < product.rating ? "" : "-o"}`}
                  ></i>
                </a>
              </li>
            ))}
            <li className="review">
              <a href="#"> {product.reviewCount} review </a>
            </li>
            <li className="review">
              <a href="#"> Write a review </a>
            </li>
          </ul>
        </div>

        {/* Price */}
        <div className="product_price">
          <span className="current_price">{displayPrice}</span>
        </div>

        {/* Description */}
        <div className="product_desc">
          <p>{product.description}</p>
        </div>

        {/* Color Variant */}
        <div className="product_variant color">
          <h3>color</h3>
          <select
            className={styles.customSelect}
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            {product.colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Size Variant */}
        <div className="product_variant size">
          <h3>size</h3>
          <select
            className={styles.customSelect}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="product_variant quantity">
          <label>quantity</label>
          <input
            min="1"
            max="100"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
          <button className="button" type="submit">
            add to cart
          </button>
        </div>

        {/* Wishlist & Compare */}
        <div className="product_d_action">
          <ul>
            <li>
              <a href="#" title="Add to wishlist">
                <i className="fa fa-heart-o" aria-hidden="true"></i> Add to Wish
                List
              </a>
            </li>
            <li>
              <a href="#" title="Add to Compare">
                <i className="fa fa-sliders" aria-hidden="true"></i> Compare
                this Product
              </a>
            </li>
          </ul>
        </div>
      </form>

      {/* Social Share */}
      <div className="priduct_social">
        <h3>Share on:</h3>
        <ul>
          <li>
            <a href="#">
              <i className="fa fa-rss"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-vimeo"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-tumblr"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-pinterest"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
