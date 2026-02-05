interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="shop_toolbar t_bottom">
      <div className="pagination">
        <ul>
          {currentPage > 1 && (
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                }}
              >
                &lt;&lt;
              </a>
            </li>
          )}

          {getPageNumbers().map((page, index) => (
            <li key={index} className={page === currentPage ? "current" : ""}>
              {typeof page === "number" ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </a>
              ) : (
                <span>{page}</span>
              )}
            </li>
          ))}

          {currentPage < totalPages && (
            <>
              <li className="next">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(currentPage + 1);
                  }}
                >
                  next
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(totalPages);
                  }}
                >
                  &gt;&gt;
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
