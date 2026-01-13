'use client';

import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/favorites';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(product.id));
  }, [product.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    setFavorited(isFavorite(product.id));
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group"
    >
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              favorited
                ? 'fill-red-500 text-red-500'
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
        </button>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-base">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 capitalize">
          {product.category}
        </p>
        <p className="text-xl font-bold text-gray-900 dark:text-white mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
