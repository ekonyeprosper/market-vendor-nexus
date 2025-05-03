
export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  _id?: string;
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
