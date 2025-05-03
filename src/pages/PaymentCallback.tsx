
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVerifyPaymentQuery } from '@/services/api/ordersApi';
import { toast } from '@/hooks/use-toast';
import Layout from "@/components/layout/Layout";

export const PaymentCallback = () => {
  const { reference } = useParams<{ reference: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useVerifyPaymentQuery(reference || '', { 
    skip: !reference 
  });

  useEffect(() => {
    if (data?.order) {
      const orderAmount = data.order.totals?.final || data.order.total || 0;
      localStorage.setItem('orderAmount', orderAmount.toString());
      localStorage.setItem('orderReference', data.payment.reference);
      navigate('/order-confirmation');
    } else if (error) {
      toast({
        title: "Payment Verification Failed",
        description: "There was an issue verifying your payment. Please contact support if your account was debited.",
        variant: "destructive",
      });
      navigate('/checkout');
    }
  }, [data, error, navigate]);

  if (isLoading || !reference) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">Verifying payment...</div>
        </div>
      </Layout>
    );
  }

  return null;
};

export default PaymentCallback;
