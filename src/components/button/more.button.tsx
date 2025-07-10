'use client';

import { Icons } from '@/assetts/icons';
import Link from 'next/link';
import React from 'react';

export const MoreButton = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className="text-base text-gray-500 hover:text-gray-700 flex items-center"
    >
      Xem Thêm
      <Icons.ChevronRight className="ml-1 h-4 w-4" />
    </Link>
  );
};
