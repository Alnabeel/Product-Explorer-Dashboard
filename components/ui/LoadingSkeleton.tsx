export default function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-12 ml-2" />
        </div>
        
        {/* Price */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-full w-24" />
        
        {/* Button */}
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mt-4" />
      </div>
    </div>
  );
}
