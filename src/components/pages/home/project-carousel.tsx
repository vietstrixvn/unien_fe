'use client';

import {
  ErrorLoading,
  LoadingSpin,
  SectionHeader,
  Tabs,
  TabsContent,
  MoreButton,
  NoResultsFound,
  CustomImage,
} from '@/components';
import { ProjectList } from '@/lib';
import type { ProjectListData } from '@/types';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import { truncateText } from '@/utils';

export function ProjectCarousel() {
  const prams = {
    limit: 3,
  };

  const { projects, isLoading, isError } = ProjectList(1, prams, 0);

  return (
    <div className="mx-auto px-4 py-12">
      <Tabs defaultValue="services" className="space-y-8">
        <TabsContent value="services" className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader title="Các Dự Án Tiêu Biểu" />
              <MoreButton href={ROUTES.PROJECT.ROOT} />
            </div>
          </div>
          {isLoading ? (
            <LoadingSpin message="Đang tải dịch vụ..." />
          ) : isError ? (
            <ErrorLoading message="Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." />
          ) : projects.length === 0 ? (
            <NoResultsFound />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ServiceCard({ service }: { service: ProjectListData }) {
  return (
    <Link
      href={ROUTES.PROJECT.DETAIL(service.slug)}
      className="group relative overflow-hidden lg:aspect-[3/2]"
    >
      <CustomImage
        src={service.file}
        alt={service.title}
        fill
        className="object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/50" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-4">
          {service.title}
        </h3>
        {service.description && (
          <p className="mt-2 text-sm text-white/90 opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3">
            {truncateText(service.content, 300)}
          </p>
        )}
      </div>
    </Link>
  );
}
