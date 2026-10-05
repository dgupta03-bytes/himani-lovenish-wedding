import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Soft golden glow that trails the cursor — desktop (fine pointer) only. */
export default function CursorGlow() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 260, damping: 28 })
  const sy = useSpring(y, { stiffness: 260, damping: 28 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[80] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ x: sx, y: sy, background: 'radial-gradient(circle, rgba(217,185,112,0.55) 0%, rgba(217,185,112,0) 70%)' }}
      aria-hidden="true"
    />
  )
}
