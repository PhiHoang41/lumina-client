import type { SizeOption } from "../../types/product.types";

interface SizeFilterProps {
  sizes: SizeOption[];
  selectedSizes: string[];
  onToggle: (sizeId: string) => void;
}

const SizeFilter = ({
  sizes,
  selectedSizes,
  onToggle,
}: SizeFilterProps) => {
  return (
    <div className="widget_list widget_categories">
      <h2>Select By Size</h2>
      <ul>
        {sizes.map((size) => (
          <li key={size.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onToggle(size.id);
              }}
              style={{
                fontWeight: selectedSizes.includes(size.id)
                  ? "bold"
                  : "normal",
                color: selectedSizes.includes(size.id)
                  ? "#ff4136"
                  : "inherit",
              }}
            >
              {size.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeFilter;
