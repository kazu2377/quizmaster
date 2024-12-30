"use client";

import { useEffect, useState } from "react";
import type { Questions } from "../api/prisma_test/route";


export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/prisma_test");
        const data = await response.json();

        if (data.success) {
          setQuestions(data.data);
        } else {
          setError("データの取得に失敗しました");
        }
      } catch (err) {
        setError("エラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions List</h1>
      <div className="grid gap-4">
        {questions.map((question) => (
          <div key={question.id} className="border p-4 rounded-lg shadow">
            <p className="font-bold mb-2">{question.text}</p>
            <ul className="list-disc pl-5">
              {((question.options as string[]) ?? []).map((option: string, index: number) => (
                <li key={index} className="mb-1">
                  {option}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-green-600">正解: {question.correctanswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
