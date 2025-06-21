import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { useForgotPasswordMutation } from "@/services/api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
      navigate("/forgot-otp-verification", { state: { email } });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="text-gray-600 mt-2">
              {isSubmitted 
                ? "Please check your email for reset instructions"
                : "Enter your email address to receive a password reset link"}
            </p>
          </div>

          {!isSubmitted && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset instructions"}
              </Button>
            </form>
          )}

          <div className="text-center text-sm">
            <Link to="/login" className="text-market-600 hover:text-market-700 font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;