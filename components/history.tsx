"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { QuizResult } from '@/lib/types';
import { History as HistoryIcon, ArrowLeft } from 'lucide-react';

interface HistoryProps {
  userId: string;
  onBack: () => void;
}

export function History({ userId, onBack }: HistoryProps) {
  const [results, setResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    const userResults = storage.getQuizResults(userId);
    setResults(userResults.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quiz
        </Button>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <HistoryIcon className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Quiz History</h1>
          </div>

          {results.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No quiz attempts yet. Start a quiz to see your history!
            </p>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      Score: {result.score}/{result.totalQuestions}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(result.date).toLocaleDateString()} at{' '}
                      {new Date(result.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">
                    {Math.round((result.score / result.totalQuestions) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}