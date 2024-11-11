'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import dynamic from 'next/dynamic';
import { useLanguage } from '../ContextLang/LanguageContext';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const LanguageSelector = dynamic(
  () => import('./LanguageSelector').then(mod => mod.LanguageSelector),
  { ssr: false }
);

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getLanguageText = () => {
    return currentLanguage === 'pt' ? 'escolher_idioma' : 'select_language';
  };

  const getActionText = () => {
    if (currentLanguage === 'pt') {
      return {
        select: 'selecionar',
        close: 'sair'
      };
    }
    return {
      select: 'to select',
      close: 'to close'
    };
  };

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ease-in-out transform ${
      isScrolled 
        ? 'py-2 px-4 bg-gray-900/30 backdrop-blur-md' 
        : 'py-4 px-6 hover:-translate-y-1'
    }`}>
      <nav className={`container mx-auto rounded-xl shadow-2xl overflow-visible transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-gray-800/50 backdrop-blur-md'
          : 'bg-gray-800/95'
      }`}>
        <div className={`px-4 py-2 rounded-xl transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-gray-700/30 backdrop-blur-sm hover:bg-gray-700/40'
            : 'bg-gray-700/90 hover:bg-gray-700/95'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <Link href="/" className="ml-4 text-gray-400 text-sm hidden sm:block">
                {t('nav.terminal')}
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-green-400 transition-all duration-200 transform hover:scale-105"
                >
                  <span className="text-green-400">$</span>
                  <span>{getLanguageText()}</span>
                  <span className="text-gray-500">[{currentLanguage.toUpperCase()}]</span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`w-3 h-3 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isLanguageOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-lg rounded-xl overflow-hidden animate-fadeIn"
                    style={{ 
                      zIndex: 999999,
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    <div className="p-2 border-b border-gray-700/50 text-xs text-gray-500">
                      <span className="text-green-400">~/config</span> {getLanguageText()}
                    </div>
                    <div className="py-1">
                      <LanguageSelector />
                    </div>
                    <div className="p-2 border-t border-gray-700/50 text-xs text-gray-500 flex items-center justify-between">
                      <div>
                        <kbd className="px-2 py-0.5 bg-gray-700/50 rounded text-gray-400">↵</kbd>
                        <span className="ml-2">{getActionText().select}</span>
                      </div>
                      <div>
                        <kbd className="px-2 py-0.5 bg-gray-700/50 rounded text-gray-400">esc</kbd>
                        <span className="ml-2">{getActionText().close}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="https://github.com/helxysa" 
                className="text-gray-400 hover:text-green-400 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5"
                target="_blank"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4 inline mr-1" />
                {t('nav.github')}
              </Link>
              <Link 
                href="#projetos" 
                className="text-gray-400 hover:text-green-400 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 inline mr-1" />
                {t('nav.skills')}
              </Link>
              <Link 
                href="#contato" 
                className="text-gray-400 hover:text-green-400 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 inline mr-1" />
                {t('nav.contact')}
              </Link>
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50 rounded-b-xl overflow-hidden animate-slideDown">
            <div className="px-4 py-3 space-y-4">
              {/* Dropdown de Idioma Mobile */}
              <div className="relative">
                <div className="p-2 border border-gray-700/50 rounded-xl bg-gray-800/50">
                  <div className="p-2 border-b border-gray-700/50 text-xs text-gray-500">
                    <span className="text-green-400">~/config</span> {getLanguageText()}
                  </div>
                  <div className="py-2">
                    <LanguageSelector />
                  </div>
                  <div className="p-2 border-t border-gray-700/50 text-xs text-gray-500 flex items-center justify-between">
                    <div>
                      <kbd className="px-2 py-0.5 bg-gray-700/50 rounded text-gray-400">↵</kbd>
                      <span className="ml-2">{getActionText().select}</span>
                    </div>
                    <div>
                      <kbd className="px-2 py-0.5 bg-gray-700/50 rounded text-gray-400">esc</kbd>
                      <span className="ml-2">{getActionText().close}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links Mobile */}
              <div className="space-y-3 p-2 border border-gray-700/50 rounded-xl bg-gray-800/50">
                <Link
                  href="https://github.com/helxysa"
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700/30"
                  onClick={() => setIsMenuOpen(false)}
                  target="_blank"
                >
                  <span className="text-green-400 mr-1">$</span>
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4 inline mr-1" />
                  {t('nav.github')}
                </Link>
                <Link
                  href="#habilidades"
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-green-400 mr-1">$</span>
                  <FontAwesomeIcon icon={faCode} className="w-4 h-4 inline mr-1" />
                  {t('nav.skills')}
                </Link>
                <Link
                  href="#contato"
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-green-400 mr-1">$</span>
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 inline mr-1" />
                  {t('nav.contact')}
                </Link>
              </div>

              {/* Informação do Terminal Mobile */}
              <div className="text-xs text-gray-500 px-2">
                <span className="text-green-400">terminal@heloysa</span>:~
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}