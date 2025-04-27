import ProductListing from "@/components/product/product-listing";

export const metadata = {
  title: "Products - Tech Empire",
  description: "Browse our wide selection of electronics.",
};

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-primary">All Products</h1>
      <ProductListing />
    </div>
  );
}
