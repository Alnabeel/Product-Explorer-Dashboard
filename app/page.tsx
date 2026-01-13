import Header from '@/components/layout/Header';
import ProductListingClient from '@/components/ProductListingClient';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <ProductListingClient />
      </div>
    </div>
  );
}
