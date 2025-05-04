import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import { Shield, User, Mail, Lock, IdCard } from "lucide-react";
import { useRegisterSellerMutation, useRegisterCustomerMutation } from "@/services/api/authApi";

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [userType, setUserType] = useState<'customer' | 'seller'>('customer');
  
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    agreeTerms: false
  });
  
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIdDocument(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setIdPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [registerCustomer, { isLoading: isCustomerLoading }] = useRegisterCustomerMutation();
  const [registerSeller, { isLoading: isSellerLoading }] = useRegisterSellerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base validation for all users
    if (!formData.fullName || !formData.email || !formData.password || 
        !formData.confirmPassword || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Seller-specific validation
    if (userType === 'seller' && (!formData.businessName || !formData.address || !idDocument)) {
      toast({
        title: "Error",
        description: "Please complete all seller information",
        variant: "destructive",
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('phoneNumber', formData.phone);

      if (userType === 'seller') {
        formDataToSend.append('businessName', formData.businessName);
        formDataToSend.append('businessAddress', formData.address);
        if (idDocument) {
          formDataToSend.append('governmentId', idDocument);
        }
        await registerSeller(formDataToSend).unwrap();
      } else {
        await registerCustomer(formDataToSend).unwrap();
      }

      toast({
        title: "Success",
        description: userType === 'seller' 
          ? "Registration successful! Proceeding to verification."
          : "Registration successful! Please check your email for OTP verification.",
      });

      // Navigate based on user type
      if (userType === 'seller') {
        navigate("/otp-verification", { 
          state: { 
            email: formData.email,
            phone: formData.phone,
            type: 'seller'
          }
        });
      } else {
        navigate("/otp-verification", { 
          state: { 
            email: formData.email,
            type: 'customer'
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-purple-50 to-white">
        <Card className="w-full max-w-xl shadow-lg border-purple-100">
          <CardHeader className="text-center space-y-1 pb-2">
            <div className="mx-auto bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-2">
              <Shield className="text-market-600 h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-market-600">CampusTrade Registration</h1>
            <p className="text-gray-600 text-sm">
              Join our marketplace as a verified campusTrade
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                type="button"
                variant={userType === 'customer' ? 'default' : 'outline'}
                onClick={() => setUserType('customer')}
              >
                Register as Customer
              </Button>
              <Button
                type="button"
                variant={userType === 'seller' ? 'default' : 'outline'}
                onClick={() => setUserType('seller')}
              >
                Register as Seller
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-market-600 flex items-center gap-2">
                  <User className="h-4 w-4" /> Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name*</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                  
                  {userType === 'seller' && (
                    <div>
                      <Label htmlFor="businessName">Business Name*</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your Business LLC"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address*</Label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>

                {userType === 'seller' && (
                  <div>
                    <Label htmlFor="address">Business Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Market St, City, State, ZIP"
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
              
              {/* Security Information */}
              <div className="space-y-4 pt-2">
                <h3 className="font-medium text-market-600 flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Security Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password*</Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password*</Label>
                    <div className="mt-1 relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ID Verification */}
              {userType === 'seller' && (
                <div className="space-y-4 pt-2">
                  <h3 className="font-medium text-market-600 flex items-center gap-2">
                    <IdCard className="h-4 w-4" /> Identity Verification
                  </h3>
                  
                  <div className="border-dashed border-2 border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    
                    {!idPreview ? (
                      <div className="py-4">
                        <IdCard className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Upload a valid government ID (Passport, Driver's License, ID Card)</p>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2"
                        >
                          Select File
                        </Button>
                      </div>
                    ) : (
                      <div className="py-2">
                        {idDocument?.type.startsWith('image/') ? (
                          <img src={idPreview} alt="ID Preview" className="max-h-40 mx-auto object-contain" />
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-market-600">
                            <IdCard className="h-6 w-6" />
                            <span>{idDocument?.name}</span>
                          </div>
                        )}
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2"
                        >
                          Change File
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="agreeTerms" 
                  checked={formData.agreeTerms} 
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({...prev, agreeTerms: checked === true}))
                  }
                />
                <Label htmlFor="agreeTerms" className="text-sm leading-tight">
                  I agree to the terms and conditions, including the privacy policy and seller agreement.
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-market-600 hover:bg-market-700"
                disabled={userType === 'seller' ? isSellerLoading : isCustomerLoading}
              >
                {userType === 'seller' 
                  ? (isSellerLoading ? "Creating Account..." : "Create Seller Account")
                  : (isCustomerLoading ? "Creating Account..." : "Create Customer Account")
                }
              </Button>

              <div className="text-center mt-4">
                <span className="text-gray-600">Already have an account?</span>{" "}
                <Link to="/login" className="text-market-600 hover:text-market-700 font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;
