'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCodeBranch, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub,  } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
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
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 py-2 px-4' : 'bg-gray-800 py-4 px-6'}`}>
      <nav className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="https://github.com/helxysa" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" target='_blank'>
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-white" />
                GitHub
              </Link>
            </li>
            <li>
              <Link href="#habilidades" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faCode} className="w-4 h-4 text-white" />
                Habilidades
              </Link>
            </li>
            <li>
              <Link href="#contato" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
                Contato
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-purple-400 text-lg">
            <FontAwesomeIcon icon={faCodeBranch} className="w-4 h-4 mr-1 text-white" />
            Heloysa
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
          <div className="w-1 h-4 bg-gray-400 "></div>
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6 text-white" />
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="https://github.com/helxysa"
              className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4 text-white" />
              GitHub
            </Link>
            <Link
              href="#habilidades"
              className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faCode} className="w-4 h-4 text-white" />
              Habilidades
            </Link>
            <Link
              href="#contato"
              className="block text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-white" />
              Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}