export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  order: number;
  parent: {
    id: string;
    name: string;
  } | null;
  image: string | null;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface CreateCategoryDto {
  name: string;
  description: string;
  order: number;
  parent?: string;
}
