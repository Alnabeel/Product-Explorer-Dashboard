const FAVORITES_KEY = 'product-explorer-favorites';

export function getFavorites(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) {
      return [];
    }
    const favorites: number[] = JSON.parse(stored);
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
}

export function toggleFavorite(productId: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(productId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(productId);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error updating favorites in localStorage:', error);
  }
}

export function isFavorite(productId: number): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const favorites = getFavorites();
  return favorites.includes(productId);
}
