import type { CartItem as CartItemType } from "../types/cart.types";
import CartItem from "./CartItem";

interface CartTableProps {
  items: CartItemType[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onUpdateCart: () => void;
}

const CartTable = ({
  items,
  onQuantityChange,
  onRemove,
  onUpdateCart,
}: CartTableProps) => {
  if (items.length === 0) {
    return (
      <div className="table_desc">
        <div className="cart_page">
          <p style={{ textAlign: "center", padding: "40px 0" }}>
            Your cart is empty.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table_desc">
      <div className="cart_page table-responsive">
        <table>
          <thead>
            <tr>
              <th className="product_remove">Delete</th>
              <th className="product_thumb">Image</th>
              <th className="product_name">Product</th>
              <th className="product-price">Price</th>
              <th className="product_quantity">Quantity</th>
              <th className="product_total">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart_submit">
        <button type="submit" onClick={onUpdateCart}>
          update cart
        </button>
      </div>
    </div>
  );
};

export default CartTable;
