import { Link } from "react-router-dom";
import type { CartItem as CartItemType } from "../types/cart.types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onQuantityChange, onRemove }: CartItemProps) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <tr>
      <td className="product_remove">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onRemove(item.id);
          }}
        >
          <i className="fa fa-trash-o"></i>
        </a>
      </td>
      <td className="product_thumb">
        <Link to={`/products/${item.slug}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </td>
      <td className="product_name">
        <Link to={`/products/${item.slug}`}>{item.name}</Link>
      </td>
      <td className="product-price">£{item.price.toFixed(2)}</td>
      <td className="product_quantity">
        <input
          min="1"
          max="100"
          value={item.quantity}
          type="number"
          onChange={handleQuantityChange}
        />
      </td>
      <td className="product_total">£{itemTotal.toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
