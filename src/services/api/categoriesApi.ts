import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { 
  Category, 
  CategoriesResponse, 
  CreateCategoryDto, 
  CategoryStatsResponse,
  PopularCategoriesResponse
} from '../types/category.types';
import { BASE_URL } from './baseApi';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
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
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, {
      isActive?: boolean;
      sort?: string;
      page?: number;
      limit?: number;
    }>({
      query: (params) => ({
        url: '/api/categories',
        params
      }),
      providesTags: (result) => 
        result
          ? [
              ...result.categories.map(({ id }) => ({ 
                type: 'Categories' as const,
                id 
              })),
              { type: 'Categories' as const, id: 'LIST' }
            ]
          : [{ type: 'Categories' as const, id: 'LIST' }]
    }),

    getCategoryStats: builder.query<CategoryStatsResponse, void>({
      query: () => ({
        url: '/api/categories/stats',
      }),
      providesTags: [{ type: 'Categories', id: 'STATS' }]
    }),

    getPopularCategories: builder.query<PopularCategoriesResponse, {
      limit?: number;
    }>({
      query: (params = {}) => ({
        url: '/api/categories/popular',
        params
      }),
      providesTags: [{ type: 'Categories', id: 'POPULAR' }]
    }),

    createCategory: builder.mutation<Category, CreateCategoryDto>({
      query: (data) => ({
        url: '/api/categories',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [
        { type: 'Categories', id: 'LIST' }, 
        { type: 'Categories', id: 'STATS' },
        { type: 'Categories', id: 'POPULAR' }
      ]
    }),
    
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [
        { type: 'Categories', id: 'LIST' },
        { type: 'Categories', id: 'STATS' },
        { type: 'Categories', id: 'POPULAR' }
      ]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryStatsQuery,
  useGetPopularCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation
} = categoriesApi;
