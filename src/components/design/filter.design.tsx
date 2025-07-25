'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  PushButton,
  RefreshButton,
  LoadingSpin,
} from '@/components';
import { CategoryList } from '@/lib';
import { useState, useMemo, useCallback, useRef } from 'react';
import type { AdminFilterProps } from '@/types';
import { Icons } from '@/assets/icons';

export function AdminFilter({
  filter,
  onPageSizeChange,
  handleRefresh,
  onCategoryChange,
  onStatusChange,
  onSearchChange,
}: AdminFilterProps) {
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('show');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const params = useMemo(
    () => ({
      limit: 10,
      type: filter.type,
    }),
    [filter.type]
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  const handleRefreshClick = useCallback(() => {
    setSelectedCategory('all');
    setSelectedStatus('show');
    setSearchValue('');

    handleRefresh?.();
  }, [handleRefresh]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onSearchChange?.(value);
      }, 500);
    },
    [onSearchChange]
  );

  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newSize = Number(value);
      setPageSize(newSize);
      onPageSizeChange?.(value);
    },
    [onPageSizeChange]
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-main/60 border-b">
      {/* Group các bộ lọc */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search.."
            className="pl-10 bg-white border-gray-200 w-full"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Refresh Button */}
        <div className="flex-shrink-0">
          <RefreshButton onClick={handleRefreshClick} />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 min-w-[150px]">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Thể Loại
          </span>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              onCategoryChange?.(value);
            }}
          >
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {isLoading && (
                <SelectItem value="loading" disabled>
                  <LoadingSpin />
                </SelectItem>
              )}
              {isError && (
                <SelectItem value="error" disabled>
                  Lỗi tải thể loại
                </SelectItem>
              )}
              {!isLoading &&
                !isError &&
                categories?.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Size */}
        <div className="flex items-center gap-2 min-w-[130px]">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Số Lượng:
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="40">40</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 min-w-[130px]">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Status:
          </span>
          <Select
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value);
              onStatusChange?.(value);
            }}
          >
            <SelectTrigger className="w-full bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="show">Hiện</SelectItem>
              <SelectItem value="hide">Ẩn</SelectItem>
              <SelectItem value="draft">Nháp</SelectItem>
              <SelectItem value="popular">Phổ Biến</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Push Button */}
      <div className="flex justify-end mt-4 md:mt-0">
        <PushButton href={filter.button.href} label={filter.button.title} />
      </div>
    </div>
  );
}
