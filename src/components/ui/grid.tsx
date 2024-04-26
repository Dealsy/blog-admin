// /components/Grid.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface GridProps {
  children: React.ReactNode
  cols?: number
  gap?: number
  className?: string
}

const Grid: React.FC<GridProps> = ({ children, cols = 2, gap = 4, className }) => {
  const gridClasses = cn(`grid grid-cols-${cols} gap-${gap}`, className)

  return <div className={gridClasses}>{children}</div>
}

export default Grid
