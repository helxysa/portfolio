'use client'
import LoadingAnimation from './Loading'
import { useLanguage } from '../ContextLang/LanguageContext'

interface ContactCardProps {
    icon: string
    titleKey: string
    contentKey: string
    link: string
}

const ContactCard = ({ icon, titleKey, contentKey, link }: ContactCardProps) => {
    const { t } = useLanguage();
    
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 hover:shadow-purple-500/30 transition-all duration-500 hover:scale-[1.02] flex flex-col items-center text-center"
        >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300 mb-4">
                {icon}
            </span>
            <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300 mb-2">
                    {t(titleKey)}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {t(contentKey)}
                </p>
            </div>
        </a>
    )
}

export default function Contato() {
    const { t } = useLanguage();

    return (
        <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-gray-900 to-[#1e1e1e] relative" id="contato">
            <div className="stars absolute inset-0" />
            <div className="space-dust absolute inset-0" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                <div className="relative mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">
                        {t('contact.title')}
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-purple-500"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <div className="lg:col-span-2">
                        <LoadingAnimation />
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <ContactCard
                            icon="📧"
                            titleKey="contact.email.title"
                            contentKey="contact.email.content"
                            link="mailto:heloysagama2@email.com"
                        />
                        <ContactCard
                            icon="💬"
                            titleKey="contact.whatsapp.title"
                            contentKey="contact.whatsapp.content"
                            link="https://wa.me/5596981182114"
                        />
                        <ContactCard
                            icon="👩‍💻"
                            titleKey="contact.linkedin.title"
                            contentKey="contact.linkedin.content"
                            link="https://linkedin.com/in/heloysasz"
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
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
            `}</style>
        </section>
    )
}
