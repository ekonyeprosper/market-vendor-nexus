
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const BASE_URL = "https://campus-trade-bakend.onrender.com";
// export const BASE_URL = "https://market-vendor.onrender.com";
// export const BASE_URL = "http://localhost:3000";

export type TagTypes = 'Categories' | 'Products' | 'Users' | 'Orders' | 'Profile' | 'Sellers';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Categories', 'Products', 'Users', 'Orders', 'Profile', 'Sellers'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: async (input, init) => {
      // Set reasonable timeouts for poor connections
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        const response = await fetch(input, {
          ...init,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }
  }),
  endpoints: () => ({}),
});
