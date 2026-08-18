import "./CustomCursor.scss"
import React, { useState, useEffect, useRef } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [expanding, setExpanding] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (!visible) setVisible(true)
    }

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    const onOverInteractive = (e) => {
      if (e.target.closest('a, button, .cursor-view, .cursor-expand')) {
        setExpanding(true)
      }
    }

    const onOutInteractive = (e) => {
      if (e.target.closest('a, button, .cursor-view, .cursor-expand')) {
        setExpanding(false)
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOverInteractive)
    document.addEventListener('mouseout', onOutInteractive)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOverInteractive)
      document.removeEventListener('mouseout', onOutInteractive)
    }
  }, [visible])

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${visible ? 'custom-cursor--visible' : ''} ${expanding ? 'custom-cursor--expand' : ''}`}
      aria-hidden="true"
    />
  )
}

export default CustomCursor
