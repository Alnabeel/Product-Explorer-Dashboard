import { fetchProducts, fetchCategories } from '@/lib/api';
import Header from '@/components/layout/Header';
import ProductListingClient from '@/components/ProductListingClient';
import ErrorState from '@/components/ErrorState';

async function getProducts() {
  try {
    return await fetchProducts();
  } catch (error) {
    // Return empty array during build if API fails
    console.warn('Error fetching products, returning empty array:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await fetchCategories();
  } catch (error) {
    console.warn('Error fetching categories, returning empty array:', error);
    return [];
  }
}

export default async function HomePage() {
  try {
    const [products, categories] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ProductListingClient
            initialProducts={products}
            categories={categories}
          />
        </div>
      </div>
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to load products';
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ErrorState message={errorMessage} />
        </div>
      </div>
    );
  }
}
