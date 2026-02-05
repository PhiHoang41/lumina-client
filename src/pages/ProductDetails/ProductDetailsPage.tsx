import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import { mockProductDetails, relatedProducts } from "./data/mockProductDetails";

const ProductDetailsPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = useParams<{ slug: string }>();

  // In a real app, you would fetch product by slug
  // For now, we'll use the mock data
  const product = mockProductDetails;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: "product details" },
  ];

  if (!product) {
    return (
      <div className="container">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      {/* Product Details Section */}
      <div className="product_details">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>
            <div className="col-lg-7 col-md-7">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs product={product} />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailsPage;
