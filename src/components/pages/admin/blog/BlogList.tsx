'use client';

import { useCallback, useMemo, useState } from 'react';
import { BlogList } from '@/lib';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { Container, LoadingSpin } from '@/components';
import { CustomPagination } from '@/components/design/pagination';
import { AdminFilter } from '@/components/design/filter.design';
import { BlogTable } from '@/components/table/blog.table';

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
        href: '/admin/blog/create_blog',
        title: 'Tạo Bài Viết',
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
            <BlogTable blogs={blogs} isLoading={isLoading} isError={isError} />
            <CustomPagination
              currentPage={currentPage}
              totalPage={pagination.total_page}
              onPageChange={handlePageChange}
            />
          </section>
        </>
      )}
    </Container>
  );
}
