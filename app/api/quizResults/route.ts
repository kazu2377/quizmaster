// app/api/quizResults/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const { userId, score, totalQuestions } = await request.json();
    console.log(userId, score, totalQuestions);
    const { data, error } = await supabase.from("quiz_results").insert([
      {
        user_id: userId,
        score,
        total_questions: totalQuestions,
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error inserting quiz result:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
