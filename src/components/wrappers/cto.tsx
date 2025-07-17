import type { ContactSectionProps } from '@/types';
import Link from 'next/link';
import contactData from '@/data/contact.data.json';
import { Arrows } from '@/assetts/icons';

export function ContactSection({ href, title }: ContactSectionProps) {
  return (
    <div className="bg-black py-12 px-6 md:px-12">
      <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-white text-xl md:text-2xl font-medium leading-relaxed">
            {contactData.ContactData.cto}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-main hover:bg-main-600 text-black font-medium px-6 py-3 transition-colors"
          >
            Liên Hệ Ngay
            <Arrows.ArrowRight />
          </Link>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-white hover:text-gray-300 font-medium transition-colors"
          >
            Xem Thêm {title}
            <Arrows.ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
