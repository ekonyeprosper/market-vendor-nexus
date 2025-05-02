export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'admin' | 'seller' | 'customer';
  isVerified: boolean;
  businessName?: string;
  businessAddress?: string;
  adminVerified?: boolean;
  permissions?: string[];
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SellerRegistrationRequest {
  email: string;
  password: string;
  fullName: string;
  businessName: string;
  phone: string;
  address: string;
  governmentId: File;
  agreeTerms: boolean;
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

export interface VerifyOTPResponse {
  token: string;
  message: string;
}

export interface ResendOTPRequest {
  email: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
}

export interface UserProfile {
  _id: string;
  businessName: string;
  businessAddress: string;
  governmentId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
