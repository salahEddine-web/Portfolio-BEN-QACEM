import { useEffect, useRef, useCallback } from 'react'

export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
  } = options

  const observerRef = useRef(null)

  const observe = useCallback((node) => {
    if (!node || observerRef.current) return

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observerRef.current.unobserve(entry.target)
        }
      })
    }, { threshold, rootMargin })

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
    elements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-reveal:not(.revealed), .scroll-reveal-left:not(.revealed), .scroll-reveal-right:not(.revealed), .scroll-reveal-scale:not(.revealed)')

      if (observerRef.current) {
        elements.forEach((el) => observerRef.current.observe(el))
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return { observe }
}

export function useScrollRevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })

    const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
