'use client';

import type { Filters } from '@/types';
import { useContactList } from '@/hooks/contact/useContact';
import { logDebug } from '@/utils/logger';

// ContactList.ts
export const ContactList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useContactList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const contacts = data?.results ?? [];
  logDebug('🐞 Data:', contacts);
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};
