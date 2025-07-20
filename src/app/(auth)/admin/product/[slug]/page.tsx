'use client';

import { useParams } from 'next/navigation';
import { NoResultsFound } from '@/components/design/NoResultsFound';
import { Container } from '@/components/wrappers/Container';
import { formatDistanceToNow, format, differenceInHours } from 'date-fns';
import { ServiceDetailData } from '@/lib/responses/serviceLib';
import { BackButton } from '@/components/button/back.button';
import { CustomImage } from '@/components';

export default function Page() {
  const { slug } = useParams();
  const blogSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { service, isLoading, isError } = ServiceDetailData(blogSlug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
    <Container className="mt-18">
      <article className="mx-auto max-w-7xl">
        <BackButton href="/product" />
        <header className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            {service?.title}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-between text-sm text-gray-600 mb-8">
            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED BY
              </span>
              <p>HUST4L</p>
            </div>

            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                PRICE
              </span>
              <p className="font-bold text-lime-500 text-xl">
                {service?.price}
              </p>
            </div>

            <div className="mb-2 sm:mb-0">
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                VIEWS
              </span>
              {/* <p className="font-bold text-lime-500 text-xl">
                {service?.views}
              </p> */}
            </div>

            <div>
              <span className="uppercase text-xs font-semibold tracking-wider text-gray-500">
                POSTED ON
              </span>
              <p>
                {(() => {
                  if (!service?.createdAt) return '-';

                  const date = new Date(service.createdAt);
                  if (isNaN(date.getTime())) return '-';

                  const hoursAgo = differenceInHours(new Date(), date);

                  if (hoursAgo < 1) {
                    return formatDistanceToNow(date, { addSuffix: true });
                  } else if (hoursAgo < 24) {
                    return `${hoursAgo}h ago`;
                  } else {
                    return format(date, 'yyyy/MM/dd');
                  }
                })()}
              </p>
            </div>
          </div>
        </header>

        <div className="mb-8 rounded-lg overflow-hidden">
          <CustomImage
            src={service?.file || 'Logo.svg'}
            alt={`Featured image for ${service?.title}`}
            width={800}
            height={400}
            className="w-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mt-12 mb-6">{service?.content}</h2>
        </div>
      </article>
    </Container>
  );
}
