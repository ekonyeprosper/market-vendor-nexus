
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Zap, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/services/hooks/useCart";
import { useGetPopularProductsQuery } from "@/services/api/productsApi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/utils/currency";

const DailyDeals = () => {
  const { data, isLoading, error } = useGetPopularProductsQuery({ limit: 4 });
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current * 0.8, // 20% discount for deals
      image: product.image
    }, 1);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="bg-white rounded-xl overflow-hidden shadow">
                <Skeleton className="h-60 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-9 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-1" /> Limited Time
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Daily Deals</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            Incredible savings for today only. Don't miss out on these amazing offers!
          </p>
          <div className="flex justify-center items-center space-x-4 bg-white rounded-lg p-4 shadow-sm max-w-md mx-auto">
            <Timer className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium">Ends in:</span>
            <div className="flex space-x-2">
              <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-red-600 font-bold">:</span>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-red-600 font-bold">:</span>
              <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.products.slice(0, 4).map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group border-2 border-red-100"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="destructive" className="absolute top-3 left-3 bg-red-600">
                    20% OFF
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
                    <span className="text-lg font-bold text-red-600">{formatCurrency(product.price.current * 0.8)}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatCurrency(product.price.current)}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full w-9 h-9 p-0 bg-red-600 hover:bg-red-700"
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

export default DailyDeals;
