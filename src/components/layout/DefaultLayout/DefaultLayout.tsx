// src/components/layout/DefaultLayout/index.tsx
import { Navbar } from './nav';
import { Footer } from './footer';
import type { DefaultLayoutProps } from '@/types';

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative ">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
