'use client';
import { ServiceList } from '@/lib';
import servicesData from '@/data/service.data.json';
import { ROUTES } from '@/lib';
import {
  ErrorLoading,
  LoadingSpin,
  PostCard,
  SectionHeader,
  Tabs,
  TabsContent,
} from '@/components';
import { MoreButton } from '@/components/button/more.button';
import { NoResultsFound } from '@/components/design/NoResultsFound';

export function ServicesTabs() {
  const { services, isLoading, isError } = ServiceList(
    1,
    {
      limit: 6,
    },
    0
  );

  return (
    <div className="mx-auto px-4 py-12">
      <Tabs defaultValue="services" className="space-y-8">
        <TabsContent value="services" className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader title={servicesData.ServiceData.title} />
              <MoreButton href={ROUTES.SERVICE.ROOT} />
            </div>
            <p className="mt-4 text-lg text-muted-foreground">
              {servicesData.ServiceData.description}
            </p>
          </div>
          {isLoading ? (
            <LoadingSpin message="Đang tải dịch vụ..." />
          ) : isError ? (
            <ErrorLoading message="Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." />
          ) : services.length === 0 ? (
            <NoResultsFound />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <PostCard
                  key={service.title}
                  _id={service._id}
                  title={service.title}
                  slug={service.slug}
                  content={service.content}
                  file={service.file}
                  type="service"
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
