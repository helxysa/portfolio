'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

interface Projeto {
    nome: string;
    image?: string;
    descricao: string;
    github: string;
    site: string;
    mostrarSite: boolean;
    stack: string[];
    status: string;
}

const projetos = [
    {
        nome: "JUDBR",
        image: '/images/judbr-1.png',
        descricao: "Landing Page de Apresentação do Sistema Juridico JUDBR - versao 1",
        github: "https://github.com/helxysa/judbr-nextjs",
        site: "https://judbr-nextjs-kjng.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em Andamento"
    },
    {
        image: '/images/portfolio.png',
        nome: "Portfólio",
        descricao: "Portfólio pessoal de desenvolvedor frontend, com projetos e habilidades.",
        github: "https://github.com/helxysa/portfolio",
        site: "https://heloysa-portfolio.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em andamento"
    },
    {
        image: '/images/msb-vagas.png',
        nome: "MSB - VAGAS",
        descricao: "Site de Gerenciamento de Vagas de Emprego da MSB, com sistema de cadastro de candidatos, cadastro de vagas, administração de vagas, autenticação de usuários com Firebase.",
        github: "https://github.com/helxysa/msb-site-vagas",
        site: "https://msb-site-vagas.vercel.app/",
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
        image: '/images/judbr-2.png',
        nome: "⚖️ JUDBR",
        descricao: "Ladingpage de apresentação do Sistema JUDBR.",
        github: "https://github.com/helxysa/JUDBR-APJU",
        site: "https://judbr-novo.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em andamento"
    }
];

export default function Projetos() {
    const [stackSelecionada, setStackSelecionada] = useState('Todos')
    const [expandedCard, setExpandedCard] = useState<number | null>(null)
    const [mostrarTodos, setMostrarTodos] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    const stacks = ['Todos', ...new Set(projetos.flatMap(projeto => projeto.stack))]

    const projetosFiltrados = projetos.filter(projeto => 
        stackSelecionada === 'Todos' || projeto.stack.includes(stackSelecionada)
    )

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleScroll = useCallback(() => {
        if (sliderRef.current) {
            const scrollLeft = sliderRef.current.scrollLeft
            const slideWidth = sliderRef.current.clientWidth
            const newIndex = Math.round(scrollLeft / slideWidth)
            
            if (newIndex >= 0 && newIndex <= 2) {
                setActiveIndex(newIndex)
            }
        }
    }, [])

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const slideIndex = Number(entry.target.getAttribute('data-index'))
                        setActiveIndex(slideIndex)
                    }
                })
            },
            {
                root: slider,
                threshold: 0.5
            }
        )

        const slides = slider.querySelectorAll('.slide-item')
        slides.forEach((slide) => observer.observe(slide))

        slider.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            slides.forEach((slide) => observer.unobserve(slide))
            slider.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0))
        setScrollLeft(sliderRef.current?.scrollLeft || 0)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeft - walk
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0))
        setScrollLeft(sliderRef.current?.scrollLeft || 0)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeft - walk
        }
    }

    const handleToggleMostrar = () => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setMostrarTodos(prev => !prev);
        setExpandedCard(null);
        
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    };

    useEffect(() => {
        setExpandedCard(null);
        setMostrarTodos(false);
        setActiveIndex(0);
        setIsTransitioning(false);
        
        if (sliderRef.current) {
            sliderRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }, [stackSelecionada]);

    const projetosParaMostrar = mostrarTodos 
        ? projetosFiltrados 
        : projetosFiltrados.slice(0, 3)

    return (
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#1e1e1e] to-gray-900" id='projetos'>
            <div className="relative mb-6 sm:mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2" >
                    Meus Projetos
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-purple-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    {stacks.map((stack) => (
                        <button
                            key={stack}
                            onClick={() => setStackSelecionada(stack)}
                            className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                                stackSelecionada === stack
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            {stack}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
                {isMobile ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 px-4">
                            {projetosParaMostrar.map((projeto, index) => (
                                <div 
                                    key={index}
                                    className="w-full max-w-[320px] mx-auto"
                                >
                                    <ProjetoCard 
                                        projeto={projeto} 
                                        index={index}
                                        expandido={expandedCard === index}
                                        onToggleExpand={() => setExpandedCard(expandedCard === index ? null : index)}
                                    />
                                </div>
                            ))}
                        </div>

                        {projetosFiltrados.length > 3 && (
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={handleToggleMostrar}
                                    disabled={isTransitioning}
                                    className={`
                                        group relative w-full max-w-[300px] px-6 py-3 
                                        bg-gradient-to-r from-purple-600 to-purple-700 
                                        text-white rounded-lg overflow-hidden
                                        transition-all duration-300 
                                        shadow-lg hover:shadow-xl hover:shadow-purple-600/50 
                                        hover:-translate-y-0.5 active:translate-y-0
                                        ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                >
                                    <div className="absolute inset-0 bg-purple-800/50 transform origin-left 
                                        scale-x-0 group-hover:scale-x-100 transition-transform duration-300"/>
                                    <div className="relative flex items-center justify-center gap-2">
                                        <span className="font-medium">
                                            {mostrarTodos ? 'Mostrar Menos' : 'Mostrar Mais'}
                                        </span>
                                        <svg 
                                            className={`w-4 h-4 transition-transform duration-300 ${
                                                mostrarTodos ? 'rotate-180' : ''
                                            }`}
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        initialSlide={2}
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 30
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 35
                            }
                        }}
                        navigation
                        pagination={{ 
                            clickable: true,
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-purple-600',
                            bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100 hover:!bg-purple-400'
                        }}
                        className="!overflow-visible !pt-4 !pb-8 sm:!pt-6 sm:!pb-10 md:!pt-8 md:!pb-12"
                    >
                        {projetosFiltrados.map((projeto, index) => (
                            <SwiperSlide key={index} className="!w-[260px] xs:!w-[280px] sm:!w-[320px] md:!w-[380px]">
                                <ProjetoCard 
                                    projeto={projeto} 
                                    index={index}
                                    expandido={expandedCard === index}
                                    onToggleExpand={() => setExpandedCard(expandedCard === index ? null : index)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}

interface ProjetoCardProps {
    projeto: Projeto;
    index: number;
    expandido: boolean;
    onToggleExpand: () => void;
}

const ProjetoCard = ({ projeto, index, expandido, onToggleExpand }: ProjetoCardProps) => {
    const handleCardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        
        const target = e.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'a' || 
            target.closest('a')) {
            return;
        }

        onToggleExpand();
    };

    return (
        <button 
            type="button"
            onClick={handleCardClick}
            aria-expanded={expandido}
            aria-label={`Expandir detalhes do projeto ${projeto.nome}`}
            className={`w-full text-left group bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/30 border border-gray-700/50 ${
                expandido ? 'scale-[1.02]' : ''
            }`}
        >
            <div className="relative h-36 xs:h-40 sm:h-44 md:h-56 overflow-hidden">
                {projeto.image ? (
                    <Image
                        src={projeto.image}
                        alt={`Screenshot do projeto ${projeto.nome}`}
                        width={380}
                        height={214}
                        className={`object-cover object-top w-full h-full transform transition-transform duration-700 ease-out ${
                            expandido ? 'scale-110' : 'scale-100 group-hover:scale-110'
                        }`}
                        quality={90}
                        priority={index < 2}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = '/placeholder-project.png';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-xs sm:text-sm">Sem imagem</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
            </div>

            <div className="p-3 xs:p-4 sm:p-6 md:p-8">
                <h2 className="text-sm xs:text-base sm:text-xl md:text-2xl font-bold text-white mb-1 xs:mb-2 sm:mb-3 md:mb-4 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                    {projeto.nome}
                </h2>
                
                <p className={`text-xs xs:text-sm sm:text-base text-gray-300 mb-2 xs:mb-3 sm:mb-4 md:mb-6 ${
                    expandido ? '' : 'line-clamp-2 sm:line-clamp-3'
                } group-hover:text-gray-200 transition-colors duration-300`}>
                    {projeto.descricao}
                </p>

                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2">
                        {projeto.stack.map((tech: string, techIndex: number) => (
                            <span 
                                key={techIndex}
                                className="px-1.5 py-0.5 xs:px-2 sm:px-3 sm:py-1 bg-purple-500/10 rounded-full text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-purple-400 font-medium backdrop-blur-sm border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex gap-1.5 xs:gap-2 sm:gap-3 md:gap-4" onClick={e => e.stopPropagation()}>
                        <a 
                            href={projeto.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Ver código no GitHub do projeto ${projeto.nome}`}
                            className="flex-1 bg-gray-700/80 text-white text-center py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-[10px] xs:text-xs sm:text-sm md:text-base font-medium 
                            hover:bg-gray-600 transition-all duration-300 
                            shadow-md hover:shadow-xl hover:shadow-gray-700/50 
                            backdrop-blur-sm border border-gray-600/20 
                            hover:-translate-y-0.5 active:translate-y-0"
                        >
                            GitHub
                        </a>
                        {projeto.mostrarSite && (
                            <a 
                                href={projeto.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visitar site do projeto ${projeto.nome}`}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-[10px] xs:text-xs sm:text-sm md:text-base font-medium 
                                hover:from-purple-500 hover:to-purple-600 
                                transition-all duration-300 
                                shadow-md hover:shadow-xl hover:shadow-purple-500/50 
                                border border-purple-500/20 
                                hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Visitar Site
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </button>
    );
};