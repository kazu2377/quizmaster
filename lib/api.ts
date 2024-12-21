// lib/api.ts
import { Question } from "@/lib/questions";
import { supabase } from "./supabase";

export async function fetchQuestions(): Promise<Question[]> {
  const { data, error } = await supabase.from("questions").select("*");

  if (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Could not fetch questions");
  }

  // データを整形して返す
  return data.map((question) => ({
    id: question.id,
    text: question.text,
    options: question.options,
    correctAnswer: question.correctanswer,
  }));
}
