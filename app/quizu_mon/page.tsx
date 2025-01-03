"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type QuizDataType = {
  question: string;
  answer: string;
  options: string[];
  quizId: string;
};

type QuizResponse = {
  quizzes: QuizDataType[];
};

type FormInputs = {
  level: string;
  language: string;
  amount: number;
  userId: string;
};

const QuizPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [quizzes, setQuizzes] = useState<QuizDataType[] | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<{ score: number; total: number; evaluation: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setSubmitError(null);
    setResult(null);
    setQuizzes(null);

    try {
      const response = await fetch("/api/quiz_monhan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "クイズの生成に失敗しました。");
      }

      const responseData: QuizResponse = await response.json();
      setQuizzes(responseData.quizzes);
    } catch (error: any) {
      console.error("Error generating quiz:", error);
      setSubmitError(error.message || "クイズの生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index: number, answer: string) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmitAnswers = () => {
    if (!quizzes) return;

    let score = 0;
    quizzes.forEach((quiz, index) => {
      if (userAnswers[index] === quiz.answer) {
        score += 1;
      }
    });

    const total = quizzes.length;
    const percentage = (score / total) * 100;
    let evaluation = "";

    if (percentage === 100) {
      evaluation = "ハンターランク昇格試験、完璧な結果です！🎊";
    } else if (percentage >= 80) {
      evaluation = "素晴らしい狩りっぷりですね！上位ハンターの実力です！🔥";
    } else if (percentage >= 50) {
      evaluation = "まだまだハンターとしては駆け出しですね。経験を重ねましょう！⚔️";
    } else {
      evaluation = "今回は力及ばず...装備を見直して再挑戦しましょう！🛡️";
    }

    setResult({ score, total, evaluation });
  };

  const resetQuiz = () => {
    setQuizzes(null);
    setUserAnswers({});
    setResult(null);
    setSubmitError(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">モンスターハンタークイズ</h1>

      {!quizzes && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">難易度</label>
            <select
              {...register("level", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="">選択してください</option>
              <option value="easy">易しい</option>
              <option value="medium">普通</option>
              <option value="hard">難しい</option>
            </select>
            {errors.level && (
              <span className="text-red-500 text-sm">難易度を選択してください。</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">言語</label>
            <select
              {...register("language", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md"
            >
              <option value="">選択してください</option>
              <option value="Japanese">日本語</option>
              <option value="English">英語</option>
            </select>
            {errors.language && (
              <span className="text-red-500 text-sm">言語を選択してください。</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">クイズの数</label>
            <input
              type="number"
              {...register("amount", { required: true, min: 1, max: 20 })}
              className="mt-1 block w-full border-gray-300 rounded-md"
              defaultValue={5}
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">1から20の間で選択してください。</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">ユーザーID</label>
            <input
              type="text"
              {...register("userId", { required: true })}
              className="mt-1 block w-full border-gray-300 rounded-md"
              defaultValue="user12345"
            />
            {errors.userId && (
              <span className="text-red-500 text-sm">ユーザーIDを入力してください。</span>
            )}
          </div>

          {submitError && <p className="text-red-500">{submitError}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "クイズ生成中..." : "クイズを生成"}
          </button>
        </form>
      )}

      {quizzes && (
        <div className="mt-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitAnswers();
            }}
          >
            {quizzes.map((quiz, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium">
                  {index + 1}. {quiz.question}
                </p>
                <div className="mt-2 space-y-2">
                  {quiz.options.map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleAnswerChange(index, option)}
                        className="mr-2"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {result ? (
              <div className="mt-6 p-4 border rounded-md bg-green-50">
                <h2 className="text-2xl font-bold">結果</h2>
                <p className="mt-2">
                  あなたのスコア: {result.score} / {result.total}
                </p>
                <p className="mt-1">{result.evaluation}</p>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  再挑戦
                </button>
              </div>
            ) : (
              <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md">
                回答を提出
              </button>
            )}
          </form>

          {result && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold">解答と評価</h2>
              {quizzes.map((quiz, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">
                    {index + 1}. {quiz.question}
                  </p>
                  <p>
                    正解: <span className="font-semibold">{quiz.answer}</span>
                  </p>
                  {userAnswers[index] !== quiz.answer && (
                    <p>
                      あなたの回答:{" "}
                      <span className="font-semibold text-red-500">{userAnswers[index]}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
