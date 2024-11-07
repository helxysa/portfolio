'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Projetos() {
    const [filtro, setFiltro] = useState('Todos');
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;
    const [showAll, setShowAll] = useState(false);

    // Detectar se é mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const projetos = [
        {
            nome: "Manual Radar Ambiental",
            descricao: "Manual de Uso do Sistema de Radar Ambiental da MSB",
            github: "https://github.com/helxysa/RadarAmbiental-MP",
            site: "https://radar-ambiental-mp.vercel.app/",
            mostrarSite: true,
            stack: ["TailwindCSS"],
            status: "Finalizado"
        },
        {
            nome: "JUDBR",
            descricao: "Landing Page de Apresentação do Sistema Juridico JUDBR - versao 1",
            github: "https://github.com/helxysa/judbr-nextjs",
            site: "https://judbr-nextjs-kjng.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"],
            status: "Em Andamento"
        },
        {
            nome: "Manual do Uso do Sistema de Peticionamento Eletrônico",
            descricao: "Feito com HTML E TAILWINDCSS",
            github: "https://github.com/helxysa/manual-mp-peticao",
            site: "https://manual-mp-peticao.vercel.app/",
            mostrarSite: true,
            stack: ["TailwindCSS"],
            status: "Finalizado"
        },
        {
            nome: "Ministerio Portal Legislação",
            descricao: "Prototipo de portal de acesso à legislação do Ministério Público do Estado do Amapa. Feito com HTML E TAILWINDCSS",
            github: "https://github.com/helxysa/ministerio-portal-lesgilacao",
            site: "https://ministerio-portal-lesgilacao.vercel.app/",
            mostrarSite: true,
            stack: ["TailwindCSS"],
            status: "Finalizado"
        },
        {
            nome: "Portfólio",
            descricao: "Portfólio pessoal de desenvolvedor frontend, com projetos e habilidades.",
            github: "https://github.com/helxysa/portfolio",
            site: "https://heloysa-portfolio.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"],
            status: "Em andamento"
        },
        {
            nome: "Uniway - Mobile",
            descricao: "UniWay é um projeto desenvolvido como parte do método avaliativo da disciplina Tópicos em Software Básico. O objetivo principal do UniWay é centralizar e facilitar o acesso a oportunidades de emprego, estágios, eventos, workshops, atividades extracurriculares e benefícios como bolsas de estudo, descontos, e muito mais, voltados especificamente para universitários.",
            github: "https://github.com/helxysa/UniWay",
            site: "teste",
            mostrarSite: true,
            stack: ["React Native"],
            status: "Em andamento"
        },
        {
            nome: "MSB - VAGAS",
            descricao: "Site de Gerenciamento de Vagas de Emprego da MSB, com sistema de cadastro de candidatos, cadastro de vagas, administração de vagas, autenticação de usuários com Firebase.",
            github: "https://github.com/helxysa/msb-site-vagas",
            site: "https://msb-site-vagas.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"],
            status: "Em andamento"
        },
        {
            nome: "⚖️ JUDBR",
            descricao: "Ladingpage de apresentação do Sistema JUDBR.",
            github: "https://github.com/helxysa/JUDBR-APJU",
            site: "https://judbr-novo.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"],
            status: "Em andamento"
        }
    ];

    const tecnologias = Array.from(new Set(projetos.flatMap(projeto => projeto.stack)));
    tecnologias.unshift('Todos');

    const projetosFiltrados = filtro === 'Todos' 
        ? projetos 
        : projetos.filter(projeto => projeto.stack.includes(filtro));

    const handleShowMore = () => {
        setVisibleCards(prev => prev + 3);
    };

    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
        setVisibleCards(3);
    };

    const prevPage = () => {
        setCurrentPage(prev => prev - 1);
        setVisibleCards(3);
    };

    const totalPages = Math.ceil(projetosFiltrados.length / cardsPerPage);
    const startIndex = (currentPage - 1) * cardsPerPage;
    const projetosAtuais = showAll 
        ? projetosFiltrados 
        : projetosFiltrados.slice(startIndex, startIndex + visibleCards);
    const hasMore = startIndex + visibleCards < projetosFiltrados.length;

    const handleShowAll = () => {
        setShowAll(true);
        setVisibleCards(projetosFiltrados.length);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setVisibleCards(3);
        setCurrentPage(1);
    };

    const handleFiltro = (tech: string) => {
        setFiltro(tech);
        setCurrentPage(1);
        setVisibleCards(3);
        setShowAll(false);
    };

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <main className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                    Meus Projetos
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Uma seleção dos meus melhores trabalhos em desenvolvimento frontend, 
                    focando em experiências interativas e design responsivo.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {tecnologias.map((tech) => (
                    <button
                        key={tech}
                        onClick={() => handleFiltro(tech)}
                        className={`px-6 py-2 rounded-full transition-all ${
                            filtro === tech ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            {isMobile ? (
                <div className="relative">
                    {/* Botões de navegação */}
                    <button 
                        onClick={() => setCurrentSlide(prev => prev === 0 ? projetosFiltrados.length - 1 : prev - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all"
                    >
                        <FaChevronLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                    </button>

                    <button 
                        onClick={() => setCurrentSlide(prev => prev === projetosFiltrados.length - 1 ? 0 : prev + 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all"
                    >
                        <FaChevronRight className="w-5 h-5 text-gray-800 dark:text-white" />
                    </button>

                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                            }}
                        >
                            {projetosFiltrados.map((projeto, index) => (
                                <div 
                                    key={index}
                                    className="w-full flex-shrink-0"
                                >
                                    <article className="project-card bg-white dark:bg-gray-800 group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mx-4">
                                        <div className="relative h-48 overflow-hidden">
                                            {projeto.mostrarSite && isValidUrl(projeto.site) && (
                                                <div className="w-full h-full">
                                                    <iframe 
                                                        src={projeto.site} 
                                                        className="w-full h-[800px] border-0"
                                                        title={projeto.nome}
                                                        loading="lazy"
                                                        style={{ 
                                                            transform: 'scale(0.25)', 
                                                            transformOrigin: 'top left',
                                                            pointerEvents: 'none',
                                                            width: '400%',
                                                            height: '400%'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {(!projeto.mostrarSite || !isValidUrl(projeto.site)) && (
                                                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                    <span className="text-gray-400 dark:text-gray-500">
                                                        Preview não disponível
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                                                <div className="absolute bottom-0 p-4 w-full">
                                                    <div className="flex flex-wrap gap-2">
                                                        {projeto.stack.map((tech, i) => (
                                                            <span key={i} className="px-2 py-1 bg-indigo-600/90 text-white rounded-md text-xs font-medium">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {projeto.nome}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                                {projeto.descricao}
                                            </p>
                                            <div className="flex gap-4 pt-2">
                                                <Link 
                                                    href={projeto.github} 
                                                    target="_blank"
                                                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors text-sm"
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
                                                    </svg>
                                                    GitHub
                                                </Link>
                                                {projeto.mostrarSite && (
                                                    <Link 
                                                        href={projeto.site} 
                                                        target="_blank"
                                                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors text-sm"
                                                    >
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Visitar Site
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicadores de slide para mobile */}
                    <div className="flex justify-center gap-2 mt-4">
                        {projetosFiltrados.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    currentSlide === index 
                                        ? 'bg-indigo-600 w-4' 
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projetosAtuais.map((projeto, index) => (
                            <article 
                                key={index} 
                                className="project-card bg-white dark:bg-gray-800 group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    {projeto.mostrarSite && isValidUrl(projeto.site) && (
                                        <div className="w-full h-full">
                                            <iframe 
                                                src={projeto.site} 
                                                className="w-full h-[800px] border-0"
                                                title={projeto.nome}
                                                loading="lazy"
                                                style={{ 
                                                    transform: 'scale(0.25)', 
                                                    transformOrigin: 'top left',
                                                    pointerEvents: 'none',
                                                    width: '400%',
                                                    height: '400%'
                                                }}
                                            />
                                        </div>
                                    )}
                                    {(!projeto.mostrarSite || !isValidUrl(projeto.site)) && (
                                        <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-400 dark:text-gray-500">
                                                Preview não disponível
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                                        <div className="absolute bottom-0 p-4 w-full">
                                            <div className="flex flex-wrap gap-2">
                                                {projeto.stack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-indigo-600/90 text-white rounded-md text-xs font-medium">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {projeto.nome}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                        {projeto.descricao}
                                    </p>
                                    <div className="flex gap-4 pt-2">
                                        <Link 
                                            href={projeto.github} 
                                            target="_blank"
                                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors text-sm"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
                                            </svg>
                                            GitHub
                                        </Link>
                                        {projeto.mostrarSite && (
                                            <Link 
                                                href={projeto.site} 
                                                target="_blank"
                                                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors text-sm"
                                            >
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Visitar Site
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4">
                            {currentPage > 1 && !showAll && (
                                <button
                                    onClick={prevPage}
                                    className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    <FaChevronLeft size={24} />
                                </button>
                            )}
                            
                            {!showAll && hasMore && currentPage === totalPages && (
                                <button
                                    onClick={handleShowMore}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                                >
                                    Mostrar Mais
                                </button>
                            )}

                            {currentPage < totalPages && !showAll && visibleCards <= cardsPerPage && (
                                <button
                                    onClick={nextPage}
                                    className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    <FaChevronRight size={24} />
                                </button>
                            )}
                        </div>

                        <div className="flex justify-center">
                            {!showAll && projetosFiltrados.length > 3 && (
                                <button
                                    onClick={handleShowAll}
                                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
                                >
                                    Ver todos os projetos
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}

                            {(showAll || visibleCards > 3) && (
                                <button
                                    onClick={handleShowLess}
                                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                    Mostrar menos
                                </button>
                            )}
                        </div>

                        {!showAll && (
                            <div className="flex justify-center gap-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentPage(index + 1);
                                            setVisibleCards(3);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            currentPage === index + 1
                                                ? 'bg-indigo-600 w-4' 
                                                : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}