'use client'

import { useEffect, useState } from 'react'

export const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)

    return () => {
      window.removeEventListener('resize', checkIsDesktop)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <div style={{ cursor: 'default' }}>
      <div
        className={`pointer-events-none fixed z-50 h-32 w-32 rounded-full bg-gradient-to-br from-violet-600 via-indigo-500 to-purple-500 opacity-20 blur-2xl transition-all duration-300 ease-out ${
          isMoving ? 'scale-125' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 64}px, ${position.y - 64}px)`,
        }}
      />
      <div
        className={`pointer-events-none fixed z-50 h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-30 blur-xl transition-all duration-200 ease-out ${
          isMoving ? 'scale-75' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x - 32}px, ${position.y - 32}px)`,
        }}
      />
    </div>
  )
} 