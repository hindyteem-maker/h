import React from 'react';

interface ArabicArtProps {
  className?: string;
}

const ArabicArt: React.FC<ArabicArtProps> = ({ className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="coverGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#047857" /> {/* emerald-700 */}
            <stop offset="1" stopColor="#065f46" /> {/* emerald-800 */}
          </linearGradient>
          <linearGradient id="pageGradientLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f8fafc" /> {/* slate-50 */}
            <stop offset="1" stopColor="#cbd5e1" /> {/* slate-300 */}
          </linearGradient>
          <linearGradient id="pageGradientRight" x1="1" y1="0" x2="0" y2="0">
             <stop offset="0" stopColor="#f8fafc" />
             <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Book Cover Base */}
        <path 
            d="M20 140 C 20 140, 60 170, 100 175 C 140 170, 180 140, 180 140 L 175 130 C 175 130, 140 160, 100 165 C 60 160, 25 130, 25 130 Z" 
            fill="url(#coverGradient)" 
        />

        {/* Page Shadow/Depth */}
         <path d="M100 165 L 100 60" stroke="#000" strokeOpacity="0.1" strokeWidth="1" />

        {/* Left Page */}
        <path 
            d="M100 165 C 100 165, 60 160, 25 130 L 25 40 C 60 70, 100 60, 100 60 Z" 
            fill="url(#pageGradientLeft)" 
        />
        
        {/* Right Page */}
        <path 
            d="M100 165 C 100 165, 140 160, 175 130 L 175 40 C 140 70, 100 60, 100 60 Z" 
            fill="url(#pageGradientRight)" 
        />
        
        {/* Spine */}
        <path d="M100 60 L 100 165" stroke="#94a3b8" strokeWidth="1" opacity="0.3" />

        {/* Text Lines Left */}
        <path d="M40 70 C 50 80, 80 75, 90 70" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M35 85 C 45 95, 85 90, 90 85" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M35 100 C 45 110, 85 105, 90 100" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M40 115 C 50 125, 80 120, 85 115" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Text Lines Right */}
        <path d="M110 70 C 120 75, 150 80, 160 70" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M110 85 C 115 90, 155 95, 165 85" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M110 100 C 115 105, 155 110, 165 100" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M115 115 C 120 120, 150 125, 160 115" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Letter 'Daad' in center */}
        <text 
            x="100" 
            y="95" 
            textAnchor="middle" 
            fontSize="50" 
            fontFamily="sans-serif" 
            fontWeight="bold" 
            fill="#10b981" 
            opacity="0.9"
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}
        >
            ض
        </text>

        {/* Bookmark */}
        <path d="M140 45 V 90 L 150 80 L 160 90 V 43" fill="#fbbf24" style={{ mixBlendMode: 'multiply' }} opacity="0.8" />
      </svg>
    </div>
  );
};

export default ArabicArt;