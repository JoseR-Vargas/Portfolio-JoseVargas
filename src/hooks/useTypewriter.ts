import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

interface TypewriterOptions {
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

/** Pause between finishing a deletion and typing the next text. */
const NEXT_TEXT_DELAY = 400

/**
 * Types and deletes each text in turn, with the same timings as the legacy
 * TypewriterEffect. Restarts whenever `texts` changes (e.g. language switch).
 * Users who prefer reduced motion get the first text, unanimated.
 */
export function useTypewriter(
  texts: readonly string[],
  { typeSpeed = 90, deleteSpeed = 55, pauseTime = 2200 }: TypewriterOptions = {},
): string {
  const [text, setText] = useState('')
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || texts.length === 0) return

    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = texts[textIndex]

      if (isDeleting) {
        setText(current.substring(0, charIndex - 1))
        charIndex--
      } else {
        setText(current.substring(0, charIndex + 1))
        charIndex++
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed

      if (!isDeleting && charIndex === current.length) {
        delay = pauseTime
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % texts.length
        delay = NEXT_TEXT_DELAY
      }

      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 0)
    return () => clearTimeout(timer)
  }, [texts, reduced, typeSpeed, deleteSpeed, pauseTime])

  return reduced ? (texts[0] ?? '') : text
}
