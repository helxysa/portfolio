'use client'
import LoadingAnimation from './Loading'
import { useLanguage } from '../ContextLang/LanguageContext'

interface ContactCardProps {
    icon: string
    titleKey: string
    contentKey: string
    link: string
}

const EmailSVG = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" 
      className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WhatsAppSVG = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.87279 20C9.10904 20.6391 10.5124 21 12 21Z" 
      className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" 
      className="fill-purple-400 group-hover:fill-purple-300 transition-colors duration-300"/>
    <path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
      className="fill-purple-400 group-hover:fill-purple-300 transition-colors duration-300"/>
    <path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
      className="fill-purple-400 group-hover:fill-purple-300 transition-colors duration-300"/>
  </svg>
)

const LinkedInSVG = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" 
      className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 17V13.5V10" className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" 
      className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 7.01L7.01 6.99" className="stroke-purple-400 group-hover:stroke-purple-300 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ContactCard = ({ icon, titleKey, contentKey, link }: ContactCardProps) => {
    const { t } = useLanguage();
    
    const getIcon = () => {
        switch(icon) {
            case 'email': return <EmailSVG />;
            case 'whatsapp': return <WhatsAppSVG />;
            case 'linkedin': return <LinkedInSVG />;
            default: return null;
        }
    }
    
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[130px] sm:h-[150px] overflow-hidden rounded-lg transition-all duration-500 hover:scale-[1.02] bg-[#1e1e1e] border border-gray-800"
        >
            <div className="absolute top-0 left-0 right-0 h-7 bg-[#2d2d2d] flex items-center px-3">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-xs text-gray-400">
                </div>
            </div>

            <div className="relative h-full pt-10 px-4 font-mono">
               

                <div className="mt-2 text-sm flex items-center gap-2">
                    <span className="text-gray-300">$</span>
                    <span className="text-gray-300"></span>
                    <span className="text-green-400">{t(titleKey)}</span>
                </div>

                <div className="mt-3 text-sm">
                    <span className="text-gray-500"> {t(contentKey)}</span>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-purple-400">STATUS:</span>
                        <span className="text-green-400">ONLINE</span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default function Contato() {
    const { t } = useLanguage();

    return (
        <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-gray-900 to-[#1e1e1e] relative" id="contato">
            <div className="stars absolute inset-0" />
            <div className="space-dust absolute inset-0" />
            
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                <div className="relative mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-2">
                        {t('contact.title')}
                    </h1>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-[2px] bg-purple-500"></div>
                </div>

                <div className="block lg:flex lg:items-center lg:gap-12">
                    <div className="w-full lg:w-2/5 h-[300px] sm:h-[400px] lg:h-[500px] mb-8 lg:mb-0">
                        <div className="w-full h-full flex items-center justify-center">
                            <LoadingAnimation />
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 flex items-center">
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

                .bg-scanline {
                    background: linear-gradient(
                        to bottom,
                        transparent 0%,
                        rgba(255, 255, 255, 0.05) 50%,
                        transparent 100%
                    );
                    background-size: 100% 4px;
                    animation: scanline 10s linear infinite;
                }

                @keyframes scanline {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100%); }
                }
            `}</style>
        </section>
    )
}
