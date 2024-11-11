'use client'

import { useEffect, useState } from 'react'

interface ShootingStar {
  id: number
  top: number
  left: number
  delay: number
}

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    const createStar = (): ShootingStar => ({
      id: Math.random(),
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5
    })

    // Criar estrelas iniciais
    setStars(Array.from({ length: 4 }, createStar))

    // Adicionar novas estrelas periodicamente
    const interval = setInterval(() => {
      setStars(prev => {
        const newStars = prev.slice(1) // Remove a estrela mais antiga
        return [...newStars, createStar()] // Adiciona uma nova estrela
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="shooting-stars">
      {stars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </div>
  )
} 