import { baseApi } from './baseApi';
import { Category, CategoriesResponse, CreateCategoryDto } from '../types/category.types';

export const categoriesApi = baseApi.injectEndpoints({
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

    createCategory: builder.mutation<any, any>({
      query: (data) => ({
        url: '/api/categories',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Categories' as const, id: 'LIST' }]
    })
  })
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation
} = categoriesApi;
