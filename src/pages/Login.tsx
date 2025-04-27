import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically authenticate the user
    console.log("Login attempt with:", { email, password, rememberMe });
    
    // Show success toast for demo
    toast({
      title: "Success",
      description: "You've successfully logged in!",
    });

    // Navigate to seller dashboard after successful login
    navigate("/seller/dashboard");
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm border">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
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
              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-market-600 hover:text-market-700">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me for 30 days
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,2C6.477,2,2,6.477,2,12c0,4.237,2.636,7.855,6.356,9.312c-0.087-0.791-0.167-2.005,0.035-2.868c0.182-0.78,1.172-4.971,1.172-4.971s-0.299-0.6-0.299-1.486c0-1.39,0.806-2.428,1.81-2.428c0.853,0,1.265,0.641,1.265,1.41c0,0.858-0.546,2.14-0.828,3.33c-0.236,0.995,0.5,1.807,1.48,1.807c1.778,0,3.144-1.874,3.144-4.58c0-2.393-1.72-4.068-4.177-4.068c-2.845,0-4.515,2.135-4.515,4.34c0,0.859,0.331,1.781,0.744,2.281c0.082,0.099,0.093,0.186,0.069,0.287c-0.076,0.316-0.244,0.995-0.277,1.134c-0.043,0.183-0.145,0.222-0.335,0.134c-1.247-0.581-2.027-2.405-2.027-3.871c0-3.151,2.289-6.045,6.601-6.045c3.466,0,6.159,2.469,6.159,5.77c0,3.444-2.171,6.213-5.184,6.213c-1.013,0-1.965-0.525-2.291-1.148c0,0-0.501,1.909-0.623,2.374c-0.225,0.868-0.835,1.958-1.243,2.621C9.975,21.844,10.969,22,12,22c5.522,0,10-4.478,10-10S17.523,2,12,2z"
                />
              </svg>
              Facebook
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link to="/signup" className="text-market-600 hover:text-market-700 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
