
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Layout from "@/components/layout/Layout";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg"></div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Product Name</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">$99.99</span>
              <span className="text-gray-500 line-through">$129.99</span>
            </div>
            <p className="text-gray-600">
              Detailed product description will go here. This is a placeholder text
              to show how the layout will look with actual content.
            </p>
            <Button size="lg" className="w-full md:w-auto">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
