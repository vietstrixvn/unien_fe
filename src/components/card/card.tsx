'use client';

import type { CardProps } from '@/types';
import Link from 'next/link';
import { CustomImage } from '../design/image.component';
import { Arrows } from '@/assets/icons';
import { truncateText } from '@/utils';

export function PostCard({ _id, title, slug, content, file, type }: CardProps) {
  const href = type === 'service' ? `/services/${slug}` : `/blogs/${slug}`;

  return (
    <article
      key={_id}
      className="overflow-hidden shadow-lg hover:shadow-md transition-shadow duration-300 hover:bg-main group hover:text-white"
    >
      <Link href={href} className="block">
        <div className="relative overflow-hidden">
          <div className="w-full h-64 bg-gray-200 relative">
            <CustomImage
              src={file}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </Link>

      <div className="p-5 flex items-center justify-between gap-4">
        <Link href={href} className="flex-1">
          <h3 className="text-sm md:text-base lg:text-lg font-bold mt-2 mb-3">
            {title}
          </h3>
          <p className="text-gray-800 text-sm line-clamp-3">
            {truncateText(content, 300)}
          </p>
        </Link>

        <Link
          href={href}
          className="w-10 h-10 bg-white text-main rounded-full shadow-md flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shrink-0"
          aria-label="Xem thêm"
        >
          <Arrows.ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
