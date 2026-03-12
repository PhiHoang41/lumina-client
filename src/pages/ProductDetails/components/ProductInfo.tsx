import { useState, useMemo, type FormEvent } from "react";
import type { ProductDetails } from "../types/productDetails.types";
import styles from "./ProductInfo.module.css";
import { formatVND } from "../../../utils/currency";

interface ProductInfoProps {
  product: ProductDetails;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const actualColors = product.colors.filter((c) => c !== "Choose an option");
  const actualSizes = product.sizes.filter((s) => s !== "Size");

  const isSizeAvailable = (size: string) => {
    if (!selectedColor) return true;
    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === size
    );
    if (variant) {
      return variant.stock > 0 && variant.isActive;
    }
    return false;
  };

  const isColorAvailable = (color: string) => {
    if (!selectedSize) return true;
    const variant = product.variants.find(
      (v) => v.color === color && v.size === selectedSize
    );
    if (variant) {
      return variant.stock > 0 && variant.isActive;
    }
    return false;
  };

  const handleColorClick = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor("");
    } else {
      setSelectedColor(color);
    }
  };

  const handleSizeClick = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const currentStock = useMemo(() => {
    if (!selectedColor || !selectedSize) return null;
    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );
    return variant || null;
  }, [selectedColor, selectedSize, product.variants]);

  const selectedVariant = useMemo(() => {
    if (!selectedColor || !selectedSize) {
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

  const canAddToCart = useMemo(() => {
    if (!selectedVariant) return false;
    return selectedVariant.stock > 0 && selectedVariant.isActive;
  }, [selectedVariant]);

  const handleAddToCart = (e: FormEvent) => {
    e.preventDefault();
    if (!canAddToCart || !selectedVariant) return;

    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (quantity > selectedVariant.stock) {
      alert(`Only ${selectedVariant.stock} items available in stock`);
      return;
    }

    alert(`Added ${quantity} item(s) to cart`);
  };

  return (
    <div className="product_d_right">
      <form onSubmit={handleAddToCart}>
        <h1>{product.name}</h1>

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

        <div className="product_price">
          <span className="current_price">{displayPrice}</span>
        </div>

        <div className="product_desc">
          <p>{product.description}</p>
        </div>

        <div className="product_variant color">
          <h3>color</h3>
          <div className={styles.variantOptions}>
            {actualColors.map((color) => {
              const isAvailable = isColorAvailable(color);
              const isSelected = selectedColor === color;
              const colorCode = product.colorCodes[color] || color.toLowerCase();
              return (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorButton} ${isSelected ? styles.selected : ""} ${!isAvailable ? styles.disabled : ""}`}
                  onClick={() => handleColorClick(color)}
                  disabled={!isAvailable}
                  title={!isAvailable ? "Không có sẵn" : color}
                >
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: colorCode }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="product_variant size">
          <h3>size</h3>
          <div className={styles.variantOptions}>
            {actualSizes.map((size) => {
              const isAvailable = isSizeAvailable(size);
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  className={`${styles.sizeButton} ${isSelected ? styles.selected : ""} ${!isAvailable ? styles.disabled : ""}`}
                  onClick={() => handleSizeClick(size)}
                  disabled={!isAvailable}
                  title={!isAvailable ? "Không có sẵn" : size}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {selectedVariant && (
          <div className={styles.stockInfo}>
            {selectedVariant.stock > 0 ? (
              <span className={styles.inStock}>
                ✓ Còn hàng ({selectedVariant.stock} sản phẩm)
              </span>
            ) : (
              <span className={styles.outOfStock}>
                ✗ Hết hàng
              </span>
            )}
          </div>
        )}

        <div className="product_variant quantity">
          <label>quantity</label>
          <input
            min="1"
            max={currentStock?.stock || 100}
            value={quantity}
            type="number"
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              const max = currentStock?.stock || 100;
              setQuantity(Math.min(Math.max(1, val), max));
            }}
          />
          <button
            className={`button ${!canAddToCart ? styles.disabledButton : ""}`}
            type="submit"
            disabled={!canAddToCart}
          >
            add to cart
          </button>
        </div>

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
