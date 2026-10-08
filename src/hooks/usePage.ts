import { useEffect, useRef } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

/** Calls handler when the element leaves/enters the viewport (top-level visibility). */
export function useOnScreen<T extends HTMLElement>(onChange: (visible: boolean) => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => onChange(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [onChange])

  return ref
}
