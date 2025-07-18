'use client';

import { Container } from '@/components/wrappers/Container';
import {
  HeroHeader,
  SEO,
  ContactSection,
  ContactComponent,
  CategoryCard,
  LoadingSpin,
  ErrorLoading,
} from '@/components';
import React, { useCallback, useState } from 'react';
import blogData from '@/data/blog.data.json';
import { BlogList } from '@/lib/responses/blogLib';
import { BlogListSection } from '@/components/pages/blog/BlogListSection';
import { useMemo } from 'react';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const params = useMemo(
    () => ({
      category: selectedCategory ?? undefined,
      limit: 10,
    }),
    [selectedCategory]
  );

  const { blogs, isLoading, isError, pagination } = BlogList(
    currentPage,
    params,
    refreshKey
  );

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      if (nextPage <= pagination.total_page) {
        setCurrentPage(nextPage);
        setAllLoaded(nextPage >= pagination.total_page);
      }
      setLoading(false);
    }, 1500);
  };

  const handleCategorySelect = useCallback(
    (categoryId: string | null, categoryName?: string) => {
      setSelectedCategory(categoryId);
      setCurrentPage(1);
      setAllLoaded(false);
      setRefreshKey((prev) => prev + 1);
    },
    []
  );

  return (
    <>
      <SEO
        title={blogData.BlogData.title}
        description={blogData.BlogData.description}
      />
      <main>
        <HeroHeader
          title={blogData.BlogData.title}
          description={blogData.BlogData.description}
        />

        <Container className="mx-auto px-4 py-12">
          <div className="mb-8">
            <CategoryCard
              onCategorySelect={handleCategorySelect}
              type="blogs"
              selectedCategory={selectedCategory}
            />
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpin />
              </div>
            ) : isError ? (
              <ErrorLoading />
            ) : (
              <BlogListSection
                blogs={blogs}
                pagination={pagination}
                loading={loading}
                handleLoadMore={handleLoadMore}
                allLoaded={allLoaded}
              />
            )}
          </div>
          <ContactSection title="Dịch Vụ" href="/services" />
          <ContactComponent />
        </Container>
      </main>
    </>
  );
};

export default Page;
