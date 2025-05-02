import { baseApi } from './baseApi';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
}

interface CreateOrderRequest {
  guestEmail: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

interface InitiatePaymentResponse {
  paymentUrl: string;
  reference: string;
}

interface PaymentResponse {
  payment: {
    paymentUrl: string;
    reference: string;
    amount: number;
    currency: string;
  };
  order: {
    id: string;
    status: string;
    totals: {
      final: number;
    };
  };
}

interface VerificationResponse {
  order: {
    _id: string;
    status: string;
    total: number;
    reference: string;
  };
  verified: boolean;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: number;
  total: number;
}

interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ orderId: string }, CreateOrderRequest>({
      query: (data) => ({
        url: '/api/orders',
        method: 'POST',
        body: data,
      }),
    }),
    createCustomerOrder: builder.mutation<any, CreateOrderRequest>({
      query: (data) => ({
        url: '/api/orders/customer/create',
        method: 'POST',
        body: data,
      }),
    }),
    initiateCustomerPayment: builder.mutation<PaymentResponse, string>({
      query: (orderId) => ({
        url: `/api/orders/customer/${orderId}/pay`,
        method: 'POST',
      }),
    }),
    verifyPayment: builder.query<PaymentResponse, string>({
      query: (reference) => `/api/orders/verify/${reference}`,
    }),
    getSellerOrders: builder.query<OrdersResponse, void>({
      query: () => '/api/orders/seller',
    }),
    getCustomerOrders: builder.query<OrdersResponse, {
      page?: number;
      limit?: number;
    }>({
      query: (params) => ({
        url: '/api/orders/customer',
        params: {
          page: params.page || 1,
          limit: params.limit || 10
        }
      })
    }),
  }),
});

export const { 
  useCreateOrderMutation,
  useCreateCustomerOrderMutation,
  useInitiateCustomerPaymentMutation,
  useVerifyPaymentQuery,
  useGetSellerOrdersQuery,
  useGetCustomerOrdersQuery,
} = ordersApi;
