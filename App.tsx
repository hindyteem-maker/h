import React, { useState, useCallback, useEffect } from 'react';
import { GameState, QuizMode } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { generateQuestions } from './services/geminiService';
import { soundManager } from './utils/sound';
import ArabicArt from './components/ArabicArt';
import Logo from './components/Logo';

const App: React.FC = () => {
  // Default to Dark Mode (true) for "Dark Colors" request
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(soundManager.isMuted);
  const [gameState, setGameState] = useState<GameState>({
    status: 'start',
    mode: 'mixed',
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: []
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSound = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
  };

  const handleStart = async (mode: QuizMode) => {
    setGameState(prev => ({ ...prev, status: 'loading', mode }));
    
    try {
      const questions = await generateQuestions(mode, 5); // Fetch 5 questions
      setGameState({
        status: 'playing',
        mode,
        questions,
        currentIndex: 0,
        score: 0,
        answers: []
      });
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        status: 'error', 
        errorMessage: error instanceof Error ? error.message : "حدث خطأ غير متوقع"
      }));
    }
  };

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setGameState(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newAnswers = [...prev.answers, isCorrect];
      const nextIndex = prev.currentIndex + 1;

      if (nextIndex >= prev.questions.length) {
        soundManager.playCelebration();
        return {
          ...prev,
          score: newScore,
          answers: newAnswers,
          status: 'finished'
        };
      }

      soundManager.playTransition();
      return {
        ...prev,
        score: newScore,
        answers: newAnswers,
        currentIndex: nextIndex
      };
    });
  }, []);

  const handleRestart = () => {
    setGameState({
      status: 'start',
      mode: 'mixed',
      questions: [],
      currentIndex: 0,
      score: 0,
      answers: []
    });
  };

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden font-sans">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
         {/* Abstract Geometric Pattern */}
         <div className="absolute inset-0 opacity-[0.6] dark:opacity-[0.2]" 
              style={{ 
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '32px 32px',
                  color: isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' 
              }}>
         </div>
         
         {/* Gradient Orbs for Atmosphere - Unified to Emerald/Teal for Dark Mode */}
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-200/20 dark:bg-emerald-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000"></div>
         
         {/* Overlay for consistency */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80 dark:via-slate-950/30 dark:to-slate-950/80"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        <header className="w-full max-w-5xl mx-auto flex justify-end items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm text-slate-600 dark:text-emerald-300 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
              aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm text-slate-600 dark:text-emerald-300 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {gameState.status === 'playing' && (
                <button 
                    onClick={handleRestart}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                    إنهاء المسابقة
                </button>
            )}
          </div>
        </header>

        <main className="flex-1 w-full max-w-4xl mx-auto flex items-center justify-center">
          
          {gameState.status === 'start' && (
            <StartScreen onStart={handleStart} />
          )}

          {gameState.status === 'loading' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-emerald-200 dark:border-emerald-800 border-t-emerald-600 dark:border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-600 dark:text-slate-300 text-lg animate-pulse">جاري إعداد الأسئلة...</p>
            </div>
          )}

          {gameState.status === 'error' && (
            <div className="text-center space-y-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur p-8 rounded-2xl shadow-lg border border-red-100 dark:border-red-900/30">
              <div className="text-red-500 text-4xl mb-2">⚠️</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">عذراً، حدث خطأ</h3>
              <p className="text-slate-600 dark:text-slate-300">{gameState.errorMessage}</p>
              <button 
                  onClick={handleRestart}
                  className="mt-4 px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600"
              >
                  العودة للقائمة الرئيسية
              </button>
            </div>
          )}

          {gameState.status === 'playing' && gameState.questions.length > 0 && (
            <QuizScreen
              question={gameState.questions[gameState.currentIndex]}
              currentIndex={gameState.currentIndex}
              totalQuestions={gameState.questions.length}
              score={gameState.score}
              onAnswer={handleAnswer}
            />
          )}

          {gameState.status === 'finished' && (
            <ResultScreen
              score={gameState.score}
              totalQuestions={gameState.questions.length}
              onRestart={handleRestart}
              questions={gameState.questions}
              answers={gameState.answers}
            />
          )}
        </main>
        
        <footer className="mt-12 text-center text-slate-400 dark:text-slate-500 text-sm space-y-1 pb-4 transition-colors">
          <p className="font-medium text-slate-600 dark:text-slate-400 text-base">إعداد وتصميم هند الغامدي</p>
          <p className="text-slate-500 dark:text-slate-500 font-sans tracking-wide">t554556@mkhg.moe.gov.sa</p>
        </footer>
      </div>
    </div>
  );
};

export default App;