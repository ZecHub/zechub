import { SkeletonBar, SkeletonHeader, SkeletonTable } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-10">
      <SkeletonHeader />
      <div className="grid gap-3 sm:grid-cols-3">
        <SkeletonBar className="h-20 w-full" />
        <SkeletonBar className="h-20 w-full" />
        <SkeletonBar className="h-20 w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <SkeletonBar className="h-72 w-full lg:col-span-2" />
        <SkeletonBar className="h-72 w-full" />
      </div>
      <SkeletonTable rows={4} />
    </div>
  );
}
