'use client';

import { useCallback, useMemo, useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogList } from '@/lib';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { Container, LoadingSpin } from '@/components';
import { CustomPagination } from '@/components/design/pagination';
import { AdminFilter } from '@/components/design/filter.design';

export default function BlogListData() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const params = useMemo(
    () => ({
      ...(selectedStatus !== 'all' && { status: selectedStatus }),
      category: selectedCategory ?? undefined,
      page_size: pageSize,
    }),
    [selectedStatus, selectedCategory, pageSize]
  );

  // Lấy danh sách blogs
  const { blogs, isLoading, isError, pagination } = BlogList(
    currentPage,
    params,
    refreshKey
  );

  const filter = useMemo(
    () => ({
      button: {
        href: '/admin/blog/create-blog',
        title: 'Tạo Dịch Vụ',
      },
      values: 'vll',
      type: 'blogs',
    }),
    []
  );

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value === 'all' ? null : value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Container className="mx-auto">
        {isLoading ? (
          <LoadingSpin />
        ) : isError ? (
          <NoResultsFound />
        ) : (
          <>
            <AdminFilter
              filter={filter}
              handleRefresh={handleRefresh}
              onPageSizeChange={handlePageSizeChange}
              onCategoryChange={handleCategoryChange}
              onStatusChange={handleStatusChange}
            />

            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
                ) : (
                  <div className="col-span-full flex items-center justify-center py-24">
                    <NoResultsFound />
                  </div>
                )}
              </div>
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination.total_page}
                onPageChange={handlePageChange}
              />
            </section>
          </>
        )}
      </Container>
    </main>
  );
}
