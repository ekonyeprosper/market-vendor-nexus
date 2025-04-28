export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
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
  success: boolean;
  message: string;
}
