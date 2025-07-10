import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { Pen, Trash } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/design/Dialog';
import { useDeleteBlog } from '@/hooks/blog/useBlog';
import { useAuthStore } from '@/store/authStore';

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  file: string;
  createdAt: string | Date;
  content: string;
  user?: {
    username: string;
    role: string;
  };
}

interface PostCardProps {
  blog: Post;
}

export function BlogCard({ blog }: PostCardProps) {
  const userInfo = useAuthStore((state) => state.userInfo);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<string>();

  const { mutate: deleteBlog } = useDeleteBlog();

  const handleDeleteClick = (id: string) => {
    setSelectedBlog(id); // Chọn contact cần xóa
    setDeleteDialogOpen(true); // Mở dialog xác nhận xóa
  };

  const handleDeleteConfirm = () => {
    if (selectedBlog) {
      deleteBlog(selectedBlog);
      setSelectedBlog(undefined);
      setDeleteDialogOpen(false);
    }
  };
  return (
    <>
      <div className="border border-gray-200 overflow-hidden">
        <Link href={`/admin/blog/${blog.slug}`}>
          <div className="relative h-48">
            <Image
              src={blog.file || '/placeholder.svg'}
              alt={blog.title}
              fill
              className="object-cover"
            />

            {/* Status badge - right top */}
            <Badge className="absolute top-3 right-3 bg-gray-600 text-white text-md font-bold">
              {blog.status}
            </Badge>
          </div>
        </Link>
        <div className="p-4">
          <Link href={`/admin/service/${blog.slug}`}>
            <h3 className="font-semibold text-gray-800 mb-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{blog.content}</p>
          </Link>
          <div className="flex items-start justify-between w-full">
            {/* Avatar + Info */}
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {blog?.user?.username}
                </p>
                <p className="text-xs text-gray-500">
                  {formatSmartDate(blog.createdAt)}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            {userInfo?.role === 'admin' && (
              <div className="flex items-center gap-2">
                <button
                  // onClick={() => handleEdit(blog._id)}
                  className="bg-blue-100 border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-md p-1"
                >
                  <Pen className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(blog._id)}
                  className="bg-red-100 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-md p-1"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the blog."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
