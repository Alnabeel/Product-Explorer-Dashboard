'use client';

import { Category } from '@/types/product';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by category"
      className="px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-300 dark:focus:border-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-sm font-medium"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  );
}
