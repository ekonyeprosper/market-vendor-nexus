import { baseApi } from './baseApi';
import { UserProfile } from '../types/auth.types';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: '/api/auth/profile',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery } = userApi;
