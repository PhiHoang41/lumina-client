import type { CartItem as CartItemType } from "../types/cart.types";
import CartItem from "./CartItem";

interface CartTableProps {
  items: CartItemType[];
  onQuantityChange: (item: CartItemType, quantity: number) => void;
  onRemove: (item: CartItemType) => void;
}

const CartTable = ({
  items,
  onQuantityChange,
  onRemove,
}: CartTableProps) => {
  if (items.length === 0) {
    return (
      <div className="table_desc">
        <div className="cart_page">
          <p style={{ textAlign: "center", padding: "40px 0" }}>
            Giỏ hàng của bạn đang trống.
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
              <th className="product_remove">Xóa</th>
              <th className="product_thumb">Hình ảnh</th>
              <th className="product_name">Sản phẩm</th>
              <th className="product-price">Giá</th>
              <th className="product_quantity">Số lượng</th>
              <th className="product_total">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem
                key={`${item.product._id}-${item.variant._id}`}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartTable;
