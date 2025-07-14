// src/components/layout/DefaultLayout/index.tsx
import { ReactNode } from 'react';
import { Navbar } from './nav';
import { Footer } from './footer';
import { DefaultLayoutProps } from '@/types';

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative ">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
