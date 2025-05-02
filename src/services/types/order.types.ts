export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface OrderSeller {
  id: string;
  name: string;
}

export interface OrderItem {
  product: OrderProduct;
  seller: OrderSeller;
  quantity: number;
  total: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  final: number;
}

export interface Order {
  orderId: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  payment: {
    status: string;
    method: string;
  };
  shipping: {
    address: ShippingAddress;
    method: string;
    cost: number;
    tracking: string | null;
  };
  totals: OrderTotals;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export interface DeliveryInfo {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  deliveryMethod: 'standard' | 'express';
  specialInstructions?: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  deliveryInfo: DeliveryInfo;
}

export interface PaymentResponse {
  payment: {
    paymentUrl: string;
    reference: string;
    amount: number;
    currency: string;
  };
  order: {
    id: string;
    status: string;
    items: Array<{
      product: string;
      quantity: number;
      price: number;
    }>;
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      final: number;
    }
  };
  customer: {
    email: string;
    shipping: {
      fullName: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    }
  };
}

export interface PaymentVerificationResponse {
  order: {
    _id: string;
    status: string;
    total: number;
    reference: string;
  };
  verified: boolean;
}
