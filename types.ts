export type QuizMode = 'synonyms' | 'antonyms' | 'mixed';

export interface Question {
  id: string;
  word: string;
  type: 'synonym' | 'antonym';
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface GameState {
  status: 'start' | 'loading' | 'playing' | 'finished' | 'error';
  mode: QuizMode;
  questions: Question[];
  currentIndex: number;
  score: number;
  answers: boolean[]; // track correct/incorrect history
  errorMessage?: string;
}