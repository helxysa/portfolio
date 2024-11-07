'use client'


import { useState } from 'react';
import Link from 'next/link';
export default function Projetos() {
    const [filtro, setFiltro] = useState('Todos');

    const projetos = [
        {
            nome: "Uniway - Mobile",
            descricao: "UniWay é um projeto desenvolvido como parte do método avaliativo da disciplina Tópicos em Software Básico. O objetivo principal do UniWay é centralizar e facilitar o acesso a oportunidades de emprego, estágios, eventos, workshops, atividades extracurriculares e benefícios como bolsas de estudo, descontos, e muito mais, voltados especificamente para universitários.",
            github: "https://github.com/helxysa/UniWay",
            site: "https://github.com/helxysa/UniWay",
            mostrarSite: true,
            stack: ["React Native"]
        },
        {
            nome: "MSB - VAGAS",
            descricao: "Site de Gerenciamento de Vagas de Emprego da MSB, com sistema de cadastro de candidatos, cadastro de vagas, administração de vagas, autenticação de usuários com Firebase.",
            github: "https://github.com/helxysa/msb-site-vagas",
            site: "https://msb-site-vagas.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"]
        },
        
        {
            nome: "⚖️ JUDBR",
            descricao: "Ladingpage de apresentação do Sistema JUDBR.",
            github: "https://github.com/helxysa/JUDBR-APJU",
            site: "https://judbr-novo.vercel.app/",
            mostrarSite: true,
            stack: ["Next.js"]
        }

    ];

    const tecnologias = Array.from(new Set(projetos.flatMap(projeto => projeto.stack)));
    tecnologias.unshift('Todos'); 

    const projetosFiltrados = filtro === 'Todos' 
        ? projetos 
        : projetos.filter(projeto => projeto.stack.includes(filtro));

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
                        onClick={() => setFiltro(tech)}
                        className={`px-6 py-2 rounded-full transition-all ${
                            filtro === tech ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projetosFiltrados.map((projeto, index) => (
                    <article key={index} className="project-card group relative rounded-xl overflow-hidden shadow-lg">
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-9">
                                <div className="w-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center overflow-hidden">
                                    {projeto.mostrarSite && (
                                        <div style={{ width: '1280px', height: '720px', overflow: 'hidden' }}>
                                            <iframe 
                                                src={projeto.site} 
                                                className="w-full h-full border-0"
                                                title={projeto.nome}
                                                allowFullScreen
                                                style={{ transform: 'scale(0.8)', transformOrigin: 'top left', pointerEvents: 'none', width: '1600px' }}
                                                scrolling="no"
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300">
                                <div className="absolute bottom-0 p-6 w-full">
                                    <div className="flex gap-3 mb-4">
                                        {projeto.stack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">{tech}</span>
                                        ))}
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{projeto.nome}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{projeto.descricao}</p>
                            <Link 
                                href={projeto.github} 
                                target="_blank"
                                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.9 1.54 2.36 1.1 2.94.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
                                </svg>
                                Acessar GitHub
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            <div className="text-center mt-12">
                
            </div>
        </main>
    );
}