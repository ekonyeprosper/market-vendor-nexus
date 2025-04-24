
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop",
    productCount: 152,
  },
  {
    id: 2,
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop",
    productCount: 89,
  },
  {
    id: 3,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",
    productCount: 234,
  },
  {
    id: 4,
    name: "Sports & Outdoor",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
    productCount: 67,
  }
];

const Categories = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden">
                <div className="aspect-square">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm">{category.productCount} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
