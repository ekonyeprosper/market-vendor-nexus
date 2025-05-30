import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { authApi } from '../api/authApi';
import { productsApi } from '../api/productsApi';
import { ordersApi } from '../api/ordersApi';
import { categoriesApi } from '../api/categoriesApi';
import { userApi } from '../api/userApi';
import { adminApi } from '../api/adminApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      ordersApi.middleware,
      categoriesApi.middleware,
      userApi.middleware,
      adminApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
