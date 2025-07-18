'use client';

import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import RelatedPosts from '@/components/pages/blog/RelatedPosts';
import { formatSmartDate } from '@/utils/formatTimeAgo';
import { CodeBlockComponent } from '@/components/richText/ContentSection';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BackButton,
  Container,
  ContactSection,
  CustomImage,
  LoadingSpin,
  SEO,
  CopyLinkButton,
} from '@/components';
import { ROUTES, ServiceDetailData } from '@/lib';
import { Heading } from '@/components/design/Heading';
import { ServiceRecent } from '@/components/card/service_recent.card';
import DefaultBreadcrumb from '@/components/design/DefaultBreadCrumb';
import { FacebookShareButton } from '@/components/button/share.button';
import { SEOHead } from '@/components/design/SEOHead';
import { siteBaseUrl } from '@/constant/appInfos';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { service, isLoading, isError } = ServiceDetailData(blogSlug, 0);

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
      <SEOHead
        title={service.title || ''}
        description={service.description || ''}
        image={service.file || '/Logo.svg'}
        url={`${siteBaseUrl}/services/${service.slug}`}
      />

      <Container className="mt-26">
        <BackButton href="/services" />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <header className="mb-8">
              <div className="mb-6">
                <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                  {service?.title}
                </h1>
                <DefaultBreadcrumb />
              </div>
              <div className="flex justify-between">
                <div className="mb-2 sm:mb-0 flex flex-wrap items-center gap-1 text-sm text-gray-600">
                  <span>Unien</span>
                  <span>-</span>
                  <span>
                    {service?.createdAt
                      ? formatSmartDate(service.createdAt)
                      : 'No date available'}
                  </span>
                  <span>-</span>
                  <span>{service?.category?.name}</span>
                </div>

                <div className="flex">
                  <CopyLinkButton />
                  <FacebookShareButton />
                </div>
              </div>
            </header>

            <div className="mb-8  relative h-[400px] w-full overflow-hidden">
              <CustomImage
                src={service?.file || '/Logo.svg'}
                alt={`Featured image for ${service?.title}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mt-12 mb-6">
                {service?.content}
              </h2>

              <div className="leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    blockquote: ({ children }) => (
                      <blockquote className="custom-blockquote">
                        {children}
                      </blockquote>
                    ),
                    code: ({ inline, className, children, ...props }: any) => {
                      const match = /language-(\w+)/.exec(className || '');

                      if (!inline) {
                        return (
                          <CodeBlockComponent
                            value={String(children).replace(/\n$/, '')}
                            language={match ? match[1] : undefined}
                          />
                        );
                      }

                      return (
                        <code className="inline-code" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {service?.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 p-6 lg:sticky lg:top-24 h-fit">
            <div>
              <div className=" mb-4">
                <Heading name="Dịch Vụ Liên Quan" />
              </div>
              <ServiceRecent category={service?.category?._id} />
            </div>
            <div className="pt-10">
              <div className=" mb-4">
                <Heading name="Dịch Vụ Mới Nhất" />
              </div>
              <ServiceRecent />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ContactSection href={ROUTES.BLOG.ROOT} title="Bài Viết" />
          <RelatedPosts />
        </div>
      </Container>
    </>
  );
}
