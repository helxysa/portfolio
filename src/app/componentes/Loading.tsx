'use client'

import { useEffect, useState } from 'react';
import { useLanguage } from '../ContextLang/LanguageContext'

const LoadingAnimation = () => {
  const { t, currentLanguage } = useLanguage();
  const [isTyping, setIsTyping] = useState(true);
  const [dots, setDots] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  const finalText = 'document.write(me_contte)';

  const messages = t('loading.messages');
  const subMessages = t('loading.subMessages');

  useEffect(() => {
    if (isTyping && textIndex < finalText.length) {
      const typingTimeout = setTimeout(() => {
        setTypedText(prev => prev + finalText[textIndex]);
        setTextIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(typingTimeout);
    }
    if (!isTyping) {
      setTypedText('');
      setTextIndex(0);
    }
  }, [textIndex, isTyping]);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 800);

    const typingInterval = setInterval(() => {
      setIsTyping((prev) => !prev);
    }, 4000);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(typingInterval);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  const currentMessage = isTyping 
    ? `${messages[messageIndex]}${'.'.repeat(dots)}`
    : t('loading.error');

  const currentSubMessage = isTyping 
    ? subMessages[messageIndex]
    : t('loading.errorSub');

  const getColoredText = () => {
    const parts = typedText.split(/([.()])/)
    return (
      <div className="flex items-center mt-0.5">
        <span className="text-gray-500 text-[10px] mr-1">6</span>
        {parts.map((part, i) => {
          if (part === 'document') return <span key={i} className="text-blue-400 text-[10px]">{part}</span>
          if (part === '.') return <span key={i} className="text-white text-[10px]">{part}</span>
          if (part === 'write') return <span key={i} className="text-yellow-300 text-[10px]">{part}</span>
          if (part === '(' || part === ')') return <span key={i} className="text-white text-[10px]">{part}</span>
          if (part === 'me_contte') return <span key={i} className="text-blue-300 text-[10px]">{part}</span>
          return <span key={i} className="text-[10px]">{part}</span>
        })}
        <span className="text-white text-[10px] animate-cursor">|</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-4 sm:py-8">
      <div className="text-center">
        <div className="relative w-48 sm:w-48 md:w-56 lg:w-64 h-48 sm:h-48 md:h-56 lg:h-64 mx-auto mb-4 sm:mb-6">
          

          <div className="absolute bottom-0 w-full h-6 bg-gray-700 shadow-lg rounded-t-lg" />
          
          <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-40 sm:w-40 md:w-48 lg:w-56 h-28 sm:h-28 md:h-32 lg:h-36 bg-gray-800 border-4 border-gray-700 rounded-lg shadow-lg ${!isTyping ? 'monitor-shake' : ''}`}>
            <div className={`w-full h-full bg-[#1E1E1E] pixel-art rounded-sm ${!isTyping ? 'screen-flicker' : ''}`}>
              <div className="w-full h-full flex flex-col">
                <div className={!isTyping ? 'hidden' : ''}>
                  <div className="flex flex-col text-left w-full pl-1">
                    <div className="flex items-center">
                      <span className="text-gray-500 text-[10px] mr-1">1</span>
                      <span className="text-pink-500 text-[10px]">const &nbsp;</span>
                      <span className="text-blue-400 text-[10px]">me_contate &nbsp;</span>
                      <span className="text-white text-[10px]"> =</span>
                    </div>
                    <div className="flex items-center mt-0.5">
                      <span className="text-gray-500 text-[10px] mr-1">2</span>
                      <span className="text-white text-[10px]">{'{'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-[10px] mr-1">3</span>
                      <span className="text-[10px] text-[#9CDCFE]">email</span>
                      <span className="text-white text-[10px]">:</span>
                      <span className="text-[10px] text-[#CE9178]"> {'"heloysagama2@gmail.com"'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-[10px] mr-1">4</span>
                      <span className="text-[10px] text-[#9CDCFE]">linkedin</span>
                      <span className="text-white text-[10px]">:</span>
                      <span className="text-[10px] text-[#CE9178]"> {'"@heloysasz"'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 text-[10px] mr-1">5</span>
                      <span className="text-white text-[10px]">{'}'}</span>
                    </div>
                    <div className="flex items-center mt-0.5">
                      <div className="w-[180px] overflow-hidden">
                        {getColoredText()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={isTyping ? 'hidden' : 'w-full h-full flex flex-col items-center justify-center'}>
                  <div className="text-red-500 text-lg font-bold loading-text">404</div>
                  <div className="text-gray-400 text-xs loading-text">NOT FOUND</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 sm:w-12 md:w-14 lg:w-16 h-6 sm:h-6 md:h-7 lg:h-8 bg-gray-700 rounded-lg shadow-md ${!isTyping ? 'monitor-shake' : ''}`}>
            <div className="absolute bottom-0 w-16 h-2 bg-gray-600 left-1/2 transform -translate-x-1/2 rounded-lg" />
          </div>
          
          <div className={`absolute bottom-16 left-[80%] transform -translate-x-1/2 scale-90 sm:scale-90 md:scale-100 lg:scale-110 ${isTyping ? 'typing-animation' : 'frustrated-animation'}`}>
            <div className={`w-20 h-20 rounded-full relative shadow-md head ${isTyping ? 'bg-yellow-200' : 'bg-red-500'}`}>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 flex items-center">
                <div className="absolute w-3 h-1.5 bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="w-6 h-6 rounded-lg border-2 border-black bg-white/10 relative">
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white/40 rounded-full transform rotate-45" />
                </div>
                <div className="w-6 h-6 rounded-lg border-2 border-black bg-white/10 ml-4 relative">
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-white/40 rounded-full transform rotate-45" />
                </div>
                <div className="absolute w-2.5 h-1.5 bg-black -left-2 top-1/2 transform -translate-y-1/2" />
                <div className="absolute w-2.5 h-1.5 bg-black -right-2 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <div className="absolute top-5 left-4 w-4 h-4 bg-white rounded-full eye-blink">
                <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full" />
              </div>
              <div className="absolute top-5 right-4 w-4 h-4 bg-white rounded-full eye-blink">
                <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full" />
              </div>
              <div className="absolute top-3 left-3 w-6 h-2 bg-yellow-600 rounded" 
                style={{ transform: !isTyping ? 'rotate(30deg) translateY(2px)' : 'none' }} />
              <div className="absolute top-3 right-3 w-6 h-2 bg-yellow-600 rounded"
                style={{ transform: !isTyping ? 'rotate(-30deg) translateY(2px)' : 'none' }} />
              <div className={`absolute bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg mouth-animation ${
                isTyping ? 'w-8 h-3 bg-red-400' : 'w-6 h-2 bg-red-900'
              }`} />
            </div>
          </div>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white loading-text font-bold">{currentMessage}</p>
        <p className="text-xs sm:text-sm md:text-base text-gray-400 loading-text mt-2">{currentSubMessage}</p>
      </div>
    </div>
  );
};

export default LoadingAnimation;