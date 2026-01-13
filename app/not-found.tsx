import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-20" />}>
        <Header />
      </Suspense>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Product not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
