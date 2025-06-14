
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/services/hooks/useCart";
import { allDemoProducts } from "@/data/demoProducts";
import { formatCurrency } from "@/utils/currency";

const ProductGrid = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image
    }, 1);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">All Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive collection of quality products from verified sellers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allDemoProducts.slice(0, 24).map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </Link>
              <CardContent className="p-3">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-medium text-sm mb-1 hover:text-market-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-2">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-xs text-gray-600">{product.rating?.average || 0}</span>
                  <span className="text-xs text-gray-400 ml-1">({product.rating?.count || 0})</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <Link to={`/vendor/${product.seller?.id}`} className="text-market-600 hover:underline truncate">
                    {product.seller?.businessName || 'Unknown Seller'}
                  </Link>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-bold">{formatCurrency(product.price.current)}</span>
                  {product.price.compareAt && (
                    <span className="text-xs text-gray-500 line-through ml-2">
                      {formatCurrency(product.price.compareAt)}
                    </span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="w-full h-7 text-xs bg-market-600 hover:bg-market-700"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" variant="outline" className="px-8">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
