import React from 'react';
import { GameState } from '../types';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  questions: GameState['questions'];
  answers: boolean[];
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart, questions, answers }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  let message = '';
  let emoji = '';
  let colorClass = '';

  if (percentage === 100) {
    message = 'مذهل! أنت فصيح للغاية';
    emoji = '👑';
    colorClass = 'text-emerald-600 dark:text-emerald-400';
  } else if (percentage >= 80) {
    message = 'ممتاز! لديك حصيلة لغوية رائعة';
    emoji = '🌟';
    colorClass = 'text-emerald-500 dark:text-emerald-300';
  } else if (percentage >= 50) {
    message = 'جيد! واصل التعلم';
    emoji = '📚';
    colorClass = 'text-amber-500 dark:text-amber-400';
  } else {
    message = 'حاول مرة أخرى لتطوير لغتك';
    emoji = '💪';
    colorClass = 'text-red-500 dark:text-red-400';
  }

  return (
    <div className="max-w-2xl mx-auto w-full space-y-8 text-center animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors">
        <div className="text-6xl mb-4">{emoji}</div>
        <h2 className={`text-3xl font-bold mb-2 ${colorClass}`}>
          {message}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">لقد أنهيت التحدي بنجاح</p>

        <div className="flex justify-center items-center space-x-8 space-x-reverse mb-8">
          <div className="text-center">
            <div className="text-4xl font-black text-slate-800 dark:text-slate-100">{score}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mt-1">النتيجة</div>
          </div>
          <div className="w-px h-12 bg-slate-200 dark:bg-slate-600"></div>
          <div className="text-center">
            <div className="text-4xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mt-1">النسبة</div>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-emerald-200 dark:shadow-none"
        >
          لعب مرة أخرى
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
        <h3 className="text-right font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">ملخص الإجابات</h3>
        <div className="space-y-3">
            {questions.map((q, idx) => (
                <div key={q.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className="text-right">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{q.word}</span>
                        <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{q.type === 'synonym' ? 'مرادف' : 'ضد'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-emerald-600 dark:text-green-400">{q.correctAnswer}</span>
                        {answers[idx] ? (
                            <span className="text-emerald-500 dark:text-green-400">✔️</span>
                        ) : (
                            <span className="text-red-500 dark:text-red-400">❌</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;