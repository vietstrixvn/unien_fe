'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductList } from '@/lib';
import { CustomImage, LoadingSpin, NoResultsFound } from '@/components';

export default function RelatedProducts() {
  const { products, isLoading, isError } = ProductList(1, { limit: 4 }, 0);

  // Handle loading and error states
  if (isLoading) {
    return <LoadingSpin />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <section className="py-16 px-4 mx-auto">
      <div className="space-y-12">
        <div className="space-y-4">
          <p className="text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
            Sản Phẩm mới nhất
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Giới thiệu về các <br />
            sản phẩm mới nhất
          </h2>
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-orange-200 hover:bg-orange-300 transition-colors px-4 py-2 rounded-full text-sm font-medium"
            >
              Xem thêm các sản phẩm <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((post) => (
            <div
              key={post._id}
              className=" overflow-hidden  shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Link href={`/products/${post._id}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <CustomImage
                    src={post.file?.[0] || '/logo.svg'}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">
                    {' '}
                    {post?.price && post.price > 0
                      ? `₫${post.price.toLocaleString()}`
                      : 'Liên hệ'}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
