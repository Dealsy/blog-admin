import Section from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Section description="Posts" className="p-24">
      <div className="mx-auto flex max-w-4xl flex-col px-3">
        <div className="flex max-w-2xl flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-[64px] " />
          <Skeleton className="h-11 w-[534px]" />
        </div>
        <Skeleton className="h-5 w-[600px] mt-4" />
        <Skeleton className="h-2 w-[100px] my-2" />
        <Skeleton className="h-2 w-[200px] mb-10" />
        <Skeleton className="h-[864px] w-full" />
      </div>
    </Section>
  );
}
