'use client';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ProductGallery } from '@/components/pages/product/product-gallery';
import { ProductDetailData } from '@/lib';
import { LoadingSpin, NoResultsFound } from '@/components';
import { Container } from '@/components/wrappers/Container';
import Link from 'next/link';
import RelatedProducts from '@/components/pages/product/RelatedProduct';

export default function Page() {
  const { slug } = useParams();
  const router = useRouter();
  const productSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const onClick = () => {
    router.push('/contact');
  };

  const { product, isLoading, isError } = ProductDetailData(productSlug, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpin />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <NoResultsFound />
      </div>
    );
  }

  return (
    <Container className="mx-auto px-4 py-8 mt-18">
      <Link
        href="/products"
        className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
      >
        ← Quay lại
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery images={product?.file || []} />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <p className="text-base text-gray-600">{product?.content}</p>
            <div className="flex items-center mt-2"></div>
          </div>
          <div className="text-3xl font-bold">
            {product?.price && product.price > 0 ? (
              `${new Intl.NumberFormat('vi-VN').format(product.price)}đ`
            ) : (
              <span className="text-red-500  underline animate-pulse">
                Liên hệ
              </span>
            )}
          </div>

          <div className="pt-4">
            <Button
              onClick={onClick}
              size="lg"
              className="w-full bg-main md:w-auto"
            >
              Liên Hệ Ngay
            </Button>
            <div>
              <h3 className="text-lg font-semibold mb-2">Chi tiết</h3>
              <div
                className="rich-text-content mt-4"
                dangerouslySetInnerHTML={{
                  __html: product.content ?? '',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts />
    </Container>
  );
}
