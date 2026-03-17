import { useState, useMemo, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ProductDetails } from "../types/productDetails.types";
import styles from "./ProductInfo.module.css";
import { formatVND } from "../../../utils/currency";
import { isAuthenticated } from "../../../utils/token";
import cartService from "../../../services/cartService";
import { queryClient } from "../../../main";

interface ProductInfoProps {
  product: ProductDetails;
  productId: string;
}

const ProductInfo = ({ product, productId }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

  const addToCartMutation = useMutation({
    mutationFn: (payload: {
      productId: string;
      variantId: string;
      quantity: number;
    }) => cartService.addToCart(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Đã thêm vào giỏ hàng!");
        queryClient.invalidateQueries({ queryKey: ["cartCount"] });
        setQuantity(1);
        setSelectedColor("");
        setSelectedSize("");
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Thêm vào giỏ hàng thất bại",
      );
    },
  });

  const actualColors = product.colors.filter((c) => c !== "Chọn một tùy chọn");
  const actualSizes = product.sizes.filter((s) => s !== "Kích thước");

  const isSizeAvailable = (size: string) => {
    if (!selectedColor) return true;
    const variant = product.variants.find(
      (v) => v.color === selectedColor && v.size === size,
    );
    if (variant) {
      return variant.stock > 0 && variant.isActive;
    }
    return false;
  };

  const isColorAvailable = (color: string) => {
    if (!selectedSize) return true;
    const variant = product.variants.find(
      (v) => v.color === color && v.size === selectedSize,
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
      (v) => v.color === selectedColor && v.size === selectedSize,
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

    if (!isAuthenticated()) {
      toast.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }

    if (!quantity || quantity <= 0) {
      toast.error("Số lượng không hợp lệ");
      return;
    }

    if (quantity > selectedVariant.stock) {
      toast.error(`Chỉ còn ${selectedVariant.stock} sản phẩm trong kho`);
      return;
    }

    addToCartMutation.mutate({
      productId,
      variantId: selectedVariant._id,
      quantity,
    });
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
              <a href="#"> {product.reviewCount} đánh giá </a>
            </li>
            <li className="review">
              <a href="#"> Viết đánh giá </a>
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
          <h3>Màu sắc</h3>
          <div className={styles.variantOptions}>
            {actualColors.map((color) => {
              const isAvailable = isColorAvailable(color);
              const isSelected = selectedColor === color;
              const colorCode =
                product.colorCodes[color] || color.toLowerCase();
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
          <h3>Kích thước</h3>
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
              <span className={styles.outOfStock}>✗ Hết hàng</span>
            )}
          </div>
        )}

        <div className="product_variant quantity">
          <label>Số lượng</label>
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
Thêm vào giỏ
          </button>
        </div>

        <div className="product_d_action">
          <ul>
            <li>
              <a href="#" title="Thêm vào wishlist">
                <i className="fa fa-heart-o" aria-hidden="true"></i> Thêm vào
                danh sách yêu thích
              </a>
            </li>
            <li>
              <a href="#" title="So sánh">
                <i className="fa fa-sliders" aria-hidden="true"></i> So sánh sản
                phẩm
              </a>
            </li>
          </ul>
        </div>
      </form>

      <div className="priduct_social">
        <h3>Chia sẻ:</h3>
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
