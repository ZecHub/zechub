/**
 * Shimmer-style skeleton primitives shared by the route loading.tsx
 * files. Pure JSX so they can render in server components too.
 */

export function SkeletonBar({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-neutral-200/80 dark:bg-neutral-800/60 animate-pulse ${className}`}
    />
  );
}

export function SkeletonRow() {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <SkeletonBar className="h-4 w-48" />
        <SkeletonBar className="h-7 w-20" />
      </div>
      <SkeletonBar className="h-3 w-full" />
      <SkeletonBar className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <div className="flex items-baseline justify-between">
      <SkeletonBar className="h-7 w-40" />
      <SkeletonBar className="h-3 w-16" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div className="bg-neutral-50 dark:bg-neutral-900/50 px-3 py-2.5">
        <SkeletonBar className="h-3 w-20" />
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-3 px-3 py-3">
            <SkeletonBar className="h-3 w-full col-span-1" />
            <SkeletonBar className="h-3 w-3/4 col-span-2" />
            <SkeletonBar className="h-3 w-1/2 col-span-1" />
            <SkeletonBar className="h-3 w-3/4 col-span-1" />
            <SkeletonBar className="h-3 w-2/3 col-span-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
