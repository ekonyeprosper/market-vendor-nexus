
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/services/hooks/useCart";
import { useGetPopularProductsQuery } from "@/services/api/productsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/currency";

const BestDeals = () => {
  const { data, isLoading, error } = useGetPopularProductsQuery({ limit: 12 });
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current * 0.75, // 25% discount
      image: product.image
    }, 1);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
              <Card key={item} className="bg-white rounded-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data?.products?.length) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-4">
              <Zap className="h-4 w-4 mr-1" /> Best Deals
            </div>
            <h2 className="text-3xl font-bold mb-2">Unbeatable Prices</h2>
            <p className="text-gray-600 max-w-lg">
              Amazing deals on quality products - limited time offers you don't want to miss!
            </p>
          </div>
          <Link to="/products?sort=price" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              View All Deals
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.products.slice(0, 12).map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 group"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="destructive" className="absolute top-2 left-2 bg-orange-600 text-xs">
                    25% OFF
                  </Badge>
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
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-orange-600">{formatCurrency(product.price.current * 0.75)}</span>
                  <span className="text-xs text-gray-500 line-through">{formatCurrency(product.price.current)}</span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-2 h-7 text-xs bg-orange-600 hover:bg-orange-700"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
