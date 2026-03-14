import { useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../types/cart.types";
import { formatVND } from "../../../utils/currency";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (item: CartItemType, quantity: number) => void;
  onRemove: (item: CartItemType) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  const quantity = item.quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const newQuantity = parseInt(inputValue);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity !== quantity) {
      onQuantityChange(item, newQuantity);
    } else {
      setInputValue(quantity.toString());
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setInputValue(newQuantity.toString());
    onQuantityChange(item, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setInputValue(newQuantity.toString());
      onQuantityChange(item, newQuantity);
    }
  };

  const itemTotal = item.price * quantity;
  const productImage = item.product.images?.[0] || "/assets/img/product/product.jpg";
  const productSlug = item.product.slug || "";
  const displayPrice = formatVND(item.price);
  const displayTotal = formatVND(itemTotal);

  return (
    <tr>
      <td className="product_remove">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onRemove(item);
          }}
        >
          <i className="fa fa-trash-o"></i>
        </a>
      </td>
      <td className="product_thumb">
        <Link to={`/products/${productSlug}`}>
          <img src={productImage} alt={item.product.name} />
        </Link>
      </td>
      <td className="product_name">
        <Link to={`/products/${productSlug}`}>{item.product.name}</Link>
        {item.variant.size && (
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Size: {item.variant.size}
          </p>
        )}
        {item.variant.color && (
          <p style={{ fontSize: "12px", color: "#666" }}>
            Color: {item.variant.color.name}
          </p>
        )}
      </td>
      <td className="product-price">{displayPrice}</td>
      <td className="product_quantity">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            onClick={handleDecrement}
            style={{
              padding: "4px 10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: quantity > 1 ? "pointer" : "not-allowed",
            }}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            min="1"
            max={item.variant.stock ?? 100}
            value={inputValue}
            type="number"
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            style={{ width: "50px", textAlign: "center" }}
          />
          <button
            type="button"
            onClick={handleIncrement}
            style={{
              padding: "4px 10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </td>
      <td className="product_total">{displayTotal}</td>
    </tr>
  );
};

export default CartItem;
