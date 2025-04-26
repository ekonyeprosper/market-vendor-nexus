
import { useState } from "react";
import { Link } from "react-router-dom";

const brands = [
  {
    id: 1,
    name: "TechGear",
    logo: "https://ui-avatars.com/api/?name=TechGear&background=0D8ABC&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 121,
  },
  {
    id: 2,
    name: "EcoFashion",
    logo: "https://ui-avatars.com/api/?name=EcoFashion&background=27AE60&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 98,
  },
  {
    id: 3,
    name: "ArtisanCrafts",
    logo: "https://ui-avatars.com/api/?name=ArtisanCrafts&background=8E44AD&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 86,
  },
  {
    id: 4,
    name: "SmartHome",
    logo: "https://ui-avatars.com/api/?name=SmartHome&background=E67E22&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 75,
  },
  {
    id: 5,
    name: "PhotoPro",
    logo: "https://ui-avatars.com/api/?name=PhotoPro&background=C0392B&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 63,
  },
  {
    id: 6,
    name: "LeatherCraft",
    logo: "https://ui-avatars.com/api/?name=LeatherCraft&background=16A085&color=fff&size=128&font-size=0.5&length=2&bold=true",
    productsCount: 54,
  }
];

const PopularBrands = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-market-100 text-market-800 text-sm font-medium mb-4">
            Top Vendors
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved brands with the highest quality products and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              to={`/vendor/${brand.name}`}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 text-center"
            >
              <div className="mx-auto mb-4 w-24 h-24 overflow-hidden rounded-full border-4 border-white shadow-md">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium mb-1">{brand.name}</h3>
              <p className="text-sm text-gray-500">{brand.productsCount} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
