'use client';

interface FavoritesFilterProps {
  showFavoritesOnly: boolean;
  onChange: (show: boolean) => void;
}

export default function FavoritesFilter({
  showFavoritesOnly,
  onChange,
}: FavoritesFilterProps) {
  return (
    <button
      onClick={() => onChange(!showFavoritesOnly)}
      className={`px-4 py-3 border rounded-xl transition-all flex items-center gap-2 shadow-sm ${
        showFavoritesOnly
          ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30'
          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <svg
        className={`w-5 h-5 transition-colors ${
          showFavoritesOnly
            ? 'fill-red-500 text-red-500 dark:text-red-400'
            : 'fill-none text-gray-400 dark:text-gray-500'
        }`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span className="font-medium">Favorites</span>
    </button>
  );
}
