
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    description: "High-quality sound with noise cancellation technology",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600&auto=format&fit=crop",
    vendor: "TechGear",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Handcrafted Ceramic Mug",
    description: "Elegant design, perfect for your morning coffee",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop",
    vendor: "ArtisanCrafts",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Comfortable, eco-friendly, and stylish",
    price: 34.50,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    vendor: "EcoFashion",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Smart LED Desk Lamp",
    description: "Adjustable brightness with wireless charging base",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
    vendor: "SmartHome",
    rating: 4.6,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-600 mt-2">
              Our handpicked selection of quality products from trusted vendors
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
            >
              <Link to={`/products/${product.id}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/products/${product.id}`} className="hover:text-market-600">
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center bg-gray-100 rounded px-2 py-1">
                    <svg
                      className="w-4 h-4 text-yellow-500 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>by </span>
                  <Link to={`/vendor/${product.vendor}`} className="ml-1 text-market-600 hover:underline">
                    {product.vendor}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <Button size="sm" className="rounded-full w-10 h-10 p-0">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
