import type { ReactNode } from 'react';
import type { AdmimnFilter } from './types';

export interface LoadingProps {
  size?: number;
  message?: string;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  design?: string;
}

export interface ProcessStepProps {
  title: string;
  startPosition: string;
  color: string;
  width: string;
  delay: number;
  row: 'top' | 'bottom';
  isVisible: boolean;
}

export interface ContactSectionProps {
  href: string;
  title: string;
}

export interface CardProps {
  type: string;
  _id: string;
  title: string;
  slug: string;
  content: string;
  file: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export type BackButtonProps = {
  href: string;
};

export interface NoResultsFoundProps {
  title?: string;
  message?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: string;
  description: string;
  onConfirm: () => void;
}

/**
 * ==========================
 * @PushButtonProps
 * ==========================
 */
export interface PushButtonProps {
  href: string;
  label: string;
}

export interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export interface DefaultLayoutProps {
  children: ReactNode;
}

export type VisibilityCategoryOption = 'show' | 'hide' | 'draft';

export interface VisibilitySelectProps {
  value: VisibilityCategoryOption;
  onChange: (value: VisibilityCategoryOption) => void;
}

export type AdminFilterProps = {
  filter: AdmimnFilter;
  onPageSizeChange?: (value: string) => void;
  handleRefresh?: () => void;
  onCategoryChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
};
