
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/services/hooks/useCart";
import { allDemoProducts } from "@/data/demoProducts";
import { formatCurrency } from "@/utils/currency";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TrendingProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image
    }, 1);
  };

  // Get trending products (products with high views)
  const trendingProducts = allDemoProducts
    .filter(product => product.stats.views > 5000)
    .slice(0, 10);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-market-100 text-market-800 text-sm font-medium mb-4">
              What's Hot
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Trending Products</h2>
            <p className="text-gray-600 max-w-lg">
              See what's trending now and be the first to get the most popular items
            </p>
          </div>
          <Link to="/products" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Trending
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

        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-6 p-1">
            {trendingProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow group w-72 flex-none"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {product.badge && (
                      <Badge variant="default" className="absolute top-3 left-3 bg-market-600">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/products?category=${product.category?.id}`} className="text-xs text-market-600 hover:underline">
                      {product.category?.name || 'General'}
                    </Link>
                    <div className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-xs font-medium">{product.rating?.average?.toFixed(1) || '0.0'}</span>
                    </div>
                  </div>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-market-600 transition-colors line-clamp-2">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default TrendingProducts;
