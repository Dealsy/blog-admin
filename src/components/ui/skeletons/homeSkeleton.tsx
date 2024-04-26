import Grid from '../grid'
import { Skeleton } from '../skeleton'

export default function HomeSkeleton() {
  return (
    <>
      <Skeleton className="h-5 w-[130px]" />
      <Skeleton className="h-3 w-[250px]" />
      <Skeleton className="h-10 w-[940px]" />
      {/* Create a fake array of 10 items */}
      <div className=" mb-16 flex flex-row flex-wrap gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-[80px]" />
        ))}
      </div>
      <Grid cols={4} className="grid-cols-1 md:grid-cols-4">
        {/* Create a fake array of 10 items */}
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-[145px] w-[250px]" />
        ))}
      </Grid>
    </>
  )
}
