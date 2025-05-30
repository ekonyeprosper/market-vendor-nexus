import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { BASE_URL } from './baseApi';


export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Orders'],
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
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
    GetAdminOrders: builder.query<any, string>({
      query: (timeframe = 'month') => ({
        url: '/api/orders/admin/dashboard',
        params: { timeframe }
      }),
      providesTags: ['Orders'],
    }),
    getDashboardStats: builder.query<any, string>({
      query: (timeframe) => ({
        url: '/api/auth/admin/dashboard-stats',
        params: { timeframe }
      }),
    }),
  }),
});

export const {
  useVerifySellerMutation,
  useGetUsersQuery,
  useGetAdminOrdersQuery,
  useGetDashboardStatsQuery,
} = adminApi;
