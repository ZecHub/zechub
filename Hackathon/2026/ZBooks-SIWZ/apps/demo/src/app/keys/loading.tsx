import { SkeletonBar, SkeletonHeader, SkeletonRow } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonHeader />
      <SkeletonBar className="h-4 w-2/3 max-w-2xl" />
      <SkeletonBar className="h-32 w-full" />
      <div className="flex flex-col gap-2">
        <SkeletonRow />
        <SkeletonRow />
      </div>
    </div>
  );
}
