import React from 'react';
import { QuizMode } from '../types';
import { soundManager } from '../utils/sound';
import ArabicArt from './ArabicArt';

interface StartScreenProps {
  onStart: (mode: QuizMode) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const handleClick = () => {
    soundManager.resume(); // Ensure audio context is ready on user interaction
    soundManager.playTransition();
    onStart('mixed');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 animate-fade-in py-8">
      
      {/* Hero Image Section */}
      <div className="relative flex justify-center items-center">
        {/* Decorative Background Glow - Deep Emeralds for Dark Mode */}
        <div className="absolute w-64 h-64 bg-emerald-200 dark:bg-emerald-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-pulse transition-colors duration-500"></div>
        <div className="absolute w-64 h-64 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 -translate-x-4 translate-y-4 transition-colors duration-500"></div>
        
        {/* Rotating Geometric Pattern - Subtle background for the art */}
        <svg className="absolute w-[320px] h-[320px] text-emerald-100 dark:text-emerald-900/40 opacity-50 animate-[spin_30s_linear_infinite] transition-colors" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0L61.2 38.8L100 50L61.2 61.2L50 100L38.8 61.2L0 50L38.8 38.8Z" />
        </svg>

        {/* Main Arabic Art Image */}
        <div className="relative z-10 group">
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-xl group-hover:blur-2xl transition duration-500"></div>
            <div className="relative w-64 h-64 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105">
                 <ArabicArt className="w-full h-full" />
            </div>
        </div>
      </div>

      <div className="space-y-4 max-w-lg mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 tracking-tight drop-shadow-sm transition-colors">
          تحدي <span className="text-emerald-600 dark:text-emerald-400 transition-colors">الفصاحة</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium transition-colors">
          رحلة ممتعة في بحور اللغة العربية<br/>
          <span className="text-base text-slate-500 dark:text-slate-400 font-normal">اختبر قدراتك في المرادفات والأضداد</span>
        </p>
      </div>

      <div className="w-full max-w-md mt-4 relative z-10">
        <button
          onClick={handleClick}
          className="group w-full relative overflow-hidden bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border-2 border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
          <div className="absolute inset-0 w-1 bg-emerald-500 dark:bg-emerald-500 transition-all duration-300 group-hover:w-full opacity-5"></div>
          
          <div className="relative flex items-center justify-center px-2">
            <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">ابدأ المنافسة</span>
                <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">أسئلة متنوعة وشيقة</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default StartScreen;