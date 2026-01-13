'use client';

import { Product } from '@/types/product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  featuredProduct?: Product;
}

export default function HeroSection({ featuredProduct }: HeroSectionProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!featuredProduct) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl mb-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-semibold text-indigo-700 shadow-sm">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                Featured Product
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {featuredProduct.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
                Discover premium quality and exceptional design
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => router.push(`/products/${featuredProduct.id}`)}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Shop Now
              </button>
              <button
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
              >
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{featuredProduct.price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">Starting Price</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {featuredProduct.rating.rate}
                </div>
                <div className="text-sm text-gray-500">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-700">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
