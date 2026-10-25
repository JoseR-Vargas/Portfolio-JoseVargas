import type { ReactNode } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { cx } from './cx'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Transition delay in ms (legacy `data-aos-delay`). */
  delay?: number
  /** Direction the element travels from while revealing. */
  from?: 'up' | 'left' | 'right'
}

const HIDDEN_BY_DIRECTION = {
  up: 'translate-y-6',
  left: '-translate-x-8',
  right: 'translate-x-8',
} as const

export function Reveal({ children, className, delay = 0, from = 'up' }: RevealProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: revealed ? `${delay}ms` : undefined }}
      className={cx(
        'transition duration-500 ease-out motion-reduce:transition-none',
        revealed ? 'translate-x-0 translate-y-0 opacity-100' : `opacity-0 ${HIDDEN_BY_DIRECTION[from]}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
