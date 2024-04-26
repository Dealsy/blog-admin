const header = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const

type HeaderProps = {
  level: Header
  text: string
  className?: string
}

export type Header = (typeof header)[keyof typeof header]

export default function HeaderTag({ level, text, className = '' }: HeaderProps) {
  const HeaderTag = level as keyof JSX.IntrinsicElements

  return <HeaderTag className={className}>{text}</HeaderTag>
}
