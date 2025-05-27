import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCategoryMutation } from "@/services/api/categoriesApi";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  order: z.number().min(0),
  image: z.any().optional(),
});

interface NewCategoryFormProps {
  onSuccess: () => void;
}

const NewCategoryForm = ({ onSuccess }: NewCategoryFormProps) => {
  const [createCategory] = useCreateCategoryMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      order: 0,
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('order', values.order.toString());
      if (values.image?.[0]) {
        formData.append('image', values.image[0]);
      }

      await createCategory(formData).unwrap();
      form.reset();
      setImagePreview(null);
      onSuccess();
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('image', e.target.files);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1 -mx-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-1">
            {/* Form fields container */}
            <div className="space-y-4">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        className="min-h-[100px] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Order field */}
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem className="max-w-[200px]">
                    <FormLabel className="text-base">Display Order</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        className="h-10"
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel className="text-base">Category Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="h-10"
                          {...field}
                        />
                        {imagePreview ? (
                          <div className="relative w-full h-[200px] sm:h-[250px] rounded-lg overflow-hidden">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="object-contain w-full h-full"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                setImagePreview(null);
                                form.setValue('image', undefined);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
                            <Image className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                              Upload a category image
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t mt-6">
            <Button type="submit" className="w-full sm:w-auto min-w-[200px]">
              Create Category
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewCategoryForm;
