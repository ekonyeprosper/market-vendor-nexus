
import { baseApi } from './baseApi';
import { UserProfile } from '../types/auth.types';

export interface PublicSellerProfile {
  businessName: string;
  businessAddress: string;
  rating: {
    average: number;
    count: number;
  };
  totalProducts: number;
  joinedDate: string;
}

export interface ProfileResponse {
  _id: string;
  businessName?: string;
  businessAddress?: string;
  governmentId?: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
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

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/api/auth/profile',
        method: 'GET',
      }),
    }),
    getPublicSellerProfile: builder.query<PublicSellerProfile, string>({
      query: (sellerId) => `/api/auth/seller/${sellerId}/public`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useGetPublicSellerProfileQuery } = userApi;
