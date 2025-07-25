'use client';

import { useParams } from 'next/navigation';
import { BackButton } from '@/components/button/back.button';
import { BlogDetailData } from '@/lib';
import { CustomImage, LoadingSpin } from '@/components';
import { NoResultsFound } from '@/components/design/NoResultsFound';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { blog, isLoading, isError } = BlogDetailData(blogSlug, 0);

  // Kiểm tra nếu blog là undefined
  if (isLoading) return <LoadingSpin />;
  if (isError || !blog) return <NoResultsFound />;

  return (
    <>
      <div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <BackButton href="/admin/blog" />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>
            <p className="text-gray-600 mb-6">{blog.category?.name}</p>

            <p className="text-gray-600 mb-6">{blog?.content}</p>
          </div>
          <div className="mb-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="aspect-video relative">
              <CustomImage
                src={blog.file || '/placeholder.svg?height=400&width=800'}
                alt="Blog feature image"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* <div className="space-y-6 mb-12">
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
              {blog.description}
            </ReactMarkdown>
          </div> */}
        </div>
      </div>
    </>
  );
}
