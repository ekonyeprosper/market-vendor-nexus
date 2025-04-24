
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports & Outdoor",
  "Books",
  "Beauty & Health",
  "Toys & Games",
];

const ProductUploadForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Here you would typically handle the form submission
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" placeholder="Enter product name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input 
              id="price" 
              type="number" 
              min="0.01" 
              step="0.01" 
              placeholder="0.00" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter product description"
              className="min-h-[100px]"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Product Images</Label>
            <Input 
              id="image" 
              type="file" 
              accept="image/*" 
              multiple 
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              You can upload multiple images. First image will be the main product image.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inventory">Initial Inventory</Label>
            <Input 
              id="inventory" 
              type="number" 
              min="0" 
              placeholder="Enter initial stock quantity"
              required 
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Upload Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductUploadForm;

