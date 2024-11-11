'use client'

import Link from 'next/link'
import VSCodeSkills from './VSCodeSkills'
import TechCarousel from './TechCarousel'

export default function Hero() {
    const texts = {
        pt: {
            text1: 'Olá, eu sou',
            text2: 'Heloysa',
            text3: 'Desenvolvedora Front-End && Back-End em formação',
            button: 'Entre em contato'
        },
        en: {
            text1: 'Hi, I am',
            text2: 'Heloysa',
            text3: 'Front-End && Back-End Developer in the making',
            button: 'Contact me'
        }
    }

    return (
        <section className="min-h-[85vh] w-full flex flex-col items-start pt-32 justify-center bg-[#1e1e1e] relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 to-transparent" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl animate-pulse-slow delay-700" />
            </div>

            <div className="container mx-auto max-w-7xl">
                <div className="animate-float">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="space-y-6 md:space-y-8">
                            <div className="relative bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-500">
                                <div className="flex items-center gap-2 px-4 py-2 bg-[#3a3a3a] border-b border-[#4a4a4a]">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                        <span className="ml-4 sm:ml-5 text-xs sm:text-sm text-gray-400 font-mono tracking-wide">Profile.tsx</span>
                                    </div>
                                </div>
                                
                                <div className="p-6 md:p-8">
                                    <div className="space-y-4 md:space-y-6">
                                        <h1>
                                            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 font-light tracking-tight">
                                                {texts.pt.text1}
                                            </span>
                                            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-bold tracking-tight">
                                                {texts.pt.text2}
                                            </span>
                                        </h1>
                                        
                                        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
                                            {texts.pt.text3}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="#contato"
                                className="group inline-flex items-center justify-center px-5 py-2.5 
                                text-sm md:text-base text-white bg-purple-600/90 rounded-lg
                                transition-all duration-300 ease-out
                                hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/20
                                focus:outline-none focus:ring-2 focus:ring-purple-500/50
                                active:scale-[0.98]"
                            >
                                <span className="flex items-center">
                                    {texts.pt.button}
                                    <svg 
                                        className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </div>

                        <div className="relative w-full max-w-xl mx-auto lg:mx-0">
                            <div className="relative mt-8">
                                <VSCodeSkills />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mt-10 lg:mt-12">
                    <TechCarousel />
                </div>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}