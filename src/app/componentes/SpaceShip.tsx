'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'

interface SpaceShipProps {
    onHit: (index: number) => void
    cardsRef: React.RefObject<(HTMLDivElement | null)[]>
    onMeteorHit?: () => void
}

export default function SpaceShip({ onHit, cardsRef, onMeteorHit }: SpaceShipProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [direction, setDirection] = useState<'left' | 'right'>('right')
    const [isInSection, setIsInSection] = useState(false)
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [bullets, setBullets] = useState<{ id: number; x: number; y: number }[]>([])
    const [sectionBounds, setSectionBounds] = useState({ top: 0, bottom: 0 })
    
    const targetPosition = useRef({ x: 0, y: 0 })
    const currentPosition = useRef({ x: 0, y: 0 })
    const animationFrame = useRef<number>()
    const lastShootTime = useRef(0)
    const shootInterval = 200

    const pendingHitRef = useRef<number | null>(null)

    const [isWPressed, setIsWPressed] = useState(false)

    useEffect(() => {
        if (pendingHitRef.current !== null) {
            onHit(pendingHitRef.current)
            pendingHitRef.current = null
        }
    })

    const checkIfMouseInSection = useCallback((mouseX: number, mouseY: number) => {
        const section = document.getElementById('linha-do-tempo')
        if (!section) return false

        const rect = section.getBoundingClientRect()
        const padding = 20
        setSectionBounds({ top: rect.top, bottom: rect.bottom })
        
        return (
            mouseX >= rect.left - padding &&
            mouseX <= rect.right + padding &&
            mouseY >= rect.top - padding &&
            mouseY <= rect.bottom + padding
        )
    }, [])

    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
    }

    const shoot = useCallback(() => {
        const now = Date.now()
        if (now - lastShootTime.current >= shootInterval) {
            setBullets(prev => [...prev, {
                id: now,
                x: position.x,
                y: position.y - 30
            }])
            lastShootTime.current = now
        }
    }, [position])

    const checkCollision = useCallback((bullet: { x: number, y: number, id: number }) => {
        if (!cardsRef.current) return false

        cardsRef.current.forEach((card, index) => {
            if (!card) return

            const rect = card.getBoundingClientRect()
            
            if (
                bullet.x >= rect.left &&
                bullet.x <= rect.right &&
                bullet.y >= rect.top &&
                bullet.y <= rect.bottom
            ) {
                pendingHitRef.current = index
                setBullets(prev => prev.filter(b => b.id !== bullet.id))
            }
        })

        const meteors = document.querySelectorAll('.meteor')
        meteors.forEach(meteor => {
            const rect = meteor.getBoundingClientRect()
            
            if (
                bullet.x >= rect.left &&
                bullet.x <= rect.right &&
                bullet.y >= rect.top &&
                bullet.y <= rect.bottom
            ) {
                meteor.remove()
                setBullets(prev => prev.filter(b => b.id !== bullet.id))
                if (onMeteorHit) onMeteorHit()
            }
        })
    }, [cardsRef, onMeteorHit])

    const updateBullets = useCallback(() => {
        setBullets(prev => {
            const newBullets = prev.filter(bullet => {
                const isVisible = bullet.y > sectionBounds.top
                if (isVisible) {
                    checkCollision(bullet)
                }
                return isVisible && bullet.y > 0
            }).map(bullet => ({
                ...bullet,
                y: bullet.y - 10
            }))
            return newBullets
        })
    }, [sectionBounds.top, checkCollision])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'w') {
                setIsWPressed(true)
            }
        }

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'w') {
                setIsWPressed(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const updatePosition = useCallback(() => {
        const smoothFactor = 0.15

        currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, smoothFactor)
        currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, smoothFactor)

        setPosition({
            x: Math.round(currentPosition.current.x),
            y: Math.round(currentPosition.current.y)
        })

        if (isInSection && isWPressed) {
            shoot()
        }
        updateBullets()

        animationFrame.current = requestAnimationFrame(updatePosition)
    }, [isInSection, shoot, updateBullets, isWPressed])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const isInHistorico = checkIfMouseInSection(e.clientX, e.clientY)
            setIsInSection(isInHistorico)

            if (!isInHistorico) return

            if (isFirstRender) {
                setIsFirstRender(false)
                currentPosition.current = { x: e.clientX, y: e.clientY }
                setPosition({ x: e.clientX, y: e.clientY })
            }

            targetPosition.current = { x: e.clientX, y: e.clientY }

            if (e.clientX > currentPosition.current.x + 5) {
                setDirection('right')
            } else if (e.clientX < currentPosition.current.x - 5) {
                setDirection('left')
            }
        }

        animationFrame.current = requestAnimationFrame(updatePosition)

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current)
            }
        }
    }, [checkIfMouseInSection, updatePosition, isFirstRender])

    if (!isInSection) return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div
                className="spaceship absolute will-change-transform pointer-events-none transition-opacity duration-200"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) ${direction === 'left' ? 'scaleX(-1)' : ''}`,
                    opacity: isInSection ? 1 : 0
                }}
            >
                <div className="relative w-16 h-16">
                    <Image
                        src="/images/spaceship.png"
                        alt="Spaceship"
                        width={64}
                        height={64}
                        className="pixel-ship"
                        priority
                    />
                    <div className={`thruster-flame ${direction === 'left' ? 'flame-left' : 'flame-right'}`} />
                </div>
            </div>

            {bullets.map(bullet => (
                bullet.y >= sectionBounds.top && bullet.y <= sectionBounds.bottom && (
                    <div
                        key={bullet.id}
                        className="bullet absolute pointer-events-none"
                        style={{
                            left: `${bullet.x}px`,
                            top: `${bullet.y}px`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div className="bullet-pixel" />
                    </div>
                )
            ))}

            <style jsx>{`
                .spaceship {
                    transition: transform 0.1s ease;
                }

                .pixel-ship {
                    image-rendering: pixelated;
                    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
                }

                .thruster-flame {
                    position: absolute;
                    bottom: 0;
                    width: 6px;
                    height: 8px;
                    transition: all 0.1s ease;
                }

                .flame-right {
                    right: 2px;
                    background: linear-gradient(to bottom, #a855f7, #7c3aed);
                    animation: flame-pulse 0.2s infinite alternate;
                }

                .flame-left {
                    left: 2px;
                    background: linear-gradient(to bottom, #a855f7, #7c3aed);
                    animation: flame-pulse 0.2s infinite alternate;
                }

                @keyframes flame-pulse {
                    from {
                        height: 8px;
                        opacity: 0.8;
                    }
                    to {
                        height: 12px;
                        opacity: 0.4;
                    }
                }

                .bullet {
                    position: absolute;
                    will-change: transform;
                }

                .bullet-pixel {
                    width: 4px;
                    height: 12px;
                    background: #a855f7;
                    box-shadow: 0 0 8px #a855f7, 0 0 12px #7c3aed;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    )
} 