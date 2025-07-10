'use client';

import {
  ErrorLoading,
  LoadingSpin,
  SectionHeader,
  Tabs,
  TabsContent,
} from '@/components';
import { ProjectList } from '@/lib/responses/projectLib';
import { ProjectListData } from '@/types';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import { MoreButton } from '@/components/button/more.button';

export default function ProjectCarousel() {
  const { projects, isLoading, isError } = ProjectList(1, { limit: 3 }, 0);

  return (
    <div className="mx-auto px-4 py-12">
      <Tabs defaultValue="services" className="space-y-8">
        <TabsContent value="services" className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <SectionHeader
                title="Các Dự Án
Tiêu Biểu"
              />
              <MoreButton href="/company/project" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <LoadingSpin message="Đang tải dịch vụ..." />
            ) : isError ? (
              <ErrorLoading message="Không thể tải dữ liệu dịch vụ. Vui lòng thử lại sau." />
            ) : (
              projects.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ServiceCard({ service }: { service: ProjectListData }) {
  return (
    <Link
      href={service.slug}
      className="group relative overflow-hidden lg:aspect-[3/2]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
        style={{ backgroundImage: `url(${service.file})` }}
      />
      <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/50" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-semibold text-white transition-transform duration-500 group-hover:-translate-y-4">
          {service.title}
        </h3>
        {service.description && (
          <p className="mt-2 text-sm text-white/90 opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            {service.description}
          </p>
        )}
      </div>
    </Link>
  );
}
