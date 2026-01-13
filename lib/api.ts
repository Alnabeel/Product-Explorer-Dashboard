import { Product, Category } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    // During build, return empty array instead of throwing to prevent build failures
    if (error instanceof Error && (error.name === 'AbortError' || process.env.NODE_ENV === 'production')) {
      console.warn('Failed to fetch products during build, returning empty array:', error.message);
      return [];
    }
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data: Category[] = await response.json();
    return data;
  } catch (error) {
    // During build, return empty array instead of throwing to prevent build failures
    if (error instanceof Error && (error.name === 'AbortError' || process.env.NODE_ENV === 'production')) {
      console.warn('Failed to fetch categories during build, returning empty array:', error.message);
      return [];
    }
    console.error('Error fetching categories:', error);
    throw error;
  }
}
