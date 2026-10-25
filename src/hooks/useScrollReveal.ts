import { useEffect, useRef, useState, type RefObject } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

interface ScrollRevealOptions {
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number
}

/**
 * One-shot IntersectionObserver reveal (equivalent of legacy AOS `once: true`
 * and SkillBarAnimator). Reveals immediately when the user prefers reduced
 * motion or IntersectionObserver is unavailable.
 */
export function useScrollReveal<T extends Element>({
  threshold = 0.15,
}: ScrollRevealOptions = {}): { ref: RefObject<T | null>; revealed: boolean } {
  const ref = useRef<T>(null)
  const [revealed, setRevealed] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const element = ref.current
    if (revealed || !element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [revealed, threshold])

  return { ref, revealed }
}
