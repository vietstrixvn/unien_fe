'use client';

import { ScrollToTopButton } from '@/components/button/scroll.button';
import { DefaultLayout } from '@/components/layout/DefaultLayout/DefaultLayout';
import { RadiatingLoader } from '@/components';
import React, { useState } from 'react';

export default function CustomerLayoutDefault({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <RadiatingLoader duration={2500} onComplete={() => setIsLoading(false)} />
    );
  }

  return (
    <div>
      <DefaultLayout>
        <div>{children}</div>
        <ScrollToTopButton />
      </DefaultLayout>
    </div>
  );
}
