'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(product.id));
  }, [product.id]);

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    setFavorited(isFavorite(product.id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
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
        Back
      </button>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="ml-1">{product.rating.rate}</span>
                </div>
                <span>•</span>
                <span>{product.rating.count} reviews</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={handleFavoriteClick}
              className={`mt-auto px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                favorited
                  ? 'bg-red-50 text-red-700 border-2 border-red-300 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200'
              }`}
            >
              <svg
                className={`w-5 h-5 ${favorited ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
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
