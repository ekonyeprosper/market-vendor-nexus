export interface User {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  adminVerified?: boolean;
  businessName?: string;
  businessAddress?: string;
  governmentId?: string;
  permissions?: string[];
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  role?: string;
  isVerified?: boolean;
}
