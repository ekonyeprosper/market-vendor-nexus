import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const OrderDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p>Order not found.</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold mb-2">Order Details</h2>
            <div className="text-gray-600 text-sm">Order ID: {order.orderId}</div>
            <div className="text-gray-600 text-sm">Date: {new Date(order.orderDate).toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Status: {order.status}</div>
            <div className="text-gray-600 text-sm">Payment: {order.payment.status} ({order.payment.method})</div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Items</h3>
            <ul className="mb-4">
              {order.items.map((item: any, idx: number) => (
                <li key={idx} className="flex gap-4 items-center mb-2">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                  <div>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    <div className="text-sm text-gray-500">Price: ₦{item.product.price.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Total: ₦{item.total.toLocaleString()}</div>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div className="mb-4 text-sm text-gray-700">
              {order.shipping.address.street}, {order.shipping.address.city}, {order.shipping.address.state}, {order.shipping.address.zipCode}, {order.shipping.address.country}
            </div>
            <h3 className="font-semibold mb-2">Order Totals</h3>
            <div className="mb-2 text-sm">
              <div>Subtotal: ₦{order.totals.subtotal.toLocaleString()}</div>
              <div>Tax: ₦{order.totals.tax.toLocaleString()}</div>
              <div>Shipping: ₦{order.totals.shipping.toLocaleString()}</div>
              <div className="font-bold">Final Total: ₦{order.totals.final.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
