'use client'

import { useEffect, useState, useCallback } from 'react'

export const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [realPosition, setRealPosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !isMobile)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)

    return () => {
      window.removeEventListener('resize', checkIsDesktop)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if ('ontouchstart' in window) return
    
    setRealPosition({ x: e.clientX, y: e.clientY })
    setIsMoving(true)
    
    const target = e.target as HTMLElement
    const section = document.getElementById('historico-section')
    const isInHistoricoSection = section?.contains(target) || false
    
    setIsHovering(
      target.tagName === 'BUTTON' || 
      target.tagName === 'A' || 
      target.closest('button') !== null || 
      target.closest('a') !== null ||
      isInHistoricoSection
    )
  }, [])

  useEffect(() => {
    if (!isDesktop) return

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isDesktop, handleMouseMove])

  useEffect(() => {
    if (!isDesktop) return

    let animationFrameId: number

    const animate = () => {
      setPosition(prev => {
        const dx = realPosition.x - prev.x
        const dy = realPosition.y - prev.y
        
        return {
          x: prev.x + dx * 0.8,
          y: prev.y + dy * 0.8
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDesktop, realPosition])

  const checkMovement = useCallback(() => {
    const dx = Math.abs(realPosition.x - position.x)
    const dy = Math.abs(realPosition.y - position.y)
    
    if (dx < 0.1 && dy < 0.1) {
      setIsMoving(false)
    }
  }, [position, realPosition])

  useEffect(() => {
    if (!isDesktop) return

    const timeoutId = setInterval(checkMovement, 100)

    return () => clearInterval(timeoutId)
  }, [isDesktop, checkMovement])

  if (!isDesktop || 'ontouchstart' in window) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none cursor-default">
      <div
        className="fixed h-32 w-32 rounded-full bg-gradient-to-br from-violet-600/20 via-indigo-500/20 to-purple-500/20 blur-2xl transition-all duration-300 ease-out pointer-events-none opacity-20"
        style={{
          transform: `translate3d(${position.x - 64}px, ${position.y - 64}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div
        className="fixed h-16 w-16 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl transition-all duration-300 ease-out pointer-events-none opacity-20"
        style={{
          transform: `translate3d(${position.x - 32}px, ${position.y - 32}px, 0)`,
          willChange: 'transform'
        }}
      />
    </div>
  )
} 