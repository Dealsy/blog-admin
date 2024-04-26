'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type BackArrowType = {
  className?: string
}

export default function BackArrow({ className }: BackArrowType) {
  const { back } = useRouter()

  return (
    <>
      <Button aria-label="Return arrow" onClick={back}>
        <ChevronLeft className={cn('h-8 w-8', className)} />
      </Button>
    </>
  )
}
