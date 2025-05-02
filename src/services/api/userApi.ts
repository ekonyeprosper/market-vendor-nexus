import { baseApi } from './baseApi';
import { UserProfile } from '../types/auth.types';

interface PublicSellerProfile {
  businessName: string;
  businessAddress: string;
  rating: {
    average: number;
    count: number;
  };
  totalProducts: number;
  joinedDate: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
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
