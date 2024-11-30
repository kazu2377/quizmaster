export interface User {
  id: string;
  password: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  date: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}