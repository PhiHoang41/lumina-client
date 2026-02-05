import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onFilter: () => void;
}

const PriceFilter = ({
  min,
  max,
  value,
  onChange,
  onFilter,
}: PriceFilterProps) => {
  return (
    <div className="widget_list widget_filter">
      <h2>Filter by price</h2>
      <form
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          onFilter();
        }}
      >
        <div style={{ padding: "20px 10px" }}>
          <Slider
            range
            min={min}
            max={max}
            value={value}
            onChange={(val) => {
              if (Array.isArray(val)) {
                onChange(val as [number, number]);
              }
            }}
            styles={{
              track: { backgroundColor: "#ff4136" },
              handle: {
                borderColor: "#ff4136",
                backgroundColor: "#ff4136",
              },
            }}
          />
        </div>
        <button type="submit">Filter</button>
        <input
          type="text"
          name="text"
          id="amount"
          value={`£${value[0]} - £${value[1]}`}
          readOnly
        />
      </form>
    </div>
  );
};

export default PriceFilter;
