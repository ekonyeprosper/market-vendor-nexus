
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Our Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting talented vendors with discerning customers through a modern shopping experience.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
              alt="Our Mission"
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe in creating opportunities for small businesses and artisans to reach
              a global audience. Our platform provides the tools and visibility needed for sellers
              to grow their business while offering buyers access to unique, quality products.
            </p>
            <Link to="/contact">
              <Button>Get in Touch</Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-market-600 mb-2">1000+</div>
            <div className="text-gray-600">Active Sellers</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-market-600 mb-2">50k+</div>
            <div className="text-gray-600">Products Listed</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold text-market-600 mb-2">100k+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
