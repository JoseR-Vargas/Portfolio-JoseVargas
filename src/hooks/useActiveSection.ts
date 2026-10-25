import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the fixed header. A section
 * becomes active once its top edge passes `offset` px from the viewport top.
 */
export function useActiveSection(ids: readonly string[], offset: number): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const update = () => {
      let current = ids[0] ?? ''
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= offset) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      setActive(atBottom ? (ids[ids.length - 1] ?? current) : current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids, offset])

  return active
}
