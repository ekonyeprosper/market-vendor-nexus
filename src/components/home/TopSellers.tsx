
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Store, ArrowRight, ShoppingBag, AlertCircle, Wifi, WifiOff, MapPin, Clock, Award, TrendingUp } from "lucide-react";
import { useGetTopSellersQuery } from "@/services/api/userApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const TopSellers = () => {
  const { data, isLoading, error, refetch } = useGetTopSellersQuery(undefined);

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (!error) return 'An unknown error occurred';
    
    // Handle network errors
    if ('status' in error && error.status === 'FETCH_ERROR') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    // Handle other API errors
    if ('status' in error) {
      return `Error ${error.status}: ${error.data?.message || 'Something went wrong'}`;
    }

    return error.message || 'Something went wrong';
  };

  const getErrorIcon = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if ('status' in error && error.status === 'FETCH_ERROR') {
      return <WifiOff className="h-4 w-4" />;
    }
    return <AlertCircle className="h-4 w-4" />;
  };

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            {getErrorIcon(error)}
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>{getErrorMessage(error)}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="w-fit"
                >
                  Try Again
                </Button>
                {('status' in error && error.status === 'FETCH_ERROR') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                    className="w-fit"
                  >
                    Reload Page
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-market-100 to-blue-100 text-market-800 text-sm font-medium mb-6 shadow-sm">
              <Award className="h-4 w-4 mr-2 text-market-600" /> 
              <span className="font-semibold">Best Sellers</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Top Rated Vendors
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Shop with confidence from our most trusted and highly-rated sellers who consistently deliver exceptional products and outstanding customer service.
            </p>
          </div>
          <Link to="/vendors" className="mt-6 md:mt-0">
            <Button variant="outline" className="group border-market-200 hover:bg-market-50 hover:border-market-300 transition-all duration-300">
              <span className="font-medium">View All Vendors</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="bg-white overflow-hidden shadow-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center space-y-4 mb-6">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2 text-center">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.sellers.map((seller, index) => (
              <Link to={`/vendor/${seller.id}`} key={seller.id}>
                <Card className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full border-0 hover:border-market-200 group">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative mb-4">
                        <Avatar className="h-20 w-20 shadow-lg ring-4 ring-white">
                          <AvatarImage
                            src={seller.logo}
                            alt={seller.businessName}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gradient-to-br from-market-100 to-blue-100 text-market-700 text-xl font-bold">
                            <Store className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        {index < 3 && (
                          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 shadow-md">
                            #{index + 1}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-center space-y-2">
                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-market-600 transition-colors line-clamp-1">
                          {seller.businessName}
                        </h3>
                        
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(seller.rating.average) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : 'text-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-slate-700">
                            {seller.rating.average.toFixed(1)}
                          </span>
                          <span className="text-slate-500 text-sm">
                            ({seller.rating.count})
                          </span>
                        </div>

                        <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <ShoppingBag className="h-4 w-4 text-market-500" />
                            <span className="font-medium">{seller.totalProducts}</span>
                            <span>products</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 font-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span>Top Seller</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>Verified</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full bg-gradient-to-r from-market-50 to-blue-50 border-market-200 text-market-700 hover:from-market-100 hover:to-blue-100 hover:border-market-300 transition-all duration-300 font-medium group-hover:shadow-md"
                      >
                        <Store className="h-4 w-4 mr-2" />
                        Visit Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellers;
