
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart, Share2, ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock product data (in a real app, this would come from an API)
const product = {
  id: "1",
  name: "Premium Wireless Earbuds",
  price: 99.99,
  originalPrice: 129.99,
  description: "High-quality wireless earbuds with noise cancellation technology. Perfect for music lovers and professionals who need clear audio quality on the go.",
  features: [
    "Active Noise Cancellation",
    "8-hour battery life",
    "Wireless charging",
    "Water resistant (IPX5)",
    "Touch controls",
    "Voice assistant compatible"
  ],
  rating: 4.7,
  reviews: 124,
  stock: 15,
  images: [
    "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=1000&auto=format&fit=crop"
  ],
  colors: ["Black", "White", "Blue"],
  vendor: "TechGear",
  vendorId: "vendor123",
  category: "Electronics",
  relatedProducts: [
    {
      id: "2",
      name: "Bluetooth Speaker",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600&auto=format&fit=crop",
      vendor: "AudioTech",
      rating: 4.5
    },
    {
      id: "3",
      name: "Wireless Headphones",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      vendor: "TechGear",
      rating: 4.8
    },
    {
      id: "4",
      name: "Smart Watch",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop",
      vendor: "SmartWear",
      rating: 4.6
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedColor}) added to your cart`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/products" className="flex items-center text-sm text-market-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === index ? 'border-market-600' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Link to={`/vendor/${product.vendorId}`} className="text-market-600 hover:underline text-sm">
                  {product.vendor}
                </Link>
                <span className="mx-2 text-gray-400">•</span>
                <Link to={`/categories/${product.category}`} className="text-gray-500 hover:underline text-sm">
                  {product.category}
                </Link>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <span className="text-green-600 text-sm">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 border rounded-full ${
                        selectedColor === color 
                          ? 'border-market-600 bg-market-50 text-market-700' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 inline-flex rounded-md">
                  <button
                    className="px-3 py-1 border-r border-gray-300"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    className="px-3 py-1 border-l border-gray-300"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                  <Heart className="mr-2 h-5 w-5" /> Wishlist
                </Button>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs - Features, Specs, Reviews */}
        <div className="mb-16">
          <Tabs defaultValue="features">
            <TabsList className="mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Product Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">{product.vendor}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">TWE-2023</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Connectivity</span>
                    <span className="font-medium">Bluetooth 5.2</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Battery Life</span>
                    <span className="font-medium">8 hours</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Water Resistance</span>
                    <span className="font-medium">IPX5</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Warranty</span>
                    <span className="font-medium">1 Year</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">John D.</h4>
                    <span className="text-gray-600 text-sm">2 days ago</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">These earbuds are amazing! The sound quality is excellent and the noise cancellation works great. Battery life is as advertised.</p>
                </div>
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Sarah M.</h4>
                    <span className="text-gray-600 text-sm">1 week ago</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">Good product but the touch controls can be a bit finicky. Sound quality is excellent though.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/products/${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/products/${relatedProduct.id}`} className="hover:text-market-600">
                    <h3 className="font-semibold mb-1 line-clamp-2">{relatedProduct.name}</h3>
                  </Link>
                  <div className="flex items-center text-sm mb-2">
                    <span>{relatedProduct.vendor}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{relatedProduct.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${relatedProduct.price}</span>
                    <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
