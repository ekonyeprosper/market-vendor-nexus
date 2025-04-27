import { categories } from "@/data/categories";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  // Use first 4 categories for featured section
  const featuredCategories = categories.slice(0, 4);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for, from the latest tech gadgets to handcrafted items.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group block overflow-hidden rounded-xl bg-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category?.count} products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/categories">
            <button className="text-market-600 hover:text-market-700 font-medium">
              View All Categories →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
