interface ProductToolbarProps {
  totalProducts: number;
  currentStart: number;
  currentEnd: number;
  searchQuery?: string;
  onClearSearch?: () => void;
}

const ProductToolbar = ({
  totalProducts,
  currentStart,
  currentEnd,
  searchQuery,
  onClearSearch,
}: ProductToolbarProps) => {
  return (
    <div className="shop_toolbar_wrapper">
      <div className="page_amount">
        <p>
          Showing {currentStart}–{currentEnd} of {totalProducts} results
        </p>
      </div>
      {searchQuery && (
        <div className="search_results_info" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
            Kết quả tìm kiếm cho: <strong>"{searchQuery}"</strong>
          </p>
          {onClearSearch && (
            <button
              onClick={onClearSearch}
              className="clear_search_btn"
              style={{
                padding: '6px 16px',
                backgroundColor: '#f84b4b',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d63a3a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f84b4b'}
            >
              <i className="ion-android-close" style={{ fontSize: '16px' }}></i>
              Xóa tìm kiếm
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductToolbar;
