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
  }),
  overrideExisting: false,
});

export const { 
  useGetProfileQuery, 
  useGetPublicSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useUpdateCustomerProfileMutation 
} = userApi;
