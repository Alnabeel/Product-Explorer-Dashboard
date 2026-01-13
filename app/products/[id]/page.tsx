import Header from '@/components/layout/Header';
import ProductDetailClient from '@/components/ProductDetailClient';
import { fetchProduct } from '@/lib/api';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await fetchProduct(productId);
  } catch (error) {
    if (error instanceof Error && error.message === 'Product not found') {
      notFound();
    }
    throw error;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <ProductDetailClient product={product} />
      </div>
    </div>
  );
}
