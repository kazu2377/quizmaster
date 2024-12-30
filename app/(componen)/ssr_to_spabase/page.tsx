import { getQuizResults } from "./actions";

export default async function QuizResults() {
  const { data, error } = await getQuizResults();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">クイズ結果一覧</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid gap-4">
        {data?.map((result) => (
          <div key={result.id} className="border p-4 rounded-lg shadow">
            <div className="font-bold">Score: {result.score}</div>
            <div>Quiz ID: {result.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
