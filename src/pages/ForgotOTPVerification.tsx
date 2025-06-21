import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Shield, Mail } from "lucide-react";
import { useVerifyForgotOTPMutation, useResendForgotOTPMutation } from "@/services/api/authApi";

const ForgotOTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [verifyForgotOTP, { isLoading }] = useVerifyForgotOTPMutation();
  const [resendForgotOTP, { isLoading: isResendingOTP }] = useResendForgotOTPMutation();

  // Extract email from location state
  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
      return;
    }
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${email}`,
    });
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [email, navigate, toast]);

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleResendOTP = async () => {
    if (countdown === 0) {
      setIsResending(true);
      try {
        const result = await resendForgotOTP({ email }).unwrap();
        setCountdown(60);
        toast({
          title: "Success",
          description: result.message || "A new verification code has been sent to your email",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.data?.message || "Failed to resend verification code",
          variant: "destructive",
        });
      } finally {
        setIsResending(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) return;
    try {
      const result = await verifyForgotOTP({ email, otp }).unwrap();
      toast({
        title: "Success",
        description: result.message || "OTP verified successfully!",
      });
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      setOtp("");
      toast({
        title: "Error",
        description: error.data?.message || "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-purple-50 to-white">
        <Card className="w-full max-w-md shadow-lg border-purple-100">
          <CardHeader className="text-center space-y-1 pb-2">
            <div className="mx-auto bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Shield className="text-market-600 h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-market-600">Reset Password Verification</h1>
            <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Enter the code sent to {email}</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-600">
                We've sent a 6-digit verification code to your email address.
                Please enter the code below to continue resetting your password.
              </p>
            </div>
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="border-market-200 focus:border-market-600" />
                  <InputOTPSlot index={1} className="border-market-200 focus:border-market-600" />
                  <InputOTPSlot index={2} className="border-market-200 focus:border-market-600" />
                  <InputOTPSlot index={3} className="border-market-200 focus:border-market-600" />
                  <InputOTPSlot index={4} className="border-market-200 focus:border-market-600" />
                  <InputOTPSlot index={5} className="border-market-200 focus:border-market-600" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="space-y-4">
              <Button 
                className="w-full bg-market-600 hover:bg-market-700"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code?
                </p>
                <Button
                  variant="ghost"
                  className="text-market-600 hover:text-market-700 text-sm mt-1"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isResending || isResendingOTP}
                >
                  {isResending || isResendingOTP
                    ? "Sending..." 
                    : countdown > 0 
                      ? `Resend in ${countdown}s` 
                      : "Resend Code"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotOTPVerification;
