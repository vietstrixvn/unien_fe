import { CustomImage } from '@/components';
import Link from 'next/link';

// Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.01] border border-gray-100 hover:border-gray-200 group relative w-full"
    >
      {/* Product Image */}
      <div className="relative">
        <CustomImage
          src={product.file?.[0] || '/logo.svg'}
          alt={product.title}
          className="w-full aspect-square object-cover"
          width={120}
          height={120}
        />
      </div>

      {/* Product Info */}
      <div className="p-1 sm:p-1.5">
        <h3 className="text-sm sm:text-sm font-medium text-gray-800 line-clamp-2 h-[32px] sm:h-[36px] leading-4 sm:leading-[18px]">
          {product.title}
        </h3>
        <div className="mt-1 flex items-baseline">
          <span className="text-red-500 font-semibold text-[10px] sm:text-xs">
            {product?.price && product.price > 0
              ? `₫${product.price.toLocaleString()}`
              : 'Liên hệ'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
