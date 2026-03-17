// This component is deprecated. Please use the shared Breadcrumb from /src/components/Breadcrumb.tsx
// Keeping this for backward compatibility
import SharedBreadcrumb from "../../../components/Breadcrumb";

const Breadcrumb = () => {
  const items = [{ label: "Trang chủ", path: "/" }, { label: "Sản phẩm" }];

  return <SharedBreadcrumb items={items} />;
};

export default Breadcrumb;
