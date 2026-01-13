'use client';

import ErrorState from '@/components/ErrorState';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { fetchProductClient } from '@/lib/api';
import { isFavorite, toggleFavorite } from '@/lib/favorites';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductDetailClientProps {
  productId: number;
}

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [favorited, setFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await fetchProductClient(productId);
        setProduct(productData);
        setFavorited(isFavorite(productData.id));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load product';
        setError(errorMessage);
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const handleFavoriteClick = () => {
    if (!product) return;
    toggleFavorite(product.id);
    setFavorited(isFavorite(product.id));
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            <LoadingSkeleton />
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <ErrorState message={error || 'Product not found'} />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => router.back()}
        aria-label="Go back to products"
        className="mb-8 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 rounded-lg px-2 py-1"
      >
        <svg
          className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Products
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl aspect-square shadow-inner relative p-8">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold capitalize">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="font-medium">{product.rating.rate}</span>
                </div>
                <span>•</span>
                <span>{product.rating.count} reviews</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg">
              {product.description}
            </p>

            <button
              onClick={handleFavoriteClick}
              aria-label={favorited ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
              aria-pressed={favorited}
              className={`mt-auto px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${
                favorited
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-2 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  favorited
                    ? 'fill-red-500 text-red-500 dark:text-red-400'
                    : 'fill-none text-gray-400 dark:text-gray-500'
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
