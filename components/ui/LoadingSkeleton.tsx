export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-300 aspect-square w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
  );
}
