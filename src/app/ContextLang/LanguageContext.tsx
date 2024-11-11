'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
    currentLanguage: Language;
    setCurrentLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language || 'pt';
        setCurrentLanguage(savedLanguage);
        setIsLoading(false);
    }, []);

    const t = (key: string): string => {
        const keys = key.split('.');
        let current: any = translations[currentLanguage];
        
        for (const k of keys) {
            if (current[k] === undefined) {
                return key;
            }
            current = current[k];
        }
        
        return current || key;
    };

    if (isLoading) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ 
            currentLanguage, 
            setCurrentLanguage: (lang: Language) => {
                setCurrentLanguage(lang);
                localStorage.setItem('language', lang);
            },
            t 
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 