import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { BASE_URL } from './baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
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
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
      }
    }),
    registerSeller: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/api/auth/register/seller',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      extraOptions: {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
      }
    }),
    verifyOTP: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOTP: builder.mutation< any, any>({
      query: (data) => ({
        url: '/api/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
    registerCustomer: builder.mutation<
      { message: string }, 
      FormData
    >({
      query: (data) => ({
        url: '/api/auth/register/customer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterSellerMutation, 
  useVerifyOTPMutation,
  useResendOTPMutation,
  useRegisterCustomerMutation,
} = authApi;
