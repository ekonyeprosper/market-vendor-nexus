
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/services/hooks/useCart";
import { allDemoProducts } from "@/data/demoProducts";
import { formatCurrency } from "@/utils/currency";

const NewArrivals = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image
    }, 1);
  };

  // Get newest products (last 6)
  const newProducts = allDemoProducts.slice(-6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
              <Clock className="h-4 w-4 mr-1" /> Just Arrived
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-600 max-w-lg">
              Fresh products just added to our marketplace. Be the first to discover amazing finds!
            </p>
          </div>
          <Link to="/products?sort=newest" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All New Products
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-green-600 text-white">
                    NEW
                  </Badge>
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/products?category=${product.category?.id}`} className="text-xs text-market-600 hover:underline">
                    {product.category?.name || 'General'}
                  </Link>
                  <div className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{product.rating?.average || 0}</span>
                  </div>
                </div>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-market-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>by</span>
                  <Link to={`/vendor/${product.seller?.id}`} className="text-market-600 ml-1 hover:underline">
                    {product.seller?.businessName || 'Unknown Seller'}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">{formatCurrency(product.price.current)}</span>
                    {product.price.compareAt && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatCurrency(product.price.compareAt)}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full w-9 h-9 p-0 bg-market-600 hover:bg-market-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
