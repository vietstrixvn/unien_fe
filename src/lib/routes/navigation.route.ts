import { ROUTES } from './routes';

export const Name = {
  HOME: 'Trang Chủ ',
  COMPANY: 'Về Chúng tôi',
  SERVICE: 'Dịch Vụ & Công Nghiệp',
  BLOG: 'Bài Viết',
  PRODUCT: 'Sản Phẩm',
};

export const navItems = [
  { name: Name.HOME, href: ROUTES.HOME },
  { name: Name.COMPANY, href: ROUTES.COMPANY },
  { name: Name.SERVICE, href: ROUTES.SERVICE.ROOT },
  { name: Name.BLOG, href: ROUTES.BLOG.ROOT },
  { name: Name.BLOG, href: ROUTES.PRODUCT.ROOT },
];
