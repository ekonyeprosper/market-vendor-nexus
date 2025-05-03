
import { baseApi } from './baseApi';
import { UsersQueryParams, UsersResponse } from '../types/admin.types';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UsersQueryParams>({
      query: (params) => ({
        url: '/api/auth/admin/users',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
    verifySeller: builder.mutation<{ success: boolean; message: string }, string>({
      query: (sellerId) => ({
        url: `/api/auth/admin/verify-seller/${sellerId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useVerifySellerMutation,
  useGetUsersQuery,
} = adminApi;
