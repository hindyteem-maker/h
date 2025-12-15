import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { soundManager } from '../utils/sound';

interface QuizScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  score,
  onAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  // Shuffle options when question changes
  useEffect(() => {
    setShuffledOptions([...question.options].sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    
    soundManager.resume();
    setSelectedOption(option);
    setIsAnswered(true);
    
    const isCorrect = option === question.correctAnswer;
    
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    
    // Delay slightly before moving to next question to let user see the result
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 3000); // Increased delay slightly to allow reading the correct answer
  };

  const getOptionStyle = (option: string) => {
    const baseStyle = "w-full p-4 rounded-xl text-lg font-medium border-2 transition-all duration-200 text-right relative overflow-hidden";
    
    if (!isAnswered) {
      return `${baseStyle} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-slate-200 active:scale-95`;
    }

    if (option === question.correctAnswer) {
      return `${baseStyle} bg-emerald-100 border-emerald-500 text-emerald-800 dark:bg-green-900/40 dark:border-green-500 dark:text-green-300 shadow-md animate-pop`;
    }

    if (option === selectedOption && option !== question.correctAnswer) {
      return `${baseStyle} bg-red-100 border-red-500 text-red-800 dark:bg-red-900/40 dark:border-red-500 dark:text-red-300 animate-shake`;
    }

    return `${baseStyle} bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 opacity-70 scale-95`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header Stats */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="text-sm text-slate-500 dark:text-slate-400">السؤال</span>
          <span className="text-xl font-bold text-slate-800 dark:text-slate-100">{currentIndex + 1}<span className="text-slate-400 dark:text-slate-600 text-sm">/{totalQuestions}</span></span>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className="text-sm text-slate-500 dark:text-slate-400">النقاط</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{score}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden dir-rtl">
        <div 
          className="bg-emerald-500 dark:bg-emerald-500 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="text-center space-y-6 py-8">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-transparent dark:border-slate-700">
          {question.type === 'synonym' ? '🔵 مرادف الكلمة' : '🔴 ضد الكلمة'}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight transition-colors">
          {question.word}
        </h2>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 font-medium transition-colors">
          {question.questionText}
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={getOptionStyle(option)}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {isAnswered && option === question.correctAnswer && (
                 <svg className="w-6 h-6 text-emerald-600 dark:text-green-400 animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
              )}
              {isAnswered && selectedOption === option && option !== question.correctAnswer && (
                 <svg className="w-6 h-6 text-red-600 dark:text-red-400 animate-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Explanation / Feedback Area */}
      {isAnswered && (
        <div className={`p-4 rounded-xl text-center animate-reveal-pop transition-colors ${
          selectedOption === question.correctAnswer 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300 border' 
            : 'bg-red-50 border-red-100 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 border'
        }`}>
          <p className="font-bold mb-1">
            {selectedOption === question.correctAnswer ? 'أحسنت! إجابة صحيحة' : 'للأسف، إجابة خاطئة'}
          </p>

          {selectedOption !== question.correctAnswer && (
             <div className="my-2 p-2 bg-white/50 dark:bg-slate-800/50 rounded-lg inline-block">
                <p className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    الإجابة الصحيحة هي: <span className="text-emerald-600 dark:text-green-400">{question.correctAnswer}</span>
                </p>
             </div>
          )}

          {question.explanation && (
            <p className="text-sm opacity-90 mt-2">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizScreen;