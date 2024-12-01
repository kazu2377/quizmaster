"use client"; // React のクライアントコンポーネントとして動作することを明示
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"; // カスタムボタンコンポーネント
import { Card } from "@/components/ui/card"; // カスタムカードコンポーネント
import { Progress } from "@/components/ui/progress"; // カスタムプログレスバー
import { useToast } from "@/components/ui/use-toast"; // トースト通知ユーティリティ
import { fetchQuestions } from "@/lib/api"; // Supabaseからデータを取得する関数
import { questions } from "@/lib/questions"; // 質問データのインポート
import { storage } from "@/lib/storage"; // ストレージユーティリティ
import { AnimatePresence, motion } from "framer-motion"; // アニメーションライブラリ
import { CheckCircle2, History, XCircle } from "lucide-react"; // アイコン

// クイズコンポーネントのプロパティ型定義
interface QuizProps {
  userId: string; // ユーザーID
  onShowHistory: () => void; // 履歴を表示するためのコールバック
}

// クイズコンポーネント
export function Quiz({ userId, onShowHistory }: QuizProps) {
  // 状態管理
  const [currentQuestions, setCurrentQuestions] = useState(
    [...questions].sort(() => 0.5 - Math.random()).slice(0, 10) // ランダムに質問を選択
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 現在の質問インデックス
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]); // 選択された回答
  const [showResults, setShowResults] = useState(false); // 結果表示フラグ
  const [score, setScore] = useState(0); // スコア
  const { toast } = useToast(); // トースト通知のフック

  // Supabaseからデータを取得
  useEffect(() => {
    async function loadQuestions() {
      try {
        const questions = await fetchQuestions();
        const shuffled = [...questions].sort(() => 0.5 - Math.random()); // ランダムにシャッフル
        setCurrentQuestions(shuffled.slice(0, 10)); // 最初の10問をセット
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        toast({
          title: "Error",
          description: "Failed to load questions",
        });
      }
    }
    loadQuestions();
  }, []); // 初回レンダリング時に実行

  // 回答が選択された際の処理
  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex; // 現在の質問の回答を記録
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestionIndex < 9) {
      // 次の質問に進む
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300); // 0.3秒のディレイ
    } else {
      // 最後の質問の場合、結果を計算して表示
      const finalScore = newSelectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === currentQuestions[index].correctAnswer ? 1 : 0); // 正答の場合スコア加算
      }, 0);
      setScore(finalScore);
      setShowResults(true);

      // 結果を保存
      storage.saveQuizResult({
        id: Date.now().toString(), // ユニークなID
        userId,
        score: finalScore,
        totalQuestions: 10,
        date: new Date().toISOString(),
      });

      // 結果通知
      toast({
        title: "Quiz Completed!",
        description: `You scored ${finalScore} out of 10`,
      });
    }
  };

  // クイズのリセット
  const restartQuiz = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()); // 質問を再度シャッフル
    setCurrentQuestions(shuffled.slice(0, 10)); // 新しい質問を設定
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  // 結果画面
  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-2xl p-6">
          <div className="flex justify-end gap-2 mb-6">
            <Button variant="outline" onClick={onShowHistory}>
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
            <p className="text-xl mb-2">Your Score: {score} out of 10</p>
            <Progress value={score * 10} className="mb-6" />
          </div>

          <div className="space-y-4">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <p className="font-medium mb-2">{question.text}</p>
                    <p className="text-sm text-muted-foreground">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={restartQuiz} className="w-full mt-6">
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  // 現在の質問を取得
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // 質問画面
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl p-6">
        <div className="flex justify-end gap-2 mb-6">
          <Button variant="outline" onClick={onShowHistory}>
            <History className="w-4 h-4 mr-2" />
            View History
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium">Question {currentQuestionIndex + 1} of 10</h2>
            <Progress value={(currentQuestionIndex + 1) * 10} className="w-1/2" />
          </div>
          <h1 className="text-2xl font-bold mb-6">{currentQuestion.text}</h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid gap-3"
          >
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestionIndex] === index ? "default" : "outline"}
                className="w-full py-6 text-lg justify-start"
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </Button>
            ))}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}
