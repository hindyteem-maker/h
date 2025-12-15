import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      aria-label="شعار حرف الضاد"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dhadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" /> {/* emerald-500 */}
            <stop offset="100%" stopColor="#047857" /> {/* emerald-700 */}
          </linearGradient>
          <linearGradient id="dhadGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" /> {/* emerald-400 */}
            <stop offset="100%" stopColor="#10B981" /> {/* emerald-500 */}
          </linearGradient>
        </defs>
        
        <text 
          x="50" 
          y="75" 
          textAnchor="middle" 
          fontFamily="'Tajawal', sans-serif" 
          fontWeight="900" 
          fontSize="75"
          className="fill-[url(#dhadGradient)] dark:fill-[url(#dhadGradientDark)] drop-shadow-sm"
        >
          ض
        </text>
      </svg>
    </div>
  );
};

export default Logo;