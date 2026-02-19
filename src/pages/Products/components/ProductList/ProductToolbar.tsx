interface ProductToolbarProps {
  totalProducts: number;
  currentStart: number;
  currentEnd: number;
}

const ProductToolbar = ({
  totalProducts,
  currentStart,
  currentEnd,
}: ProductToolbarProps) => {
  return (
    <div className="shop_toolbar_wrapper">
      <div className="page_amount">
        <p>
          Showing {currentStart}–{currentEnd} of {totalProducts} results
        </p>
      </div>
    </div>
  );
};

export default ProductToolbar;
