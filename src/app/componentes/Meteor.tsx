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
        const moveInterval = setInterval(() => {
            currentY += speed   
            meteor.style.top = `${currentY}px`
            
            // Se o meteoro sair da tela
            if (currentY > window.innerHeight) {
                onEscape()
                clearInterval(moveInterval)
            }
        }, 16)

        return () => clearInterval(moveInterval)
    }, [y, speed, onEscape])

    return (
        <div
            ref={meteorRef}
            className="meteor absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}px`, top: `${y}px` }}
        >
            <Image
                src="/images/meteor.png" // Você precisará adicionar esta imagem
                alt="Meteor"
                width={40}
                height={40}
                className="meteor-image"
            />
            
            <style jsx>{`
                .meteor {
                    transition: transform 0.3s ease;
                }
                .meteor-image {
                    filter: drop-shadow(0 0 8px rgba(255, 87, 51, 0.7));
                }
            `}</style>
        </div>
    )
} 