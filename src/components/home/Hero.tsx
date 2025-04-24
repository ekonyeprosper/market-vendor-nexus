
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-market-50 to-market-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Shop Locally, <span className="text-market-600">Connect Globally</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              MarketVendorNexus brings together vendors and shoppers in a seamless online marketplace. 
              Discover unique products from local sellers or start selling your own items today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="px-8">
                  Shop Now
                </Button>
              </Link>
              <Link to="/seller/register">
                <Button variant="outline" size="lg" className="px-8">
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
                alt="Marketplace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center mb-2">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">1,500+ Active Vendors</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 bg-market-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">10,000+ Products Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
