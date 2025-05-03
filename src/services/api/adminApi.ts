
import { baseApi } from './baseApi';
import { UsersResponse } from '../types/admin.types';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, {
      page?: number;
      limit?: number;
      role?: string;
      isVerified?: boolean;
    }>({
      query: (params) => ({
        url: '/api/auth/admin/users',
        method: 'GET',
        params,
      }),
    }),
    verifySeller: builder.mutation<{ success: boolean; message: string }, string>({
      query: (sellerId) => ({
        url: `/api/auth/admin/verify-seller/${sellerId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useVerifySellerMutation,
  useGetUsersQuery,
} = adminApi;
