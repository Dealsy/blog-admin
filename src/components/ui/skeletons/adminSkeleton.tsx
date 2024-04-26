import Grid from '../grid'
import { Skeleton } from '../skeleton'

export default function AdminSkelton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Skeleton className="mb-4 h-8 w-[130px]" />
        <Skeleton className="mb-4 h-8 w-[450px]" />

        <Grid cols={4} className="grid-cols-1 md:grid-cols-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-[450px]" />
          ))}
        </Grid>
      </div>
      <div>
        <Skeleton className="mb-4 h-8 w-[130px]" />
        <Skeleton className="mb-4 h-8 w-[450px]" />
        <Skeleton className="mb-4 h-8 w-[450px]" />
        <Skeleton className="mb-4 h-8 w-[450px]" />
        <Skeleton className="mb-4 h-[618px] w-[450px]" />
        <Skeleton className="mb-4 h-10 w-[450px]" />
        <Skeleton className="mb-4 h-10 w-[450px]" />
      </div>
    </div>
  )
}
