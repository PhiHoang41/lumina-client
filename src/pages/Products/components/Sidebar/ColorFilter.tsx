import type { ColorOption } from "../../types/product.types";

interface ColorFilterProps {
  colors: ColorOption[];
  selectedColors: string[];
  onToggle: (colorId: string) => void;
}

const ColorFilter = ({
  colors,
  selectedColors,
  onToggle,
}: ColorFilterProps) => {
  return (
    <div className="widget_list widget_categories">
      <h2>Select By Color</h2>
      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onToggle(color.id);
              }}
              style={{
                fontWeight: selectedColors.includes(color.id)
                  ? "bold"
                  : "normal",
                color: selectedColors.includes(color.id)
                  ? "#ff4136"
                  : "inherit",
              }}
            >
              {color.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
