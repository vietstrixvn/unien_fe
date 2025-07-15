'use client';

import { Heading, Container, PushButton } from '@/components';
import ProjectListDataAdmin from '@/components/pages/admin/project/ProjectList';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <Heading name="Trang Dự Án" desc="Manage your projects here" />
      </div>
      {/* Link tạo bài viết */}
      <ProjectListDataAdmin />
    </Container>
  );
};

export default Page;
