
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  CalendarIcon
} from "lucide-react";
import { format } from "date-fns";
import { Order } from "@/services/types/order.types";

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailsDialog = ({ order, open, onOpenChange }: OrderDetailsDialogProps) => {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'processing':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Package className="h-5 w-5" /> Order #{order.orderId}
          </DialogTitle>
          <DialogDescription>
            Placed on {format(new Date(order.orderDate), 'MMMM dd, yyyy')}
          </DialogDescription>
        </DialogHeader>

        {/* Order Status */}
        <div className="bg-slate-50 p-4 rounded-md mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="font-semibold">Status:</span>
              <Badge className={`${getOrderStatusColor(order.status)} font-medium`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 text-sm">
                Last updated: {format(new Date(order.orderDate), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking Information */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Truck className="h-5 w-5 text-market-600" /> Tracking Information
          </h3>
          <div className="bg-white border rounded-md p-4">
            {order.shipping.tracking ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tracking Number:</span>
                  <span className="font-medium">{order.shipping.tracking}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Carrier:</span>
                  <span className="font-medium">{order.shipping.method}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-gray-500">
                Tracking information will be available once the order is shipped
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Order Items</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded border overflow-hidden">
                          <img 
                            src={item.product.image || "/placeholder.svg"} 
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.seller.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {formatCurrency(item.product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary and Shipping Address */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Order Summary */}
          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="bg-white border rounded-md p-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{formatCurrency(order.totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>{formatCurrency(order.totals.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>{formatCurrency(order.totals.tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCurrency(order.totals.final)}</span>
              </div>
              <div className="text-sm mt-2 flex items-center gap-1 text-gray-500">
                <span>Payment Status:</span>
                <Badge 
                  variant={order.payment.status === 'paid' ? 'default' : 'outline'}
                  className={order.payment.status === 'paid' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : ''}
                >
                  {order.payment.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm flex items-center gap-1 text-gray-500">
                <span>Payment Method:</span>
                <span className="capitalize">{order.payment.method}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-market-600" /> Shipping Address
            </h3>
            <div className="bg-white border rounded-md p-4">
              <div className="text-gray-800">
                <p className="font-medium">{order.shipping.address.fullName}</p>
                <p>{order.shipping.address.street}</p>
                <p>
                  {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.zipCode}
                </p>
                <p>{order.shipping.address.country}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
