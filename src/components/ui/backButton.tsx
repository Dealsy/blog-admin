'use client'

import { useRouter } from 'next/navigation'
import { Button } from './button'

export default function BackButton() {
  const { back } = useRouter()

  return <Button onClick={back}>Go Back</Button>
}
