
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, MapPin, Building, FileText, Shield, CheckCircle, XCircle } from "lucide-react";
import { User as UserType } from "@/services/types/auth.types";

interface UserDetailsDialogProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailsDialog = ({ user, isOpen, onClose }: UserDetailsDialogProps) => {
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-gray-100 text-gray-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 text-purple-800";
      case "seller": return "bg-blue-100 text-blue-800";
      case "customer": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            User Details - {user.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{user.phoneNumber}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">Role</p>
                <Badge className={getRoleColor(user.role)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Email Verification</p>
                <div className="flex items-center gap-2">
                  {user.isVerified ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <Badge className="bg-red-100 text-red-800">Pending</Badge>
                    </>
                  )}
                </div>
              </div>

              {user.role === 'seller' && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Admin Verification</p>
                  <div className="flex items-center gap-2">
                    {user.adminVerified ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-yellow-500" />
                        <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 mb-2">Last Updated</p>
                <p className="font-medium">{new Date(user.updatedAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Business Information (for sellers) */}
          {user.role === 'seller' && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.businessName && (
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Business Name</p>
                      <p className="font-medium">{user.businessName}</p>
                    </div>
                  </div>
                )}

                {user.businessAddress && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Business Address</p>
                      <p className="font-medium">{user.businessAddress}</p>
                    </div>
                  </div>
                )}

                {user.governmentId && (
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Government ID</p>
                      <p className="font-medium">{user.governmentId}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Account ID */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded">{user._id || user.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
