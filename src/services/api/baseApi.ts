
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

export const BASE_URL = "https://market-vendor.onrender.com";
// export const BASE_URL = "http://localhost:3000";

export type TagTypes = 'Categories';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Categories'],
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
  endpoints: () => ({}),
});
