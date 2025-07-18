'use client';

import { CategoryList } from '@/lib/responses/categoriesLib';
import type { CategoryCardProps } from '@/types';
import type { Category } from '@/types';
import React, { useMemo, useCallback } from 'react';

export const CategoryCard: React.FC<CategoryCardProps> = ({
  onCategorySelect,
  type,
  selectedCategory = null,
}) => {
  const params = useMemo(
    () => ({
      limit: 20,
      type: type,
      status: 'show',
    }),
    [type]
  );

  const { categories, isLoading, isError } = CategoryList(1, params, 0);

  // Update để truyền cả categoryName
  const handleCategoryClick = useCallback(
    (categoryId: string | null, categoryName?: string) => {
      if (onCategorySelect) {
        onCategorySelect(categoryId, categoryName);
      }
    },
    [onCategorySelect]
  );

  // Memoize skeleton loading để tránh re-render
  const skeletonItems = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-6 w-24 bg-gray-300 animate-pulse rounded-md flex-shrink-0"
        />
      )),
    []
  );

  // Memoize category buttons
  const categoryButtons = useMemo(() => {
    if (!categories || categories.length === 0) return null;

    return categories.map((category: Category) => (
      <button
        key={category._id}
        onClick={() => handleCategoryClick(category._id, category.name)}
        className={`pb-4 px-1 whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
          selectedCategory === category._id
            ? 'text-main border-b-2 border-primary font-bold'
            : 'text-gray-700 font-bold hover:text-main'
        }`}
        aria-pressed={selectedCategory === category._id}
      >
        {category.name}
      </button>
    ));
  }, [categories, selectedCategory, handleCategoryClick]);

  return (
    <nav
      className="flex overflow-x-auto pb-4 space-x-8 scrollbar-hide"
      aria-label="Category navigation"
    >
      {isLoading ? (
        skeletonItems
      ) : isError ? (
        <p className="text-red-500 text-sm" role="alert">
          Failed to load categories.
        </p>
      ) : (
        <>
          {/* View all button */}
          <button
            onClick={() => handleCategoryClick(null)}
            className={`pb-4 px-1 font-medium whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
              selectedCategory === null
                ? 'text-main font-bold border-b-2 border-primary'
                : 'text-gray-600 hover:text-main'
            }`}
            aria-pressed={selectedCategory === null}
          >
            Tất cả
          </button>

          {/* Category buttons */}
          {categoryButtons}
        </>
      )}
    </nav>
  );
};
