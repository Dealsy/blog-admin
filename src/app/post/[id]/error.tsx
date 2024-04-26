'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import Section from '@/components/ui/section'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Section description="error screen" className="pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-3">
        <h2 className="text-4xl">Something went wrong!</h2>

        {error.message && <p className="text-red-500">{error.message}</p>}
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }>
          Reload
        </Button>
      </div>
    </Section>
  )
}
