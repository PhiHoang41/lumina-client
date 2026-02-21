import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductDetails } from "../../hooks/useProductDetails";
import Breadcrumb from "../../components/Breadcrumb";
import type { BreadcrumbItem } from "../../components/Breadcrumb";
import type { ProductDetails } from "./types/productDetails.types";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";

const ProductDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product: apiProduct, relatedProducts, isLoading, isError } =
    useProductDetails(slug || "");

  const product = useMemo((): ProductDetails | null => {
    if (!apiProduct) return null;

    const variants = apiProduct.variants || [];
    const uniqueColors = Array.from(
      new Set(variants.map((v) => v.color.name)),
    ).filter(Boolean);
    const uniqueSizes = Array.from(
      new Set(variants.map((v) => v.size)),
    ).filter(Boolean);

    const activeVariants = variants.filter((v) => v.isActive && v.stock > 0);
    const prices = activeVariants.length > 0
      ? activeVariants.map((v) => v.price)
      : variants.map((v) => v.price);

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : minPrice;

    // Combine product images with variant images (unique only)
    const allImages = [...(apiProduct.images || [])];
    variants.forEach((v) => {
      if (v.images) {
        v.images.forEach((img) => {
          if (!allImages.includes(img)) {
            allImages.push(img);
          }
        });
      }
    });

    return {
      id: parseInt(apiProduct._id),
      name: apiProduct.name,
      slug: apiProduct.slug,
      minPrice,
      maxPrice,
      variants: variants.map((v) => ({
        _id: v._id,
        size: v.size,
        color: v.color.name,
        price: v.price,
        stock: v.stock,
        images: v.images || [],
        isActive: v.isActive,
      })),
      rating: 5,
      reviewCount: 1,
      description: apiProduct.description || "",
      images: allImages,
      colors: ["Choose an option", ...uniqueColors],
      sizes: ["Size", ...uniqueSizes],
      specifications: [
        { key: "Compositions", value: "Polyester" },
        { key: "Styles", value: "Girly" },
        { key: "Properties", value: "Short Dress" },
      ],
      moreInfo: "Fashion has been creating well-designed collections since 2010.",
      reviews: [
        {
          author: "Posthemes",
          rating: 5,
          date: "09/07/2018",
          comment: "That's OK!",
        },
      ],
    };
  }, [apiProduct]);

  if (isLoading) {
    return (
      <div
        className="container"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div
        className="container"
        style={{ padding: "100px 0", textAlign: "center" }}
      >
        <p>Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "home", path: "/" },
    { label: product.name.toLowerCase() },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="product_details">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <ProductGallery images={product.images} productName={product.name} />
            </div>
            <div className="col-lg-7 col-md-7">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
};

export default ProductDetailsPage;
