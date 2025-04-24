
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";

const Cart = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Empty State */}
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Your cart is empty</p>
              <Button variant="link" className="mt-2">
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            <Button className="w-full" disabled>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
