import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface SearchFormProps {
  placeholder?: string;
  showCategorySelect?: boolean;
  className?: string;
}

const SearchForm = ({
  placeholder = "Search entire store here...",
  showCategorySelect = true,
  className = "",
}: SearchFormProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchParam = searchParams.get("search");

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchParam) {
      setSearchTerm("");
    }
  }, [searchParam]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} action="#">
      {showCategorySelect && (
        <select className="select_option" name="select" id="categori">
          <option value="all">All Categories</option>
        </select>
      )}
      <input
        placeholder={placeholder}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <i className="ion-ios-search-strong"></i>
      </button>
    </form>
  );
};

export default SearchForm;
