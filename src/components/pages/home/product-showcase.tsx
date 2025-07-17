'use client';

import { useEffect, useState } from 'react';
import {
  CategoryCard,
  ErrorLoading,
  LoadingSpin,
  SectionHeader,
} from '@/components';
import { ProductList } from '@/lib/responses/productLib';
import ProductCard from '../product/product-card';
import { MoreButton } from '@/components/button/more.button';
import { ROUTES } from '@/lib';
import { NoResultsFound } from '@/components/design/NoResultsFound';

export function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const params = {
    category: selectedCategory ?? undefined,
    limit: 16,
  };

  const { products, isLoading, isError } = ProductList(1, params, refreshKey);

  useEffect(() => {
    setRefreshKey((prev) => prev + 1);
  }, [selectedCategory]);

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title="Các Sản Phẩm Nổi Bật" />
        <MoreButton href={ROUTES.PRODUCT.ROOT} />
      </div>
      <div className="mx-auto">
        <CategoryCard onCategorySelect={setSelectedCategory} type="products" />
      </div>
      {isLoading ? (
        <LoadingSpin message="Đang tải dịch vụ..." />
      ) : isError ? (
        <ErrorLoading message="Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." />
      ) : products.length === 0 ? (
        <NoResultsFound />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
