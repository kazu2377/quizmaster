import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface QuizResult {
  id: string; // uuid型
  user_id: string;
  score: number;
  total_questions: number;
  date: string; // timestamptz型
}

export async function getQuizResults() {
  "use server";

  try {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from("quiz_results")
      .select("user_id, score, total_questions, date");
    if (error) {
      console.error("Error fetching quiz results:", error);
      return { error: error.message };
    }

    console.log("Quiz results:", data);
    return { data: data as QuizResult[] };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "予期せぬエラーが発生しました" };
  }
}
