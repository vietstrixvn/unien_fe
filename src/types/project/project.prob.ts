import type { ProjectListData } from '../types';

export interface ProjectTableProps {
  projects: ProjectListData[];
  isLoading: boolean;
  isError: boolean;
}
