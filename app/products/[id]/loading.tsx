import Header from '@/components/layout/Header';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-square animate-pulse" />
              <div className="flex flex-col space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                </div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full mt-auto animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
