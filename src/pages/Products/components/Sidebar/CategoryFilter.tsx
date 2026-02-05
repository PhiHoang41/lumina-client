import type { CategoryOption } from "../../types/product.types";

interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategories: string[];
  onToggle: (categoryId: string) => void;
}

const CategoryFilter = ({
  categories,
  selectedCategories,
  onToggle,
}: CategoryFilterProps) => {
  return (
    <div className="widget_list widget_categories">
      <h2>Product categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onToggle(category.id);
              }}
              style={{
                fontWeight: selectedCategories.includes(category.id)
                  ? "bold"
                  : "normal",
                color: selectedCategories.includes(category.id)
                  ? "#ff4136"
                  : "inherit",
              }}
            >
              {category.name} <span>{category.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
