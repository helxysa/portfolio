'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import Image from 'next/image'
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { useLanguage } from '../ContextLang/LanguageContext'

interface Projeto {
    nome: string;
    image?: string;
    descricaoKey: string;
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
        descricaoKey: "judbr1",
        github: "https://github.com/helxysa/judbr-nextjs",
        site: "https://judbr-nextjs-kjng.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em Andamento"
    },
    {
        image: '/images/portfolio.png',
        nome: "Portfólio",
        descricaoKey: "portfolio",
        github: "https://github.com/helxysa/portfolio",
        site: "https://heloysa-portfolio.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em andamento"
    },
    {
        nome: "Uniway - Mobile",
        descricaoKey: "uniway",
        github: "https://github.com/helxysa/UniWay",
        site: "teste",
        mostrarSite: true,
        stack: ["React Native"],
        status: "Em andamento"
    },
    {
        image: '/images/judbr-2.png',
        nome: "⚖️ JUDBR",
        descricaoKey: "judbr2",
        github: "https://github.com/helxysa/JUDBR-APJU",
        site: "https://judbr-novo.vercel.app/",
        mostrarSite: true,
        stack: ["Next.js"],
        status: "Em andamento"
    }
];

export default function Projetos() {
    const { t, currentLanguage } = useLanguage();
    const [stackSelecionada, setStackSelecionada] = useState('')
    const [expandedCard, setExpandedCard] = useState<number | null>(null)
    const [mostrarTodos, setMostrarTodos] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const swiperRef = useRef<SwiperType>();

    useEffect(() => {
        if (currentLanguage) {
            setStackSelecionada(t('projects.filterAll'));
        }
    }, [t, currentLanguage]);

    if (!currentLanguage) {
        return null;
    }

    const stacks = [t('projects.filterAll'), ...new Set(projetos.flatMap(projeto => projeto.stack))]

    const projetosFiltrados = projetos.filter(projeto => 
        stackSelecionada === t('projects.filterAll') || projeto.stack.includes(stackSelecionada)
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

    const handleToggleMostrar = useCallback(() => {
        if (isTransitioning) return
        
        setIsTransitioning(true)
        setMostrarTodos(prev => !prev)
        setExpandedCard(null)
        
        setTimeout(() => {
            setIsTransitioning(false)
        }, 200)
    }, [isTransitioning])

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

    useEffect(() => {
        const enableInteractions = () => {
            document.documentElement.style.cursor = ''
            const projectsSection = document.getElementById('projetos')
            if (projectsSection) {
                const interactiveElements = projectsSection.querySelectorAll('button, a, .clickable, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet')
                interactiveElements.forEach(element => {
                    if (element instanceof HTMLElement) {
                        element.style.cursor = 'pointer'
                        element.style.pointerEvents = 'auto'
                    }
                })
            }
        }

        enableInteractions()

        const observer = new MutationObserver(enableInteractions)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        })

        return () => {
            observer.disconnect()
            enableInteractions()
        }
    }, [])

    useEffect(() => {
        const handleVisibilityChange = () => {
            const projectsSection = document.getElementById('projetos')
            if (projectsSection && projectsSection.matches(':hover')) {
                document.documentElement.style.cursor = ''
                const interactiveElements = projectsSection.querySelectorAll('button, a, .clickable')
                interactiveElements.forEach(element => {
                    if (element instanceof HTMLElement) {
                        element.style.cursor = 'pointer'
                        element.style.pointerEvents = 'auto'
                    }
                })
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, [])

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.on('slideChange', () => {
                const buttons = document.querySelectorAll('button, a, .clickable')
                buttons.forEach(button => {
                    if (button instanceof HTMLElement) {
                        button.style.pointerEvents = 'auto'
                        button.style.cursor = 'pointer'
                    }
                })
            })
        }
    }, [swiperRef.current])

    return (
        <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#1e1e1e] to-gray-900" id='projetos'>
            <div className="relative mb-6 sm:mb-8 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl pb-4 lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2" >
                    {t('projects.title')}
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
                {!mostrarTodos ? (
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        coverflowEffect={{
                            rotate: 20,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.1,
                                spaceBetween: 12,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 25
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                        pagination={{ 
                            clickable: true,
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-purple-600',
                            bulletClass: 'swiper-pagination-bullet !bg-gray-400 !opacity-100 hover:!bg-purple-400'
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        className="!overflow-visible !pt-4 !pb-8 sm:!pt-6 sm:!pb-10 md:!pt-8 md:!pb-12"
                    >
                        {projetosFiltrados.map((projeto, index) => (
                            <SwiperSlide key={index}>
                                {({ isActive }) => (
                                    <div className={`
                                        transform transition-all duration-500 
                                        ${isActive 
                                            ? 'scale-100 opacity-100 shadow-lg shadow-purple-500/20' 
                                            : 'scale-[0.85] opacity-30 blur-[0.5px]'
                                        }
                                    `}>
                                        <ProjetoCard 
                                            projeto={projeto}
                                            index={index}
                                            expandido={expandedCard === index}
                                            onToggleExpand={() => setExpandedCard(expandedCard === index ? null : index)}
                                        />
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projetosFiltrados.map((projeto, index) => (
                            <div key={index} className="transform transition-all duration-500">
                                <ProjetoCard 
                                    projeto={projeto}
                                    index={index}
                                    expandido={expandedCard === index}
                                    onToggleExpand={() => setExpandedCard(expandedCard === index ? null : index)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {!isMobile && projetosFiltrados.length > 3 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setMostrarTodos(!mostrarTodos)}
                            className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 
                                text-white rounded-lg overflow-hidden transition-all duration-300
                                hover:shadow-lg hover:shadow-purple-500/30"
                        >
                            <span className="relative z-10">
                                {mostrarTodos ? t('projects.showLess') : t('projects.showMore')}
                            </span>
                        </button>
                    </div>
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
    const { t, currentLanguage } = useLanguage();
    
    const handleCardClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        
        const target = e.target as HTMLElement
        if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
            return
        }

        onToggleExpand()
    }, [onToggleExpand])

    return (
        <button 
            type="button"
            onClick={handleCardClick}
            className={`
                w-full h-[500px] text-left group 
                bg-gray-800/80 backdrop-blur-sm 
                rounded-lg overflow-hidden 
                shadow-lg border border-gray-700/50
                transform transition-all duration-500 
                hover:scale-[1.02] hover:shadow-purple-500/30
                flex flex-col
            `}
        >
            <div className="relative w-full h-[220px] shrink-0 bg-gray-800">
                {projeto.image ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={projeto.image}
                            alt={`Screenshot do projeto ${projeto.nome}`}
                            fill
                            className="object-cover"
                            quality={90}
                            priority={index < 2}
                            sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                            style={{ objectPosition: 'top center' }}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-gray-700/50 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-10 h-10 text-gray-400" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={1.5} 
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-base font-medium">
                                {projeto.nome}
                            </span>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col flex-grow p-4 sm:p-6">
                <div className="flex-grow">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-1">
                        {projeto.nome}
                    </h2>
                    
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2 sm:line-clamp-3">
                        {t(`projects.descriptions.${projeto.descricaoKey}.${currentLanguage}`)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {projeto.stack.map((tech: string, techIndex: number) => (
                            <span 
                                key={techIndex}
                                className="px-2 py-1 bg-purple-500/10 rounded-full text-xs text-purple-400 font-medium backdrop-blur-sm border border-purple-500/20"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 mt-auto" onClick={e => e.stopPropagation()}>
                    <a 
                        href={projeto.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver código no GitHub do projeto ${projeto.nome}`}
                        className="flex-1 bg-gray-700/80 text-white text-center py-2 rounded-lg text-sm font-medium 
                        hover:bg-gray-600 transition-all duration-300 
                        shadow-md hover:shadow-lg hover:shadow-gray-700/50"
                    >
                        GitHub
                    </a>
                    {projeto.mostrarSite && (
                        <a 
                            href={projeto.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visitar site do projeto ${projeto.nome}`}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-2 rounded-lg text-sm font-medium 
                            hover:from-purple-500 hover:to-purple-600 
                            transition-all duration-300 
                            shadow-md hover:shadow-lg hover:shadow-purple-500/50"
                        >
                            {t('projects.visitSite')}
                        </a>
                    )}
                </div>
            </div>
        </button>
    );
};
