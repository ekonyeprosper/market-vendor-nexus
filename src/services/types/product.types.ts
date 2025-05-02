export interface Product {
  _id: string;
  name: string;
  description: string;
  price: {
    current: number;
    discount?: number;
  };
  inventory: {
    quantity: number;
    sku: string;
    lowStockAlert: number;
  };
  metadata: {
    rating: {
      average: number;
      count: number;
    };
    views: number;
    sales: number;
  };
  sellerId: {
    _id: string;
    businessName: string;
  };
  category: {
    _id: string;
    name: string;
  };
  images: Array<{
    url: string;
    isDefault: boolean;
    _id: string;
  }>;
  status: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface PaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    pages: number;
    currentPage: string;
    limit: string;
  };
}
