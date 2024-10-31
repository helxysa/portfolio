'use client';

import { useState, useEffect } from 'react';

const technologies = [
  {
    name: 'JavaScript',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="#F7DF1E" d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  {
    name: 'TypeScript',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#3178C6" d="M233.387 36.651h245.226v245.226H233.387z"/>
        <path fill="#fff" d="M324.937 188.063c3.769 0 7.164-.558 10.186-1.675v-15.022c-3.022 1.489-6.044 2.233-9.069 2.233-4.885 0-7.328-2.233-7.328-6.695v-37.907h16.397v-14.464h-16.397v-20.045h-16.397v20.045h-10.186v14.464h10.186v39.582c0 12.977 6.417 19.484 22.608 19.484zm56.569-.558h16.397v-35.674c0-19.484 11.303-29.419 27.7-29.419 3.769 0 7.164.558 10.186 1.675v-15.022c-3.022-1.117-6.044-1.675-9.069-1.675-12.977 0-23.163 7.812-27.7 18.925h-.558v-17.25h-16.397v78.44h-.558zm116.695 1.675c19.484 0 34.557-13.535 34.557-31.347 0-17.25-15.022-24.414-28.837-29.419-10.744-3.769-20.045-7.164-20.045-14.464 0-5.861 5.303-10.186 13.535-10.186 7.812 0 13.535 3.769 14.464 10.186h16.397c-.558-14.464-12.977-23.722-30.789-23.722-16.955 0-30.231 9.628-30.231 25.531 0 16.397 14.464 23.163 27.7 27.7 11.303 4.327 20.603 7.164 20.603 15.581 0 6.695-6.417 11.303-15.581 11.303-9.628 0-15.581-4.885-16.955-12.977h-16.397c1.117 15.581 14.464 25.531 33.161 25.531z"/>
      </svg>
    ),
    color: '#3178C6'
  },
  {
    name: 'Django',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="#092E20" d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1zm-301.2 32h53.8L224 294.5 338.4 96.3h53.8L224 384.5 55.7 96.3z"/>
      </svg>
    ),
    color: '#092E20'
  },
  {
    name: 'Python',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="#3776AB" d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/>
      </svg>
    ),
    color: '#3776AB'
  },
  {
    name: 'Tailwind CSS',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="#06B6D4" d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  {
    name: 'React',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#61DAFB" d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4z"/>
      </svg>
    ),
    color: '#61DAFB'
  },
  {
    name: 'Next.js',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#000000" d="M18.974 31.5c0-.704-.581-1.275-1.297-1.275-.717 0-1.298.571-1.298 1.275 0 .705.581 1.276 1.298 1.276.716 0 1.297-.571 1.297-1.276Zm14.526-16h-.001c-.242 0-.484.087-.677.26l-9.22 8.3-9.22-8.3c-.193-.173-.435-.26-.677-.26-.242 0-.484.087-.677.26l-.87.784c-.193.173-.29.412-.29.651 0 .24.097.478.29.651l10.767 9.695c.193.173.435.26.677.26.242 0 .484-.087.677-.26l10.767-9.695c.193-.173.29-.412.29-.651 0-.24-.097-.478-.29-.651l-.87-.784c-.193-.173-.435-.26-.677-.26Z"/>
      </svg>
    ),
    color: '#000000'
  },
  {
    name: 'Express',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="#000000" d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z"/>
      </svg>
    ),
    color: '#000000'
  },
  {
    name: 'Prisma',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="#2D3748" d="M25.21,24.21,12.739,27.928a.525.525,0,0,1-.667-.606L16.528,5.811a.43.43,0,0,1,.809-.094l8.249,17.661A.6.6,0,0,1,25.21,24.21Zm2.139-1.753L19.888,2.275a1.289,1.289,0,0,0-2.428.28L13.1,24.066a1.574,1.574,0,0,0,2,1.818l12.471-3.718a1.8,1.8,0,0,0-.222-3.208Z"/>
      </svg>
    ),
    color: '#2D3748'
  },
  {
    name: 'CSS',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#1572B6" d="M480 32l-64 368-223.3 80L0 400l19.6-94.8h82l-8 40.6L210 390.2l134.1-44.4 18.8-97.1H29.5l16-82h333.7l10.5-52.7H56.3l16.3-82H480z"/>
      </svg>
    ),
    color: '#1572B6'
  },
  {
    name: 'HTML',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512"/>
        <path fill="#EF652A" d="M256,472 L405,431 440,37 256,37"/>
        <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z"/>
        <path fill="#FFF" d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z"/>
      </svg>
    ),
    color: '#E34F26'
  }
];


export default function TechCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === technologies.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const visibleTechnologies = () => {
      const items = [];
      for (let i = 0; i < technologies.length; i++) {
        const index = (currentIndex + i) % technologies.length;
        items.push(technologies[index]);
      }
      return items;
    };
  
    return (
      <div className="w-full h-[200px] overflow-hidden flex items-center justify-center">
        <div className="px-4 w-full">
          <div className="flex gap-4 items-center justify-center">
            {visibleTechnologies().map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className={`transform transition-all duration-500 ease-in-out ${
                  index === Math.floor(technologies.length / 2) 
                    ? 'scale-125 translate-y-0 opacity-100' 
                    : 'scale-100 opacity-70 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${Math.abs(index - Math.floor(technologies.length / 2)) * 50}ms`
                }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 relative group">
                  <div 
                    className="w-full h-full p-2 rounded-xl transition-all duration-500 ease-in-out hover:scale-110"
                    style={{ 
                      backgroundColor: `${tech.color}15`,
                      border: `1px solid ${tech.color}30`
                    }}
                  >
                    {tech.icon}
                  </div>
                  <div 
                    className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                    transition-all duration-500 ease-in-out bg-gray-800/90 px-3 py-1 rounded-full
                    ${index === Math.floor(technologies.length / 2) ? 'opacity-100' : 'opacity-0'}`}
                    style={{ 
                      border: `1px solid ${tech.color}30`
                    }}
                  >
                    <span className="text-white text-xs font-medium whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}