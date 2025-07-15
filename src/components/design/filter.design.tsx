'use client';

import { Search, Filter } from 'lucide-react';
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

interface Filter {
  button: {
    href: string;
    title: string;
  };
  values: string;
  type: string;
}

type AdminFilterProps = {
  filter: Filter;
  onPageSizeChange?: (value: string) => void;
  handleRefresh?: () => void;
  onCategoryChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
};

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
  const [selectedSort, setSelectedSort] = useState('price');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize params để tránh re-render không cần thiết
  const params = useMemo(
    () => ({
      limit: 10,
      type: filter.type,
    }),
    [filter.type]
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  // Handler cho refresh button
  const handleRefreshClick = useCallback(() => {
    // Reset tất cả filters về giá trị mặc định
    setSelectedCategory('all');
    setSelectedStatus('show');
    setSelectedSort('price');
    setSearchValue('');

    handleRefresh?.();
  }, [handleRefresh]);

  // Debounce search để tránh gọi API quá nhiều
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onSearchChange?.(value);
      }, 500); // Delay 500ms
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
    <div className="flex items-center justify-between p-4 bg-main/60 border-b">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search.."
            className="pl-10 bg-white border-gray-200"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <RefreshButton onClick={handleRefreshClick} />

        <div className="flex items-center gap-2">
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
            <SelectTrigger className="w-32 bg-white border-gray-200">
              <SelectValue placeholder="Chọn thể loại" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>

              {/* Loading state */}
              {isLoading && (
                <SelectItem value="loading" disabled>
                  <LoadingSpin />
                </SelectItem>
              )}

              {/* Error state */}
              {isError && (
                <SelectItem value="error" disabled>
                  Lỗi tải thể loại
                </SelectItem>
              )}

              {/* List từ API */}
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

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Số Lượng:
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-32 bg-white border-gray-200">
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
        <div className="flex items-center gap-2">
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
            <SelectTrigger className="w-32 bg-white border-gray-200">
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

        {/* Sort By Filter */}
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Sort by:
          </span>
          <Select value={selectedSort}>
            <SelectTrigger className="w-20 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <PushButton href={filter.button.href} label={filter.button.title} />
    </div>
  );
}
