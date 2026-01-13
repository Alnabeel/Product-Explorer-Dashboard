'use client';

export type SortOption = 'default' | 'price-low' | 'price-high';

interface SortFilterProps {
  sortBy: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortFilter({ sortBy, onChange }: SortFilterProps) {
  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">
        Sort products by
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-300 dark:focus:border-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-sm font-medium appearance-none pr-10"
        aria-label="Sort products by price"
      >
        <option value="default">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
      <svg
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
