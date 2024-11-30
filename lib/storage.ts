import { User, QuizResult } from './types';

export const storage = {
  getUser: (id: string): User | null => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[id] || null;
  },

  saveUser: (user: User): void => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[user.id] = user;
    localStorage.setItem('users', JSON.stringify(users));
  },

  saveQuizResult: (result: QuizResult): void => {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));
  },

  getQuizResults: (userId: string): QuizResult[] => {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    return results.filter((result: QuizResult) => result.userId === userId);
  }
};