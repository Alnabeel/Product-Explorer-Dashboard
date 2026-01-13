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
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
    >
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
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
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <p className="text-lg font-bold text-gray-900 mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
