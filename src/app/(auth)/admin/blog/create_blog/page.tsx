'use client';

import type React from 'react';

import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlog } from '@/hooks/blog/useBlog';
import type { CreateBlogItem } from '@/types/types';
import { CategoryList } from '@/lib/responses/categoriesLib';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Heading } from '@/components/design/Heading';
import { blogFormSchema } from '@/utils';
import { RichTextEditor } from '@/components/tiptap/rich-text-editor';

export default function NewBlogPost() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: createBlog } = useCreateBlog();
  const { categories, isLoading, isError } = CategoryList(
    1,
    { limit: 20, type: 'blogs' },
    0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof blogFormSchema>>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      content: '',
      description: '',
      category: '',
      status: 'draft',
    },
  });

  const onSubmit = async (
    values: z.infer<typeof blogFormSchema>,
    status: 'draft' | 'show'
  ) => {
    setIsSubmitting(true);
    try {
      // Create a blog item object matching the CreateBlogItem type
      const blogData: CreateBlogItem = {
        title: values.title,
        content: values.content,
        description: values.description,
        category: values.category,
        file: values.file as File,
        link: null,
        status: status,
      };

      createBlog(blogData, {
        onSuccess: () => {
          form.reset();
          router.push('/admin/blog');
        },
        onError: (error: any) => {
          console.error('Error creating blog:', error);
          form.setError('root', {
            type: 'manual',
            message:
              error.message || 'Failed to create blog. Please try again.',
          });
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      form.setError('root', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again.',
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(file);

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLDivElement>,
    onChange: (file: File) => void
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    onChange(file);

    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue('file', undefined);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <Heading name="Create Blog" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => onSubmit(values, 'show'))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a short content or summary"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear as a preview of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        initialContent={field.value}
                        onChange={(val) => field.onChange(val.html)}
                        className="w-full rounded-none cursor-text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isLoading
                                ? 'Loading categories...'
                                : 'Select a category'
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading categories...
                          </SelectItem>
                        ) : isError ? (
                          <SelectItem value="error" disabled>
                            Error loading categories
                          </SelectItem>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-categories" disabled>
                            No categories available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {isError && (
                      <p className="text-sm text-red-500 mt-1">
                        Failed to load categories
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 ${
                          imagePreview ? 'border-green-500' : 'border-gray-300'
                        } transition-colors duration-200 ease-in-out`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleImageDrop(e, onChange)}
                      >
                        {!imagePreview ? (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Upload className="h-10 w-10 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              Drag and drop an image here, or click to select
                            </p>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageChange(e, onChange)}
                              ref={fieldProps.ref}
                              name={fieldProps.name}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                document.getElementById('image-upload')?.click()
                              }
                            >
                              Select Image
                            </Button>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="relative h-48 w-full overflow-hidden rounded-md">
                              <Image
                                src={imagePreview || '/placeholder.svg'}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload an image (max 20MB). Supported formats: JPG, PNG,
                      WebP
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between gap-4 px-0">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const values = form.getValues();
                      onSubmit(values, 'draft');
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Đang Tạo...' : 'Tạo Bài Viết'}
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
