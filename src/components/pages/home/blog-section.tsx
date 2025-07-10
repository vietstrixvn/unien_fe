'use client';

import Link from 'next/link';
import {
  ErrorLoading,
  LoadingSpin,
  PostCard,
  SectionHeader,
} from '@/components';
import { BlogList } from '@/lib/responses/blogLib';
import { Container } from '@/components/wrappers/Container';
import { ROUTES } from '@/lib';
import { MoreButton } from '@/components/button/more.button';

export function BlogSection() {
  const { blogs, isLoading, isError } = BlogList(
    1,
    {
      limit: 3,
    },
    0
  );

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8">
      <Container className="mx-auto">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader title="Các Bài Viết Mới Nhất" />
          <MoreButton href={ROUTES.BLOG.ROOT} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <LoadingSpin />
          ) : isError ? (
            <ErrorLoading />
          ) : (
            blogs.map((post) => (
              <PostCard
                type="blog"
                key={post._id}
                _id={post._id}
                title={post.title}
                slug={post.slug}
                content={post.content}
                file={post.file}
              />
            ))
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blogs"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Xem Thêm →
          </Link>
        </div>
      </Container>
    </section>
  );
}
