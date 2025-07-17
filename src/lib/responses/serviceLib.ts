'use client';

import { useServiceDetail, useServiceList } from '@/hooks/service/useService';
import type { Filters } from '@/types';
import type { ServiceDetail } from '@/types/types';

export const ServiceList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useServiceList(
    currentPage,
    filters,
    refreshKey
  );

  // Đảm bảo có giá trị mặc định cho pagination
  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  // Lấy danh sách tài liệu (docs) từ API
  const services = data?.results ?? [];

  return {
    services,
    isLoading,
    isError,
    pagination,
  };
};

// ServiceDetailData.ts
export const ServiceDetailData = (slug: string, refreshKey: number) => {
  const { data, isLoading, isError } = useServiceDetail(slug, refreshKey);

  const service = data ?? ({} as Partial<ServiceDetail>);

  return {
    service,
    isLoading,
    isError,
  };
};
