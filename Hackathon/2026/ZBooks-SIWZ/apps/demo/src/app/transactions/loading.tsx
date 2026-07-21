import { SkeletonBar, SkeletonHeader, SkeletonTable } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonHeader />
      <SkeletonBar className="h-10 w-full" />
      <div className="flex gap-2">
        <SkeletonBar className="h-8 w-72" />
        <SkeletonBar className="h-8 w-32" />
        <SkeletonBar className="h-8 w-32" />
      </div>
      <SkeletonTable rows={6} />
    </div>
  );
}
