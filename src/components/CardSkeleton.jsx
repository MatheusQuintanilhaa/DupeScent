export default function CardSkeleton() {
  return (
    <div className="relative bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a] p-6 min-h-[220px] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-white/5 to-transparent" />
      <div>
        <div className="h-2 w-16 bg-gray-200 dark:bg-[#2a2a2a] rounded mb-3" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-[#2a2a2a] rounded mb-1.5" />
        <div className="h-5 w-1/2 bg-gray-200 dark:bg-[#2a2a2a] rounded mb-4" />
        <div className="flex gap-1.5 mb-3">
          <div className="h-5 w-12 bg-gray-100 dark:bg-[#222] rounded" />
          <div className="h-5 w-16 bg-gray-100 dark:bg-[#222] rounded" />
        </div>
        <div className="h-3 w-full bg-gray-100 dark:bg-[#222] rounded mb-1" />
        <div className="h-3 w-2/3 bg-gray-100 dark:bg-[#222] rounded" />
      </div>
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-[#2a2a2a]">
        <div className="h-6 w-10 bg-gray-200 dark:bg-[#2a2a2a] rounded" />
        <div className="h-3 w-28 bg-gray-100 dark:bg-[#222] rounded" />
      </div>
    </div>
  );
}
