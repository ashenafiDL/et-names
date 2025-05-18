import { Skeleton } from "@/components/ui/skeleton";
import Container from "../container";

export default function BrowseSkeleton() {
  return (
    <Container>
      <div className="py-12">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <Skeleton className="h-10 w-full md:w-1/2" />
        </div>
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-[140px]" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Skeleton className="h-8 w-48" />
        </div>
      </div>
    </Container>
  );
}
