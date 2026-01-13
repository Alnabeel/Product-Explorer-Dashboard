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
      className={`px-4 py-2 border rounded-lg transition-colors flex items-center gap-2 ${
        showFavoritesOnly
          ? 'bg-red-50 border-red-300 text-red-700'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <svg
        className={`w-5 h-5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'}`}
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
      <span>Favorites Only</span>
    </button>
  );
}
