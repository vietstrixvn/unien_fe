'use client';

import { Container, Heading } from '@/components';
import ServiceListDataAdmin from '@/components/pages/admin/service/ServiceList';
import React from 'react';
import { AdminBreadCrumb } from '@/components/layout/AdminLayout/admin.breadcrumb';

const Page = () => {
  return (
    <Container>
      <AdminBreadCrumb title="Dịch Vụ" />

      <Heading
        name="Dịch Vụ"
        desc="Quản lý tất cả các dịch vụ có sẵn trên nền tảng. Bạn có thể tạo, cập nhật hoặc xóa các dịch vụ và đảm bảo rằng mỗi dịch vụ đều được mô tả rõ ràng và cập nhật cho người dùng."
      />

      <ServiceListDataAdmin />
    </Container>
  );
};

export default Page;
