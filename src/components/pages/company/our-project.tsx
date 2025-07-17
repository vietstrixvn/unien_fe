'use client';

import {
  LoadingSpin,
  SectionHeader,
  CustomImage,
  ErrorLoading,
  NoResultsFound,
} from '@/components';
import { ProjectList } from '@/lib';
import { truncateText } from '@/utils';

export default function OurProjects() {
  const prtams = {
    status: ['show', 'popular', 'draft'].join(','),
  };

  const { projects, isLoading, isError } = ProjectList(1, prtams, 0);

  return (
    <section className="py-16 px-4 mx-auto">
      <div className="text-center mb-16">
        <SectionHeader title="Các Dự Án Đã Thực Hiện" />
      </div>

      {isLoading ? (
        <LoadingSpin />
      ) : isError ? (
        <ErrorLoading />
      ) : projects.length === 0 ? (
        <NoResultsFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg h-full min-h-[500px]"
            >
              <div className="aspect-[16/9] relative w-full">
                <CustomImage
                  src={project.file || '/Logo.svg'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {truncateText(
                    project.content || 'Không có mô tả cho dự án này.',
                    300
                  )}
                </p>

                <p className="text-gray-600 mb-6 font-bold line-clamp-2">
                  {project.testimonial}
                </p>

                <div className="mt-auto text-sm text-gray-800 truncate">
                  {project.client} <span className="mx-1">-</span>{' '}
                  {project.brand_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
