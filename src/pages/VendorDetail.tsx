
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VendorDetail = () => {
  const { vendorId } = useParams();
  const [activeTab, setActiveTab] = useState("products");
  
  // This would be replaced with an actual API call in a real application
  const vendor = {
    id: vendorId,
    name: vendorId || "Vendor Name",
    logo: `https://ui-avatars.com/api/?name=${vendorId}&background=random&color=fff&size=128&font-size=0.5&length=2&bold=true`,
    description: "This vendor provides high-quality products at competitive prices. With years of experience in the market, they have built a reputation for excellent customer service and reliable shipping.",
    rating: 4.8,
    productsCount: 86,
    location: "Lagos, Nigeria",
    memberSince: "January 2022",
  };

  const products = [
    {
      id: 1,
      name: "Premium Bluetooth Headphones",
      description: "Noise cancelling with superior sound quality",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse",
      description: "Ultra-responsive with customizable RGB lighting",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      description: "Tactile keys for enhanced typing experience",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Ultra HD Monitor",
      description: "Crystal clear display with vibrant colors",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
      rating: 4.6,
    },
  ];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Vendor Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{vendor.rating} Rating</span>
                </div>
                <div className="text-gray-600">
                  {vendor.productsCount} Products
                </div>
                <div className="text-gray-600">
                  {vendor.location}
                </div>
                <div className="text-gray-600">
                  Member since {vendor.memberSince}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 max-w-3xl">
                {vendor.description}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button variant="outline">Contact Vendor</Button>
                <Button variant="outline">Follow Store</Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link to={`/products/${product.id}`} className="hover:text-market-600">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{formatCurrency(product.price)}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
              <p className="text-gray-600">Reviews will be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">About {vendor.name}</h2>
              <p className="text-gray-700 mb-4">{vendor.description}</p>
              <p className="text-gray-700">
                Located in {vendor.location}, this vendor has been a trusted member of our 
                marketplace since {vendor.memberSince}. With {vendor.productsCount} products 
                available and an average rating of {vendor.rating}/5, they continue to provide 
                excellent service to our community.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorDetail;
