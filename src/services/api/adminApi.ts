import { baseApi } from './baseApi';
import {  UsersResponse } from '../types/admin.types';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
      query: (params) => ({
        url: '/api/auth/admin/users',
        method: 'GET',
        params,
      }),
    }),
    verifySeller: builder.mutation<any, string>({
      query: (sellerId) => ({
        url: `/api/auth/admin/verify-seller/${sellerId}`,
        method: 'PATCH',
        // Token will be automatically added by baseApi configuration
      }),
    }),
  }),
});

export const {
  useVerifySellerMutation,
  useGetUsersQuery,
} = adminApi;
