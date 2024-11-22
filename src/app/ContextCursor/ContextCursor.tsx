'use client'
import { createContext, useContext, useState } from 'react'

interface CursorContextType {
    hideCursor: boolean
    setHideCursor: (hide: boolean) => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [hideCursor, setHideCursor] = useState(false)

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