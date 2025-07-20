'use client';

import { BlogDetailData } from '@/lib/responses/blogLib';
import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import {
  BackButton,
  Container,
  ContactSection,
  CustomImage,
  LoadingSpin,
  SEO,
  CopyLinkButton,
} from '@/components';
import { ROUTES } from '@/lib';
import { Heading } from '@/components/design/Heading';
import { PostRecent } from '@/components/card/post_recent.card';
import DefaultBreadcrumb from '@/components/design/DefaultBreadCrumb';
import { FacebookShareButton } from '@/components/button/share.button';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { blog, isLoading, isError } = BlogDetailData(blogSlug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <>
      <SEO
        title={blog?.title || 'Bài Viết'}
        description={blog?.content || ''}
        image={blog?.file || '/Logo.svg'}
      />

      <Container className="mt-26">
        <BackButton href="/blogs" />

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <header className="mb-8">
              <div className="mb-6">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                  {blog?.title}
                </h1>
                <DefaultBreadcrumb />
              </div>
              <div className="flex justify-between">
                <div className="mb-2 sm:mb-0 flex flex-wrap items-center gap-1 text-sm text-gray-600">
                  <span>Unien</span>
                  <span>-</span>
                  <span>
                    {blog?.createdAt
                      ? formatSmartDate(blog.createdAt)
                      : 'No date available'}
                  </span>
                  <span>-</span>
                  <span>{blog?.category?.name}</span>
                </div>

                <div className="flex">
                  <CopyLinkButton />
                  <FacebookShareButton />
                </div>
              </div>
            </header>

            <div className="mb-8  relative h-[400px] w-full overflow-hidden">
              <CustomImage
                src={blog?.file || '/Logo.svg'}
                alt={`Featured image for ${blog?.title}`}
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl mt-12 mb-6">{blog?.content}</h2>

            <div
              className="rich-text-content mt-4"
              dangerouslySetInnerHTML={{
                __html: blog.content ?? '',
              }}
            />
          </div>
          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <div>
              <div className=" mb-4">
                <Heading name="Bài Viết Liên Quan" />
              </div>
              <PostRecent category={blog?.category?._id} />
            </div>
            <div className="pt-10">
              <div className=" mb-4">
                <Heading name="Bài Viết Mới Nhất" />
              </div>
              <PostRecent />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ContactSection href={ROUTES.BLOG.ROOT} title="Bài Viết" />
        </div>
      </Container>
    </>
  );
}
