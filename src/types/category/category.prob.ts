import type { Category } from './category.type';

export interface CategoryCardProps {
  onCategorySelect?: (categoryId: string | null) => void;
  type: string;
}

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
