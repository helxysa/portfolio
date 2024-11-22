'use client'
import { createContext, useContext, useState, useEffect } from 'react'

interface CursorContextType {
    hideCursor: boolean
    setHideCursor: (hide: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [hideCursor, setHideCursor] = useState(false)

    useEffect(() => {
        const resetCursor = () => {
            document.documentElement.style.cursor = hideCursor ? 'none' : ''
            const interactiveElements = document.querySelectorAll('button, a, .clickable, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet')
            interactiveElements.forEach(element => {
                if (element instanceof HTMLElement) {
                    element.style.cursor = hideCursor ? 'none' : 'pointer'
                    element.style.pointerEvents = 'auto'
                }
            })
        }

        resetCursor()
        window.addEventListener('focus', resetCursor)
        window.addEventListener('blur', resetCursor)

        return () => {
            window.removeEventListener('focus', resetCursor)
            window.removeEventListener('blur', resetCursor)
            resetCursor()
        }
    }, [hideCursor])

    return (
        <CursorContext.Provider value={{ hideCursor, setHideCursor }}>
            {children}
        </CursorContext.Provider>
    )
}

export function useCursor() {
    const context = useContext(CursorContext)
    if (context === undefined) {
        throw new Error('useCursor must be used within a CursorProvider')
    }
    return context
}