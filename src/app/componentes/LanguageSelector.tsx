'use client';

import { useLanguage } from '../ContextLang/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface LanguageOption {
    value: 'pt' | 'en';
    label: string;
    description: string;
}

const languages: LanguageOption[] = [
    { value: 'pt', label: 'Português', description: 'Brazilian Portuguese' },
    { value: 'en', label: 'English', description: 'United States' }
];

export const LanguageSelector = () => {
    const { currentLanguage, setCurrentLanguage } = useLanguage();

    return (
        <div className="space-y-0.5">
            {languages.map((lang) => (
                <button
                    key={lang.value}
                    onClick={() => setCurrentLanguage(lang.value)}
                    className={`
                        w-full px-3 py-2 text-left flex items-center justify-between
                        hover:bg-gray-700/50 transition-colors duration-200
                        ${currentLanguage === lang.value ? 'text-green-400 bg-gray-700/30' : 'text-gray-400'}
                    `}
                >
                    <div className="flex flex-col">
                        <span className="text-sm">{lang.label}</span>
                        <span className="text-xs text-gray-500">{lang.description}</span>
                    </div>
                    {currentLanguage === lang.value && (
                        <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
                    )}
                </button>
            ))}
        </div>
    );
};