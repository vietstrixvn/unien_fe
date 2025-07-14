'use client';

import { NoResultsFound } from '@/components/design/NoResultsFound';
import { ServiceList } from '@/lib/responses/serviceLib';
import { ServiceCard } from './ServiceCard';
import { useState, useCallback, useMemo } from 'react';
import { CustomPagination } from '@/components/design/pagination';
import { Container } from '@/components/wrappers/Container';
import { AdminFilter } from '@/components/design/filter.design';
import { LoadingSpin } from '@/components/loading/loading';

export default function ServiceListDataAdmin() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const params = useMemo(
    () => ({
      ...(selectedStatus !== 'all' && { status: selectedStatus }),
      category: selectedCategory ?? undefined,
      page_size: pageSize,
    }),
    [selectedStatus, selectedCategory, pageSize]
  );

  // Memoize filter config
  const filter = useMemo(
    () => ({
      button: {
        href: '/admin/service/create-service',
        title: 'Tạo Dịch Vụ',
      },
      values: 'vll',
      type: 'services',
    }),
    []
  );

  const { services, isLoading, isError, pagination } = ServiceList(
    currentPage,
    params,
    refreshKey
  );

  // Optimize callbacks với useCallback
  const handlePageSizeChange = useCallback((value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= pagination?.total_page) {
        setCurrentPage(page);
      }
    },
    [pagination?.total_page]
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1); // Chỉ gọi 1 lần
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value === 'all' ? null : value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  return (
    <Container>
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
              {services && services.length > 0 ? (
                services.map((post) => (
                  <ServiceCard key={post._id} post={post} />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center py-24">
                  <NoResultsFound />
                </div>
              )}
            </div>

            {pagination && (
              <CustomPagination
                currentPage={currentPage}
                totalPage={pagination.total_page}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </>
      )}
    </Container>
  );
}
