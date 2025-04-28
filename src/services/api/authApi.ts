import { baseApi } from './baseApi';
import { LoginRequest, LoginResponse, SellerRegistrationRequest, RegistrationResponse, VerifyOTPRequest, VerifyOTPResponse } from '../types/auth.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registerSeller: builder.mutation<RegistrationResponse, SellerRegistrationRequest>({
      query: (formData) => {
        const bodyFormData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'governmentId') {
            bodyFormData.append(key, value as File);
          } else {
            bodyFormData.append(key, String(value));
          }
        });

        return {
          url: '/api/auth/register/seller',
          method: 'POST',
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => ({
        url: '/api/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterSellerMutation, useVerifyOTPMutation } = authApi;
