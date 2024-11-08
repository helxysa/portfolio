'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { SiTypescript, SiJavascript, SiNextdotjs, SiExpress, SiDjango, SiPrisma, SiSqlite } from 'react-icons/si'

import 'swiper/css'

interface TechItem {
    name: string
    icon: JSX.Element
}

export default function TechCarousel() {
    const technologies: TechItem[] = [
        { name: 'JavaScript', icon: <SiJavascript size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-yellow-400" /> },
        { name: 'React', icon: <FaReact size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" /> },
        { name: 'Next.js', icon: <SiNextdotjs size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" /> },
        { name: 'Express', icon: <SiExpress size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" /> },
        { name: 'Django', icon: <SiDjango size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-green-600" /> },
        { name: 'HTML', icon: <FaHtml5 size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-500" /> },
        { name: 'CSS', icon: <FaCss3Alt size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-500" /> },
        { name: 'TypeScript', icon: <SiTypescript size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600" /> },
        { name: 'Prisma', icon: <SiPrisma size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" /> },
        { name: 'SQLite', icon: <SiSqlite size={24} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" /> },
    ]

    return (
        <section className="w-full py-4 sm:py-6 md:py-8 lg:py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={2.5}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {technologies.map((tech, index) => (
                        <SwiperSlide key={index} className="py-1 sm:py-2">
                            <div className="flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer">
                                {tech.icon}
                                <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm lg:text-base text-white font-medium">
                                    {tech.name}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}