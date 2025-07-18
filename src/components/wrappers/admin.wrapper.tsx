import type { ContainerProps } from '@/types';

export function AdminContainer({ children, className }: ContainerProps) {
  return (
    <main className={`w-full mx-auto container ${className}`}>{children}</main>
  );
}
