
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/services/hooks/useCart";
import { allDemoProducts } from "@/data/demoProducts";
import { formatCurrency } from "@/utils/currency";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CategoryShowcase = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image
    }, 1);
  };

  // Group products by category
  const phoneProducts = allDemoProducts.filter(p => p.category.name === "Phones & Accessories").slice(0, 8);
  const laptopProducts = allDemoProducts.filter(p => p.category.name === "Laptops & Computers").slice(0, 8);
  const fashionProducts = allDemoProducts.filter(p => p.category.name === "Fashion & Clothing").slice(0, 8);

  const renderProductGrid = (products: any[], title: string, bgColor: string) => {
    if (!products?.length) return null;

    return (
      <div className={`${bgColor} rounded-lg p-6`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <Link to="/products" className="text-market-600 hover:text-market-700 text-sm font-medium flex items-center">
            See All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-4 p-1">
            {products.map((product) => (
              <Card key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group w-48 flex-none">
                <Link to={`/products/${product.id}`}>
                  <div className="h-32 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <CardContent className="p-3">
                  <Link to={`/products/${product.id}`}>
                    <h4 className="font-medium text-sm mb-1 line-clamp-2 hover:text-market-600 transition-colors">
                      {product.name}
                    </h4>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold">{formatCurrency(product.price.current)}</span>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs text-gray-600">{product.rating?.average || 0}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="rounded-full w-7 h-7 p-0 bg-market-600 hover:bg-market-700"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing products across our most popular categories
          </p>
        </div>

        <div className="space-y-8">
          {renderProductGrid(phoneProducts, "Phones & Tech", "bg-blue-50")}
          {renderProductGrid(laptopProducts, "Laptops & Computers", "bg-purple-50")}
          {renderProductGrid(fashionProducts, "Fashion & Style", "bg-pink-50")}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
