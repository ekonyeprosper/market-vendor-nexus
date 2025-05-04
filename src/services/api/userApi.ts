
import { baseApi } from './baseApi';
import { UserProfile, TopSellersResponse } from '../types/auth.types';

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

export interface UpdateProfileResponse {
  message: string;
  profile: UserProfile;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/api/auth/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    getPublicSellerProfile: builder.query<PublicSellerProfile, string>({
      query: (sellerId) => `/api/auth/seller/${sellerId}/public`,
    }),
    updateSellerProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (data) => ({
        url: '/api/auth/profile/seller/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateCustomerProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (data) => ({
        url: '/api/auth/profile/customer/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    getTopSellers: builder.query<TopSellersResponse, number | void>({
      query: (limit) => ({
        url: limit ? `/api/auth/sellers/top?limit=${limit}` : '/api/auth/sellers/top',
        method: 'GET',
      }),
      providesTags: ['Sellers'],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetProfileQuery, 
  useGetPublicSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useUpdateCustomerProfileMutation,
  useGetTopSellersQuery
} = userApi;
