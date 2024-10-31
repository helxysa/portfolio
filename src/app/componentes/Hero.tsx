
import Link from 'next/link';
import TechCarousel from './TechCarousel';

export default function Hero() {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-700">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl text-gray-100 md:text-6xl font-bold mb-4 animate-slideDown hover:text-purple-700 transform hover:scale-105 transition-all duration-300">
                Olá, eu sou<br />
              </h1>
              <h1 className="text-4xl text-purple-700 md:text-6xl font-bold mb-4 animate-slideDown hover:text-gray-100 transform hover:scale-105 transition-all duration-300">
                Heloysa<br />
              </h1>
              <p className="text-xl text-gray-100 mb-8 animate-slideLeft hover:text-purple-700 transform hover:scale-105 transition-all duration-300">
                Desenvolvedora Front-End && Back-End em formação
              </p>
              <Link
                href="#contact"
                className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700 transition"
              >
                Entre em contato
              </Link>
            </div>
            <div className="flex justify-center">
              <VSCodeSkills />
            </div>
          </div>
        </div>
        {/* TechCarousel em largura total */}
        <div className="w-full ">
          <TechCarousel />
        </div>
      </section>
    );
  }

  function VSCodeSkills() {
    return (
        <div className="relative w-full max-w-md h-[500px] bg-[#1e1e1e] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] 
        overflow-hidden transform transition-all duration-300 ease-out hover:rotate-2 hover:scale-105 
        hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        <div className="bg-[#323233] p-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-4 text-sm text-gray-400">skills.tsx</span>
        </div>
        
        <div className="p-6 font-mono text-sm">
          <div className="text-blue-400">const</div>
          <div className="pl-4">
            <span className="text-purple-400">skills</span>
            <span className="text-white"> = {`{`}</span>
          </div>
          <div className="pl-8">
            <div>
              <span className="text-green-400">frontend:</span>
              <span className="text-orange-300">{` ['React', 'Next.js', 'TailwindCSS'],`}</span>
            </div>
            <div>
              <span className="text-green-400">backend:</span>
              <span className="text-orange-300">{` ['Node.js', 'Python', 'Express'],`}</span>
            </div>
            <div>
              <span className="text-green-400">database:</span>
              <span className="text-orange-300">{` ['MongoDB', 'PostgreSQL'],`}</span>
            </div>
            <div>
              <span className="text-green-400">tools:</span>
              <span className="text-orange-300">{` ['Git', 'Docker', 'VS Code']`}</span>
            </div>
          </div>
          <div className="pl-4 text-white">{`}`}</div>
        </div>
      </div>
    );
  }