const QUERY = '(prefers-reduced-motion: reduce)'

/** Reads the user's reduced-motion preference once (safe outside the browser). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}
