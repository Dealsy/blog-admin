import { Skeleton } from '../skeleton'

export default function BlogSkeleton() {
  return (
    <>
      <Skeleton className="mb-4 h-10 w-1/3" />
      <Skeleton className="mb-2 h-10 w-1/2" />
      <Skeleton className="mb-4 h-10 w-full" />
      <Skeleton className="mb-2 h-10 w-1/4" />
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="mb-2 mt-8 h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="mt-8 h-10 w-full" />
    </>
  )
}
