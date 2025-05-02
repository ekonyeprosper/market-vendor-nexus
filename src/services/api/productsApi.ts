import { baseApi } from './baseApi';
import { Product, ProductFilters, PaginatedResponse } from '../types/product.types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ...existing endpoints...

    getProduct: builder.query<Product, string>({
      query: (id) => `/api/products/${id}`,
    }),

    getPublicProduct: builder.query<Product, string>({
      query: (id) => `/api/products/public/${id}`,
    }),

    getRelatedProducts: builder.query<any, any>({
      query: ({ id, limit = 4 }) => ({
        url: `/api/products/related/${id}`,
        params: { limit }
      }),
    }),

    incrementProductViews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}/views`,
        method: 'POST',
      }),
    }),

    createProduct: builder.mutation<Product, FormData>({
      query: (data) => ({
        url: '/api/products',
        method: 'POST',
        body: data,
      }),
    }),

    updateProduct: builder.mutation<Product, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
    }),

    getSellerProducts: builder.query<any, any>({
      query: (params) => ({
        url: '/api/products/seller',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          status: params.status,
          sort: params.sort || '-createdAt'
        },
      }),
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

    getAdminProducts: builder.query<any, any>({
      query: (params) => ({
        url: '/api/products/admin/list',
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          status: params.status,
          sellerId: params.sellerId,
          search: params.search,
          sort: params.sort
        },
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetPublicProductQuery,
  useGetRelatedProductsQuery,
  useIncrementProductViewsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSellerProductsQuery,
  useGetPublicProductsQuery,
  useGetAdminProductsQuery,
} = productsApi;
