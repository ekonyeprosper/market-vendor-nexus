
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Tag,
  SlidersHorizontal,
  X,
  FilterX,
  Bookmark,
  Heart,
  ChevronDown,
  ChevronUp 
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.vendor)));
  
  const minPrice = 0;
  const maxPrice = 500;
  
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
                         
    // Category filter
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Brand filter
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.vendor);
    
    // Rating filter
    const matchesRating = !selectedRating || product.rating >= selectedRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      default: // featured
        return 0;
    }
  });

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setSelectedRating(null);
  };
  
  const activeFiltersCount = (
    (selectedCategory ? 1 : 0) +
    (selectedBrands.length > 0 ? 1 : 0) +
    (selectedRating ? 1 : 0) +
    ((priceRange[0] > minPrice || priceRange[1] < maxPrice) ? 1 : 0)
  );

  // Filter section for desktop
  const FiltersSection = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <Slider
          defaultValue={[minPrice, maxPrice]}
          min={minPrice}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">${priceRange[0]}</span>
          <span className="text-sm text-gray-600">${priceRange[1]}</span>
        </div>
      </div>
      
      {/* Categories */}
      <Accordion type="single" collapsible className="w-full" defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <Button
                  variant={selectedCategory === "" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory("")}
                  className="w-full justify-start text-sm h-8"
                >
                  All Categories
                </Button>
              </div>
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Button
                    variant={selectedCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="w-full justify-start text-sm h-8"
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Brands */}
      <Accordion type="single" collapsible className="w-full" defaultValue="brands">
        <AccordionItem value="brands">
          <AccordionTrigger className="font-medium">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <label
                    htmlFor={`brand-${brand}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Ratings */}
      <Accordion type="single" collapsible className="w-full" defaultValue="ratings">
        <AccordionItem value="ratings">
          <AccordionTrigger className="font-medium">Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className={`flex items-center w-full py-1.5 px-2 rounded-md transition ${
                    selectedRating === rating ? 'bg-market-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">& Up</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        variant="outline" 
        onClick={clearAllFilters}
        className="w-full border-dashed"
      >
        <FilterX className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link to="/" className="hover:text-market-600">Home</Link>
                <span>/</span>
                <span className="text-gray-800">Products</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Badge variant="outline" className="font-normal">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                </div>
                <FiltersSection />
              </div>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetContent side="left" className="w-[85%] sm:max-w-md">
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your product search with our filters
                  </SheetDescription>
                </SheetHeader>
                <div className="overflow-y-auto flex-1">
                  <FiltersSection />
                </div>
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button className="w-full">View {filteredProducts.length} products</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="flex-1">
              {/* Search and Sort Controls */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex flex-1 w-full sm:w-auto gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="md:hidden" onClick={() => setMobileFiltersOpen(true)}>
                        <SlidersHorizontal className="h-5 w-5 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge className="ml-2 bg-market-600" variant="default">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex w-full sm:w-auto items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded ${
                          viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded ${
                          viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Active filters */}
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedCategory && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Category: {selectedCategory}
                        <button onClick={() => setSelectedCategory("")}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedBrands.length > 0 && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Brands: {selectedBrands.length}
                        <button onClick={() => setSelectedBrands([])}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {selectedRating && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {selectedRating}+ Stars
                        <button onClick={() => setSelectedRating(null)}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button onClick={() => setPriceRange([minPrice, maxPrice])}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{sortedProducts.length}</span> products
                </p>
              </div>

              {/* Product Grid/List */}
              {sortedProducts.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden group">
                        <div className="relative">
                          <Link to={`/products/${product.id}`}>
                            <div className="aspect-square overflow-hidden">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          </Link>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <Link to={`/products/${product.id}`}>
                            <h3 className="font-semibold mb-1 line-clamp-2 hover:text-market-600 transition-colors">{product.name}</h3>
                          </Link>
                          <div className="flex items-center text-sm mb-2">
                            <Link to={`/vendor/${product.vendor}`} className="text-market-600 hover:underline">
                              {product.vendor}
                            </Link>
                            <span className="mx-2 text-gray-300">•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <Button size="sm" className="rounded-full w-8 h-8 p-0 bg-market-600 hover:bg-market-700">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="flex">
                          <Link to={`/products/${product.id}`} className="w-40 h-40 flex-shrink-0">
                            <div className="w-full h-full overflow-hidden">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>
                          <CardContent className="flex-1 p-4">
                            <div className="flex justify-between">
                              <div>
                                <Link to={`/categories/${product.category}`}>
                                  <Badge variant="outline" className="mb-2">
                                    {product.category}
                                  </Badge>
                                </Link>
                                <Link to={`/products/${product.id}`}>
                                  <h3 className="font-semibold text-lg mb-1 hover:text-market-600 transition-colors">{product.name}</h3>
                                </Link>
                                <div className="flex items-center text-sm mb-2">
                                  <Link to={`/vendor/${product.vendor}`} className="text-market-600 hover:underline">
                                    {product.vendor}
                                  </Link>
                                  <span className="mx-2 text-gray-300">•</span>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span>{product.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <Button size="icon" variant="ghost" className="h-8 w-8">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                            
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-500 line-through ml-2">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button size="sm" className="bg-market-600 hover:bg-market-700">
                                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 text-gray-400">
                    <svg className="mx-auto h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 7a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                  <p className="text-gray-500 mb-6">Try changing your search or filter criteria</p>
                  <Button onClick={clearAllFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
