'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 px-4' : 'py-4 px-6'
    }`}>
      <nav className="container mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-gray-700 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-gray-400 text-sm hidden sm:block">terminal@heloysa:~</div>
            </div>

            <div className="hidden md:flex space-x-6">
              <Link 
                href="https://github.com/helxysa" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                target="_blank"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4 inline mr-1" />
                github
              </Link>
              <Link 
                href="#projetos" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 inline mr-1" />
                projetos
              </Link>
              <Link 
                href="#contato" 
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 inline mr-1" />
                contato
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
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-2 space-y-3">
              <Link
                href="https://github.com/helxysa"
                className="block text-gray-400 hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4 inline mr-1" />
                github
              </Link>
              <Link
                href="#habilidades"
                className="block text-gray-400 hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 inline mr-1" />
                habilidades
              </Link>
              <Link
                href="#contato"
                className="block text-gray-400 hover:text-green-400 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-green-400 mr-1">$</span>
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 inline mr-1" />
                contato
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}