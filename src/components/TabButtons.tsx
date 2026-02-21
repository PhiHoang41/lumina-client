import type { Category } from "../services/categoryService";

interface TabButtonsProps {
  categories: Category[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabButtons = ({ categories, activeTab, onTabChange }: TabButtonsProps) => {
  return (
    <div className="col-12">
      <div className="product_tab_button">
        <ul className="nav" role="tablist">
          {categories.map((category) => (
            <li key={category._id}>
              <a
                className={activeTab === category.slug ? "active" : ""}
                data-toggle="tab"
                href={`#${category.slug}`}
                role="tab"
                aria-controls={category.slug}
                aria-selected={activeTab === category.slug}
                onClick={(e) => {
                  e.preventDefault();
                  onTabChange(category.slug);
                }}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabButtons;
