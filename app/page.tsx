import Header from '@/components/layout/Header';
import ProductListingClient from '@/components/ProductListingClient';
import { Suspense } from 'react';

function ProductListingFallback() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="text-center lg:text-left">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-64 mb-3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-96 max-w-full"></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Suspense fallback={<ProductListingFallback />}>
          <ProductListingClient />
        </Suspense>
      </main>
    </div>
  );
}
