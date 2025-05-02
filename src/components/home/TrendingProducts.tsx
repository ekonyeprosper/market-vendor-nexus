
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/services/hooks/useCart";

const trendingProducts = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.8,
    tag: "Trending",
    vendor: "AudioTech"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.7,
    tag: "Best Seller",
    vendor: "SmartWear"
  },
  {
    id: 3,
    name: "Genuine Leather Wallet",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop",
    category: "Fashion",
    rating: 4.9,
    tag: "New",
    vendor: "LeatherCraft"
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600&auto=format&fit=crop",
    category: "Electronics",
    rating: 4.6,
    tag: "Hot",
    vendor: "AudioTech"
  }
];

const TrendingProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image
    }, 1);
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow group"
            >
              <Link to={`/products/${product.id}`}>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="default" className="absolute top-3 left-3 bg-market-600">
                    {product.tag}
                  </Badge>
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/categories/${product.category}`} className="text-xs text-market-600 hover:underline">
                    {product.category}
                  </Link>
                  <div className="flex items-center bg-gray-50 rounded-full px-2 py-1">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-market-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>by</span>
                  <Link to={`/vendor/${product.vendor}`} className="text-market-600 ml-1 hover:underline">
                    {product.vendor}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
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

export default TrendingProducts;
