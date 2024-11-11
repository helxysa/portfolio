'use client';

import { useLanguage } from '../ContextLang/LanguageContext';

export const LanguageSelector = () => {
    const { currentLanguage, setCurrentLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => setCurrentLanguage('pt')}
                className={`px-2 py-1 rounded ${
                    currentLanguage === 'pt' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                }`}
            >
                PT
            </button>
            <button
                onClick={() => setCurrentLanguage('en')}
                className={`px-2 py-1 rounded ${
                    currentLanguage === 'en' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
                }`}
            >
                EN
            </button>
        </div>
    );
} 