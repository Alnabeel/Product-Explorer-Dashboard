import Header from '@/components/layout/Header';
import ProductListingClient from '@/components/ProductListingClient';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProductListingClient />
      </div>
    </div>
  );
}
