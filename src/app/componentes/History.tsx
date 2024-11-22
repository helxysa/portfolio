'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import SpaceShip from './SpaceShip'
import { useLanguage } from '../ContextLang/LanguageContext'
import { Language } from '../translations'
import { useCursor } from '../ContextCursor/ContextCursor'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface HistoricoItem {
    ano: string
    tipo: 'educacao' | 'experiencia'
    timelineKey: string
    isHit?: boolean
}

const historicoItems: HistoricoItem[] = [
    {
        ano: '2023',
        tipo: 'educacao',
        timelineKey: 'computerScience'
    },
    {
        ano: '2023',
        tipo: 'experiencia',
        timelineKey: 'monitoring'
    },
    {
        ano: '2023',
        tipo: 'experiencia',
        timelineKey: 'unifapDigital'
    },
    {
        ano: '2024',
        tipo: 'experiencia',
        timelineKey: 'ministerioPublico'
    },
    {
        ano: '2024',
        tipo: 'experiencia',
        timelineKey: 'tedplan'
    }
]

export default function Historico() {
    const [items, setItems] = useState(historicoItems)
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(true)
    const sectionRef = useRef<HTMLElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const [expandedCard, setExpandedCard] = useState<number | null>(null)
    const [spaceshipEnabled, setSpaceshipEnabled] = useState(true)
    const [showPulse, setShowPulse] = useState(true)
    const [isShooting, setIsShooting] = useState(false)
    const { t, currentLanguage } = useLanguage();
    const { setHideCursor } = useCursor()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                setIsVisible(entry.isIntersecting)
            },
            {
                root: null, 
                rootMargin: '0px',
                threshold: 0.3 
            }
        )

        const currentRef = sectionRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [])

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()

        window.addEventListener('resize', checkIfMobile)

        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setShowPulse(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [isVisible])

    useEffect(() => {
        if (!isMobile && isVisible && spaceshipEnabled) {
            setHideCursor(true)
        } else {
            setHideCursor(false)
        }
        
        return () => {
            setHideCursor(false)
        }
    }, [isMobile, isVisible, spaceshipEnabled, setHideCursor])

    const handleHit = useCallback((index: number) => {
        setItems(prev => prev.map((item, i) => {
            if (i === index) {
                return { ...item, isHit: !item.isHit }
            }
            return item
        }))
    }, [])

    const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
        if (cardsRef.current) {
            cardsRef.current[index] = el
        }
    }, [])

    return (
        <section 
            ref={sectionRef} 
            id="linha-do-tempo"
            className={`relative min-h-[80vh] sm:min-h-screen bg-gradient-to-b from-gray-900 to-[#1e1e1e] py-4 sm:py-20 ${!isMobile ? 'pb-8 lg:pb-4' : ''}`}
        >
            {!isMobile && isVisible && spaceshipEnabled && (
                <div className="spaceship-container">
                    <SpaceShip 
                        onHit={handleHit} 
                        cardsRef={cardsRef}
                    />
                </div>
            )}

            {!isMobile && spaceshipEnabled && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                    <span className={`
                        text-lg font-bold transition-all duration-300
                        ${isShooting 
                            ? 'text-purple-400 animate-pulse' 
                            : 'text-gray-400/80 hover:text-purple-400/80'
                        }
                    `}>
                        
                    </span>
                </div>
            )}

            <div className="stars absolute inset-0" />
            <div className="space-dust absolute inset-0" />
            
            <div className="relative mb-8 sm:mb-8 md:mb-10 mt-1 sm:mt-6 md:mt-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                    {t('timeline.title')}
                </h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-purple-500"></div>
            </div>

            <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-16">
                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => {
                            const descriptionText = t(`timeline.items.${item.timelineKey}.${currentLanguage}.descricao`);
                            const isLongText = descriptionText.length > 150;

                            return (
                                <div
                                    key={index}
                                    ref={(el) => setCardRef(el, index)}
                                    className={`w-full transform transition-all duration-500 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 ${
                                        item.isHit ? 'scale-105 rotate-1 animate-hit' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-purple-400 text-sm font-medium">
                                            {item.ano}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            item.tipo === 'educacao' 
                                                ? 'bg-blue-500/10 text-blue-400' 
                                                : 'bg-green-500/10 text-green-400'
                                        }`}>
                                            {item.tipo === 'educacao' 
                                                ? t('timeline.education') 
                                                : t('timeline.experience')
                                            }
                                        </span>
                                    </div>

                                    <h3 className="text-white text-lg font-semibold mb-2">
                                        {t(`timeline.items.${item.timelineKey}.${currentLanguage}.titulo`)}
                                    </h3>

                                    <p className={`text-sm text-gray-300 ${
                                        isLongText ? (expandedCard === index ? 'line-clamp-none' : 'line-clamp-2') : ''
                                    }`}>
                                        {t(`timeline.items.${item.timelineKey}.${currentLanguage}.descricao`)}
                                    </p>

                                    {isLongText && (
                                        <button
                                            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                                            className={`mt-2 text-sm font-medium flex items-center gap-1.5 w-full justify-center py-2 rounded-lg transition-all duration-300 ${
                                                expandedCard === index 
                                                    ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20' 
                                                    : 'text-gray-400 bg-gray-500/10 border border-gray-500/20 hover:bg-gray-500/20 hover:text-purple-400'
                                            }`}
                                        >
                                            {expandedCard === index ? t('timeline.showLess') : t('timeline.showMore')}
                                            <svg 
                                                className={`w-4 h-4 transition-transform duration-300 ${
                                                    expandedCard === index ? 'rotate-180' : ''
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
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        initialSlide={2}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 3,
                            slideShadows: false,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.1,
                                spaceBetween: 8,
                            },
                            375: {
                                slidesPerView: 1.1,
                                spaceBetween: 10
                            },
                            425: {
                                slidesPerView: 1.2,
                                spaceBetween: 12
                            },
                            480: {
                                slidesPerView: 1.2,
                                spaceBetween: 15
                            },
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 20
                            },
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
                        className="!overflow-visible !pt-0 !pb-8 sm:!pt-6 sm:!pb-12"
                    >
                        <div className="swiper-wrapper">
                            {items.map((item, index) => (
                                <SwiperSlide 
                                    key={index}
                                    className="!h-auto py-1 sm:py-4"
                                >
                                    <div
                                        ref={(el) => setCardRef(el, index)}
                                        className={`w-full transform transition-all duration-500 ${
                                            expandedCard === index 
                                                ? 'h-[400px] z-50 scale-[1.02]' 
                                                : 'h-[220px] sm:h-[250px] hover:scale-[1.02]'
                                        } ${
                                            item.isHit ? 'scale-105 rotate-1 animate-hit' : ''
                                        }`}
                                    >
                                        <div 
                                            className={`group bg-gray-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg md:shadow-xl transform transition-all duration-500 ${
                                                item.isHit 
                                                    ? 'border-purple-500 shadow-purple-500/50 ring-2 ring-purple-500/50 animate-card-hit' 
                                                    : expandedCard === index 
                                                        ? 'border-purple-500 shadow-purple-500/50 ring-2 ring-purple-500/50' 
                                                        : 'border-gray-700/50 hover:border-purple-500/50 hover:shadow-purple-500/30'
                                            } border relative h-full cursor-pointer`}
                                            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                                        >
                                            <div className="flex flex-col p-4 sm:p-6 h-full relative">
                                                <div className="flex items-start justify-between mb-3">
                                                    <span className="text-sm text-gray-400 font-medium">
                                                        {item.ano}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.tipo === 'educacao' 
                                                            ? 'text-blue-300 border-blue-500/20 bg-blue-500/5' 
                                                            : 'text-green-300 border-green-500/20 bg-green-500/5'
                                                    } border transition-colors duration-300`}>
                                                        {item.tipo === 'educacao' 
                                                            ? t('timeline.education') 
                                                            : t('timeline.experience')
                                                        }
                                                    </span>
                                                </div>

                                                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                                    {t(`timeline.items.${item.timelineKey}.${currentLanguage}.titulo`)}
                                                </h3>

                                                <p className={`text-sm text-gray-300 group-hover:text-gray-200 transition-all duration-500 ${
                                                    expandedCard === index ? 'line-clamp-none' : 'line-clamp-2'
                                                }`}>
                                                    {t(`timeline.items.${item.timelineKey}.${currentLanguage}.descricao`)}
                                                </p>

                                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-gray-800/95 via-gray-800/80 to-transparent">
                                                    <div
                                                        className={`flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
                                                            expandedCard === index 
                                                                ? 'text-purple-400 hover:text-purple-300' 
                                                                : 'text-gray-400 hover:text-purple-400'
                                                        }`}
                                                    >
                                                        <span>{expandedCard === index ? t('timeline.showLess') : t('timeline.showMore')}</span>
                                                        <svg 
                                                            className={`w-5 h-5 transition-transform duration-300 ${
                                                                expandedCard === index ? 'rotate-180' : ''
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                )}
            </div>

            {!isMobile && (
                <div className="text-center mt-4">
                    <span className={`
                        text-lg font-bold transition-all duration-300
                        ${isShooting 
                            ? 'text-purple-400 animate-pulse' 
                            : 'text-gray-400/80 hover:text-purple-400/80'
                        }
                    `}>
                        {isShooting ? t('timeline.shootingText') : t('timeline.shootInstruction')}
                    </span>
                </div>
            )}

            {!isMobile && (
                <button
                    onClick={() => setSpaceshipEnabled(!spaceshipEnabled)}
                    className={`absolute bottom-8 right-8 lg:bottom-10 lg:right-10 xl:bottom-12 xl:right-12 2xl:bottom-16 2xl:right-16 3xl:bottom-20 3xl:right-20 
                        px-3 py-1.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 
                        rounded-full bg-gray-800/80 backdrop-blur-sm border transition-all duration-300 group z-10 hidden lg:block
                        ${showPulse && isVisible ? 'animate-pulse-border' : 'border-gray-700/50 hover:border-purple-500/50'} 
                        hover:shadow-purple-500/30 cursor-pointer`}
                >
                    <div className={`flex items-center gap-1.5 text-xs lg:text-sm xl:text-base ${
                        showPulse && isVisible ? 'animate-pulse-text' : 'text-gray-400 group-hover:text-purple-400'
                    }`}>
                        {spaceshipEnabled ? (
                            <>
                                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('timeline.disableSpaceship')}</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('timeline.enableSpaceship')}</span>
                            </>
                        )}
                    </div>
                </button>
            )}

            <style jsx>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .stars {
                    background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                                    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                                    radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0));
                    background-size: 200px 200px;
                    animation: stars-move 100s linear infinite;
                }

                .space-dust {
                    background-image: radial-gradient(1px 1px at 25px 25px, #fff, rgba(0,0,0,0));
                    background-size: 100px 100px;
                    animation: dust-move 50s linear infinite;
                }

                @keyframes stars-move {
                    from { transform: translateY(0); }
                    to { transform: translateY(-1000px); }
                }

                @keyframes dust-move {
                    from { transform: translateX(0); }
                    to { transform: translateX(-1000px); }
                }

                @keyframes shine {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }

                .animate-shine {
                    animation: shine 2s infinite;
                }

                @keyframes hit {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.05) rotate(1deg); }
                }

                @keyframes card-hit {
                    0% { 
                        border-color: rgb(168, 85, 247);
                        box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
                    }
                    100% { 
                        border-color: rgba(107, 114, 128, 0.5);
                        box-shadow: none;
                    }
                }

                .animate-hit {
                    animation: hit 1s ease-in-out;
                }

                .animate-card-hit {
                    animation: card-hit 1s ease-in-out;
                }

                .spaceship-container {
                    position: relative;
                    z-index: 10;
                }

                button, a {
                    cursor: pointer !important;
                }
                
                .swiper-button-next,
                .swiper-button-prev,
                .swiper-pagination-bullet {
                    cursor: pointer !important;
                }
            `}</style>
        </section>
    )
}