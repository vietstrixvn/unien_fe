'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
  NoResultsFound,
  LoadingSpin,
  ErrorLoading,
} from '@/components';
import { useRouter } from 'next/navigation';
import { Icons } from '@/assets/icons';
import React, { useState } from 'react';
import { useDeleteService, useUpdateProjectStatus } from '@/hooks';
import { ConfirmDialog } from '../design/Dialog';
import { ProjectColumns } from '@/types/project/project.colum';
import type { ProjectTableProps } from '@/types/project/project.prob';
import { statusColorMap } from './blog.table';
import { useAuthStore } from '@/store/authStore';
import { SelectStatus } from '../design/status.change';
import { toast } from 'sonner';
import type { VisibilityCategoryOption } from '@/types';
import { truncateText } from '@/utils';

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  isLoading,
  isError,
}) => {
  const userInfo = useAuthStore((state) => state.userInfo);

  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const { mutate: deleteService } = useDeleteService();
  const { mutate: updateStatus } = useUpdateProjectStatus();

  // Hàm cập nhật trạng thái
  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ postId, updateStatus: { status: newStatus } });
  };

  const handleDeleteClick = (id: string) => {
    setSelectedService(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedService) {
      deleteService(selectedService);
      setSelectedService(undefined);
      setDeleteDialogOpen(false);
    }
  };

  const handleViewDetail = (slug: string) => {
    router.push(`/admin/service/${slug}`);
  };

  return (
    <>
      <div className="w-full mx-auto ">
        <div className="border overflow-hidden">
          <Table>
            <TableHeader className="bg-main/60">
              <TableRow>
                {ProjectColumns.map((col) => (
                  <TableHead key={col.key} className={col.className}>
                    {col.label}
                  </TableHead>
                ))}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={ProjectColumns.length + 1}>
                    <LoadingSpin />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={ProjectColumns.length + 1}>
                    <ErrorLoading />
                  </TableCell>
                </TableRow>
              ) : projects && projects.length > 0 ? (
                projects.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <TableRow key={item._id} className="border-b">
                      <TableCell className="font-medium">{index + 1}</TableCell>

                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        {userInfo?.role === 'admin' ? (
                          <SelectStatus
                            value={item.status as VisibilityCategoryOption}
                            onChange={(newStatus) =>
                              handleStatusChange(item._id, newStatus)
                            }
                          />
                        ) : (
                          <Badge
                            variant="secondary"
                            className={
                              statusColorMap[item.status] ||
                              'bg-gray-100 text-gray-800'
                            }
                          >
                            {item.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.client}</TableCell>

                      <TableCell>
                        <div className="flex flex-wrap items-center gap-2">
                          {item.service.map((srv) => (
                            <span
                              key={srv._id}
                              className="px-2 py-1 bg-gray-100 rounded-md text-sm"
                            >
                              {srv.title}
                            </span>
                          ))}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                          onClick={() => handleViewDetail(item.slug)}
                        >
                          <Icons.Eye className="w-4 h-4" />
                          Chi tiết
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          <Icons.Trash className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={`${item._id}-details`}
                      className="bg-gray-50/50 border-b"
                    >
                      <TableCell colSpan={8}>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 py-2">
                          <div>
                            <div className="font-medium text-gray-500 mb-1">
                              Mô tả ngắn
                            </div>
                            <div className="flex items-start gap-1">
                              <div className="w-2 h-2 mt-1 bg-gray-400 rounded-full"></div>
                              <div className="line-clamp-3">
                                {' '}
                                {truncateText(item.content, 100)}
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="font-medium text-gray-500 mb-1">
                              Mô tả chi tiết
                            </div>
                            <div className="line-clamp-3">
                              {truncateText(item.description, 100)}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-500 mb-1">
                              Ngày tạo
                            </div>
                            <div>
                              {item.createdAt instanceof Date
                                ? item.createdAt.toLocaleString()
                                : item.createdAt}
                            </div>
                          </div>

                          <div>
                            <div className="font-medium text-gray-500 mb-1">
                              Ngày sửa
                            </div>
                            <div>
                              {item.updatedAt instanceof Date
                                ? item.updatedAt.toLocaleString()
                                : item.updatedAt}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={ProjectColumns.length + 1}>
                    <div className="flex justify-center items-center py-16">
                      <NoResultsFound />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Bạn có chắc không ?"
        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn dịch vụ."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
