
export const demoProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro Max",
    slug: "iphone-14-pro-max",
    description: "Latest iPhone with advanced camera system and A16 Bionic chip",
    price: {
      current: 1199,
      compareAt: 1299,
      discount: 8
    },
    category: {
      id: "1",
      name: "Phones & Accessories"
    },
    seller: {
      id: "1",
      businessName: "TechWorld Store"
    },
    rating: {
      average: 4.8,
      count: 256
    },
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    badge: "Bestseller",
    stats: {
      sales: 1250,
      views: 5600
    }
  },
  {
    id: "2",
    name: "MacBook Air M2",
    slug: "macbook-air-m2",
    description: "Supercharged by M2 chip. Incredibly thin and light laptop",
    price: {
      current: 999,
      compareAt: 1199,
      discount: 17
    },
    category: {
      id: "2",
      name: "Laptops & Computers"
    },
    seller: {
      id: "2",
      businessName: "Apple Authorized"
    },
    rating: {
      average: 4.9,
      count: 189
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    badge: "New",
    stats: {
      sales: 890,
      views: 4200
    }
  },
  {
    id: "3",
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    description: "Comfortable running shoes with Air Max technology",
    price: {
      current: 129,
      compareAt: 160,
      discount: 19
    },
    category: {
      id: "3",
      name: "Fashion & Clothing"
    },
    seller: {
      id: "3",
      businessName: "SportStyle Hub"
    },
    rating: {
      average: 4.6,
      count: 342
    },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    badge: "Popular",
    stats: {
      sales: 2100,
      views: 8900
    }
  },
  {
    id: "4",
    name: "Samsung 55\" 4K Smart TV",
    slug: "samsung-55-4k-smart-tv",
    description: "Crystal clear 4K resolution with smart TV features",
    price: {
      current: 599,
      compareAt: 799,
      discount: 25
    },
    category: {
      id: "4",
      name: "Electronics"
    },
    seller: {
      id: "4",
      businessName: "Electronics Plus"
    },
    rating: {
      average: 4.7,
      count: 156
    },
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop",
    badge: "Deal",
    stats: {
      sales: 567,
      views: 3400
    }
  },
  {
    id: "5",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "Premium sound quality with noise cancellation",
    price: {
      current: 79,
      compareAt: 99,
      discount: 20
    },
    category: {
      id: "1",
      name: "Phones & Accessories"
    },
    seller: {
      id: "5",
      businessName: "Audio Masters"
    },
    rating: {
      average: 4.5,
      count: 289
    },
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600&auto=format&fit=crop",
    badge: "Trending",
    stats: {
      sales: 1456,
      views: 6700
    }
  }
];

// Generate more products by duplicating and modifying the base products
export const generateMoreProducts = () => {
  const baseProducts = [...demoProducts];
  const additionalProducts = [];
  
  for (let i = 0; i < 50; i++) {
    const baseProduct = baseProducts[i % baseProducts.length];
    const newProduct = {
      ...baseProduct,
      id: `${parseInt(baseProduct.id) + 100 + i}`,
      name: `${baseProduct.name} ${i + 1}`,
      slug: `${baseProduct.slug}-${i + 1}`,
      price: {
        ...baseProduct.price,
        current: baseProduct.price.current + Math.floor(Math.random() * 100) - 50
      },
      rating: {
        average: Math.round((Math.random() * 2 + 3) * 10) / 10,
        count: Math.floor(Math.random() * 500) + 50
      },
      stats: {
        sales: Math.floor(Math.random() * 2000) + 100,
        views: Math.floor(Math.random() * 10000) + 500
      }
    };
    additionalProducts.push(newProduct);
  }
  
  return [...baseProducts, ...additionalProducts];
};

export const allDemoProducts = generateMoreProducts();
