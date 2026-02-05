import type { ViewMode, SortOption } from "../../types/product.types";

interface ProductToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  totalProducts: number;
  currentStart: number;
  currentEnd: number;
}

const ProductToolbar = ({
  viewMode,
  onViewModeChange,
  sortOption,
  onSortChange,
  totalProducts,
  currentStart,
  currentEnd,
}: ProductToolbarProps) => {
  return (
    <div className="shop_toolbar_wrapper">
      {/* <div className="shop_toolbar_btn">
        <button
          data-role="grid_3"
          type="button"
          className={`btn-grid-3 ${viewMode === "grid-3" ? "active" : ""}`}
          data-toggle="tooltip"
          title="3"
          onClick={() => onViewModeChange("grid-3")}
        ></button>

        <button
          data-role="grid_4"
          type="button"
          className={`btn-grid-4 ${viewMode === "grid-4" ? "active" : ""}`}
          data-toggle="tooltip"
          title="4"
          onClick={() => onViewModeChange("grid-4")}
        ></button>

        <button
          data-role="grid_5"
          type="button"
          className={`btn-grid-5 ${viewMode === "grid-5" ? "active" : ""}`}
          data-toggle="tooltip"
          title="5"
          onClick={() => onViewModeChange("grid-5")}
        ></button>

        <button
          data-role="grid_list"
          type="button"
          className={`btn-list ${viewMode === "list" ? "active" : ""}`}
          data-toggle="tooltip"
          title="List"
          onClick={() => onViewModeChange("list")}
        ></button>
      </div>
      <div className="niceselect_option">
        <form className="select_option" action="#">
          <select
            name="orderby"
            id="short"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <option value="rating">Sort by average rating</option>
            <option value="popularity">Sort by popularity</option>
            <option value="newness">Sort by newness</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
            <option value="name">Product Name: A-Z</option>
          </select>
        </form>
      </div> */}
      <div className="page_amount">
        <p>
          Showing {currentStart}–{currentEnd} of {totalProducts} results
        </p>
      </div>
    </div>
  );
};

export default ProductToolbar;
