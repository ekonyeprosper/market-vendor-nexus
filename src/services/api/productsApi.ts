import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { BASE_URL } from './baseApi';

export const productsApi = createApi({
  reducerPath: 'productsApi',
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
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProduct: builder.query<any, string>({
      query: (id) => `/api/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    getPublicProduct: builder.query<any, string>({
      query: (id) => `/api/products/public/${id}`,
    }),

    getRelatedProducts: builder.query<any, { id: string; limit?: number }>({
      query: ({ id, limit = 4 }) => ({
        url: `/api/products/related/${id}`,
        params: { limit }
      }),
    }),

    getTrendingProducts: builder.query<any, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/products/trending',
        params
      }),
    }),

    getPopularProducts: builder.query<any, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/products/popular',
        params
      }),
    }),

    incrementProductViews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}/views`,
        method: 'POST',
      }),
    }),

    createProduct: builder.mutation<any, FormData>({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    updateProduct: builder.mutation<any, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
    }),

    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => [
        { type: 'Products', id: 'LIST' },
        { type: 'Products', id: result?.data.id }
      ],
    }),

    getSellerProducts: builder.query<any, {
      page?: number;
      limit?: number;
      status?: string;
      sort?: string;
    }>({
      query: (params) => ({
        url: '/api/products/seller/products',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          sort: params.sort || '-createdAt'
        },
      }),
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    getPublicProducts: builder.query<any, any>({
      query: (params) => ({
        url: '/api/products/public',
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          category: params.category,
          search: params.search,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          sort: params.sort
        },
      }),
    }),

    getAdminProducts: builder.query<any, {
      page?: number;
      limit?: number;
      sort?: string;
    }>({
      query: (params) => ({
        url: '/api/products/admin/active',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          sort: params.sort || '-createdAt'
        }
      }),
      providesTags: ['Products'],
    }),

    getPublicSellerProducts: builder.query<any, { 
      sellerId: string;
      page?: number;
      limit?: number;
      excludeProduct?: string;  
    }>({
      query: ({ sellerId, ...params }) => ({
        url: `/api/products/seller/${sellerId}/public`,
        params: {
          page: params.page || 1,
          limit: params.limit || 12,
          ...params
        }
      }),
      extraOptions: {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
      }
    }),

    getSellerDashboardStats: builder.query<any, void>({
      query: () => '/api/products/seller/dashboard',
      extraOptions: {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
      }
    }),

    updateProductStatus: builder.mutation<any, {
      productId: string;
      status: 'active' | 'draft';
    }>({
      query: ({ productId, status }) => ({
        url: `/api/products/${productId}/status`,
        method: 'PATCH',
        body: { status }
      }),
      invalidatesTags: ['Products'],
      extraOptions: {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false
      }
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetPublicProductQuery,
  useGetRelatedProductsQuery,
  useGetTrendingProductsQuery,
  useGetPopularProductsQuery,
  useIncrementProductViewsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSellerProductsQuery,
  useGetPublicProductsQuery,
  useGetAdminProductsQuery,
  useGetPublicSellerProductsQuery,
  useGetSellerDashboardStatsQuery,
  useUpdateProductStatusMutation,
} = productsApi;
