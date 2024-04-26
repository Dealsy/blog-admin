import { cn } from '@/lib/utils'
import Link from 'next/link'

type NavLinkProps = {
  route: string
  text: string
  onClick?: () => void
}

export default function NavLink({ route, text, onClick }: NavLinkProps) {
  return (
    <Link
      href={route}
      onClick={onClick}
      className={cn(
        `inline-flex items-center justify-center whitespace-nowrap`,
        `rounded-md text-xl font-medium ring-offset-background transition-colors`,
        `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,
        `focus-visible:ring-offset-2`,
        `h-10 px-4 py-2 disabled:pointer-events-none disabled:opacity-50`,
      )}>
      {text}
    </Link>
  )
}
