import { SkeletonBar, SkeletonHeader, SkeletonTable } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <SkeletonHeader />
      <SkeletonBar className="h-4 w-2/3 max-w-2xl" />
      <SkeletonTable rows={5} />
    </div>
  );
}
