import type { ManufacturerOption } from "../../types/product.types";

interface ManufacturerFilterProps {
  manufacturers: ManufacturerOption[];
  selectedManufacturers: string[];
  onToggle: (manufacturerId: string) => void;
}

const ManufacturerFilter = ({
  manufacturers,
  selectedManufacturers,
  onToggle,
}: ManufacturerFilterProps) => {
  return (
    <div className="widget_list widget_categories">
      <h2>Manufacturer</h2>
      <ul>
        {manufacturers.map((manufacturer) => (
          <li key={manufacturer.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onToggle(manufacturer.id);
              }}
              style={{
                fontWeight: selectedManufacturers.includes(manufacturer.id)
                  ? "bold"
                  : "normal",
                color: selectedManufacturers.includes(manufacturer.id)
                  ? "#ff4136"
                  : "inherit",
              }}
            >
              {manufacturer.name} <span>{manufacturer.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManufacturerFilter;
