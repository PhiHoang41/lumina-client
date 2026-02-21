import { useMemo } from "react";
import ProductCard from "../../../components/ProductCard";
import type { Product } from "../../../services/productService";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const mappedProducts = useMemo(() => {
    return products
      .map((product) => {
        const variants = product.variants || [];
        const activeVariants = variants.filter(
          (v) => v.isActive && v.stock > 0,
        );
        const minPrice =
          activeVariants.length > 0
            ? Math.min(...activeVariants.map((v) => v.price))
            : variants.length > 0
              ? Math.min(...variants.map((v) => v.price))
              : 0;

        return {
          id: parseInt(product._id),
          name: product.name,
          slug: product.slug,
          price: minPrice,
          image: product.images?.[0] || "",
          description: product.description,
        };
      })
      .filter((p) => p.image);
  }, [products]);

  if (mappedProducts.length === 0) {
    return null;
  }

  return (
    <section className="product_section related_product">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_title">
              <h2>Related Products</h2>
              <p>
                Contemporary, minimal and modern designs embody the Lavish Alice
                handwriting
              </p>
            </div>
          </div>
        </div>
        <div className="product_area">
          <div className="row">
            {mappedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid-4"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
