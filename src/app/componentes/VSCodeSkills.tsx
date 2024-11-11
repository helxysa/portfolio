export default function VSCodeSkills() {
    return (
        <div className="relative w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[320px] md:max-w-[380px] 
            h-[380px] xs:h-[400px] sm:h-[420px] md:h-[440px] 
            bg-gradient-to-br from-[#1e1e1e] to-[#212121]
            dark:from-[#1e1e1e] dark:to-[#212121]
            rounded-lg 
            overflow-hidden transform 
            transition-all duration-300 ease-in-out 
            hover:rotate-1 hover:scale-[1.02] hover:-translate-y-1 
            shadow-[0_2px_10px_rgba(0,0,0,0.08)] 
            mx-auto my-4 md:my-6">
            
            <div className="bg-gradient-to-r from-[#2b2b2b] to-[#323233] 
                p-2 xs:p-2.5 sm:p-3 
                flex items-center justify-between 
                border-b border-gray-800/30
                shadow-sm">
                <div className="flex items-center">
                    <div className="flex space-x-2 xs:space-x-2.5">
                        <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 
                            rounded-full bg-red-500 hover:bg-red-400 
                            transition-all duration-200 
                            shadow-inner hover:shadow-red-500/20"></div>
                        <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 
                            rounded-full bg-yellow-500 hover:bg-yellow-400 
                            transition-all duration-200 
                            shadow-inner hover:shadow-yellow-500/20"></div>
                        <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 
                            rounded-full bg-green-500 hover:bg-green-400 
                            transition-all duration-200 
                            shadow-inner hover:shadow-green-500/20"></div>
                    </div>
                    <span className="ml-4 xs:ml-5 
                        text-xs xs:text-sm sm:text-sm 
                        text-gray-400 font-mono 
                        tracking-wide">habilidades.ts</span>
                </div>
            </div>
            
            <div className="p-3 xs:p-4 sm:p-5 pb-6 xs:pb-4 sm:pb-5
                font-mono text-[11px] xs:text-xs sm:text-sm 
                space-y-2 xs:space-y-3 sm:space-y-4 
                overflow-y-auto
                h-[calc(100%-2.5rem)]
                bg-gradient-to-b from-transparent via-[#1e1e1e]/50 to-[#1e1e1e]/80">
                <div className="pl-2 xs:pl-4">
                    <span className="text-purple-400/90 font-medium"><span className="text-blue-400/90 ">const</span> habilidades</span>
                    <span className="text-white/90"> = {`{`}</span>
                </div>
                <div className="pl-4 xs:pl-6 sm:pl-8 space-y-1.5 xs:space-y-2">
                    <div className="hover:translate-x-2 transition-transform duration-200 ease-in-out group">
                        <span className="text-green-400/90 group-hover:text-green-300">frontend:</span>
                        <span className="text-orange-300/90 group-hover:text-orange-200">{` ['React', 'Next.js', 'TailwindCSS'],`}</span>
                    </div>
                    <div className="hover:translate-x-2 transition-transform duration-200 ease-in-out group">
                        <span className="text-green-400/90 group-hover:text-green-300">backend:</span>
                        <span className="text-orange-300/90 group-hover:text-orange-200">{` ['Node.js', 'Django', 'Express'],`}</span>
                    </div>
                    <div className="hover:translate-x-2 transition-transform duration-200 ease-in-out group">
                        <span className="text-green-400/90 group-hover:text-green-300">banco:</span>
                        <span className="text-orange-300/90 group-hover:text-orange-200">{` ['MongoDB', 'SQLite'],`}</span>
                    </div>
                    <div className="hover:translate-x-2 transition-transform duration-200 ease-in-out group">
                        <span className="text-green-400/90 group-hover:text-green-300">ferramentas:</span>
                        <span className="text-orange-300/90 group-hover:text-orange-200">{` ['Git', 'VS Code', 'Prisma', 'Sequelize']`}</span>
                    </div>
                    <div className="hover:translate-x-2 transition-transform duration-200 ease-in-out group">
                        <span className="text-green-400/90 group-hover:text-green-300">extra:</span>
                        <span className="text-orange-300/90 group-hover:text-orange-200">
                            {`{\n`}
                            <div className="pl-1 xs:pl-2 sm:pl-4 space-y-0.5 xs:space-y-1">
                                <div className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                                    <span className="text-blue-400/90 group-hover:text-blue-300">imagem</span>
                                    {`: ['Figma', 'GIMP'],`}
                                </div>
                                <div className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                                    <span className="text-blue-400/90 group-hover:text-blue-300">games</span>
                                    {`: ['GD', 'Godot', 'PyGame'],`}
                                </div>
                                <div className="hover:translate-x-1 transition-transform duration-200 ease-in-out">
                                    <span className="text-blue-400/90 group-hover:text-blue-300">mobile</span>
                                    {`: ['React Native']`}
                                </div>
                            </div>
                            {`}`}
                        </span>
                    </div>
                </div>
                <div className="pl-2 xs:pl-4 text-white/90">{`}`}</div>
            </div>
        </div>
    )
}