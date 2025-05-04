export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id?: string; // Backend might use _id
  id?: string;  // Frontend might reference as id
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'admin' | 'seller' | 'customer';
  isVerified: boolean;
  businessName?: string;
  businessAddress?: string;
  adminVerified?: boolean;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  _id: string;
  id?: string; // Adding for consistency
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  businessName?: string;
  businessAddress?: string;
  governmentId?: string;
  createdAt: string;
  updatedAt: string;
  addresses?: {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    isDefault: boolean;
  }[];
}

export interface TopSeller {
  id: string;
  businessName: string;
  rating: {
    average: number;
    count: number;
  };
  totalProducts: number;
  logo?: string;
  slug: string;
}

export interface TopSellersResponse {
  sellers: TopSeller[];
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface SellerVerificationData {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'seller';
  isVerified: boolean;
  profileImage?: string;
  businessName: string;
  businessAddress: string;
  adminVerified: boolean;
  governmentId?: string;
}

export interface CustomerVerificationData {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'customer';
  isVerified: boolean;
  profileImage?: string;
  shippingAddresses: any[];
  metadata: {
    lastLogin: string;
    totalOrders: number;
  };
}

export interface VerifyOTPResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: SellerVerificationData | CustomerVerificationData;
  };
}

export interface ResendOTPRequest {
  email: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
}
