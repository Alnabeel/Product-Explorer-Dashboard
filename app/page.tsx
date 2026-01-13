import Header from '@/components/layout/Header';
import ProductListingClient from '@/components/ProductListingClient';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ProductListingClient />
      </main>
    </div>
  );
}
