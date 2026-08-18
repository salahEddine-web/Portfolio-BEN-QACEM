import { useState, useEffect, useRef, useCallback } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '')
  const observerRef = useRef(null)

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visible.length > 0) {
        setActiveId(visible[0].target.id)
      }
    }, { threshold: [0.2, 0.4, 0.6], rootMargin: '-80px 0px -40% 0px' })

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current.observe(el)
    })

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [sectionIds])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return { activeId, scrollTo }
}
