'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface MeteorProps {
    x: number
    y: number
    speed: number
    onDestroy: () => void
    onEscape: () => void
}

export default function Meteor({ x, y, speed, onDestroy, onEscape }: MeteorProps) {
    const meteorRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const meteor = meteorRef.current
        if (!meteor) return

        let currentY = y
        let rotation = Math.random() * 360
        
        const moveInterval = setInterval(() => {
            currentY += speed
            rotation += 2
            
            if (meteor) {
                meteor.style.top = `${currentY}px`
                meteor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`
            }
            
            // Verifica se o meteoro saiu da tela
            if (currentY > window.innerHeight) {
                onEscape()
                clearInterval(moveInterval)
            }
        }, 16)

        // Cleanup
        return () => clearInterval(moveInterval)
    }, [y, speed, onEscape])

    return (
        <div
            ref={meteorRef}
            className="meteor absolute"
            style={{ 
                left: `${x}px`, 
                top: `${y}px`,
                transition: 'transform 0.1s ease'
            }}
        >
            <Image
                src="/images/meteor.png"
                alt="Meteor"
                width={40}
                height={40}
                className="meteor-image"
            />
            
            <style jsx>{`
                .meteor {
                    will-change: transform;
                    z-index: 100;
                }
                .meteor-image {
                    filter: drop-shadow(0 0 8px rgba(255, 87, 51, 0.7));
                }
            `}</style>
        </div>
    )
} 