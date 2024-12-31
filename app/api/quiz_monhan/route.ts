import { NextResponse } from "next/server";
import OpenAI from "openai";

export type QuizDataType = {
  question: string;
  answer: string;
  options: string[];
  quizId: string;
};

// OpenAI設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// クイズ生成関数の定義
const functions = [
  {
    name: "Quiz",
    description: "Generate multiple choice questions about Monster Hunter.",
    parameters: {
      type: "object",
      properties: {
        quizzes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string",
                description: "The quiz question about Monster Hunter.",
              },
              answer: {
                type: "string",
                description: "The correct answer.",
              },
              options: {
                type: "array",
                items: {
                  type: "string",
                  description: "Dummy answers.",
                },
              },
            },
            required: ["question", "answer", "options"],
          },
        },
      },
      required: ["quizzes"],
    },
  },
];

type QuizType = {
  question: string;
  answer: string;
  options: string[];
};

// クイズ生成エンドポイント
export async function POST(request: Request) {
  try {
    // リクエストボディの取得
    const body = await request.json();
    const { level, language, amount, userId } = body;

    console.log("Request Body:", body);

    // ChatGPTへのリクエスト
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI specialized in generating multiple choice questions about the game Monster Hunter.",
        },
        {
          role: "user",
          content: `Generate ${amount} random ${level} difficulty multiple choice questions about Monster Hunter in ${language}. Each question should include one correct answer and three plausible dummy answers. Respond in valid JSON format.`,
        },
      ],
      functions,
      function_call: {
        name: "Quiz",
      },
    });

    // メッセージ取得
    const responseMessage = response.choices[0].message;

    // メッセージ取得エラー
    if (!responseMessage) {
      return new NextResponse("Message Error", { status: 404 });
    }

    // Function Callingチェック
    if (!responseMessage.function_call) {
      return new NextResponse("Function Call Error", { status: 404 });
    }

    // 引数チェック
    if (!responseMessage.function_call.arguments) {
      return new NextResponse("Function Call Arguments Error", {
        status: 500,
      });
    }

    // 引数取得
    const functionCallArguments = responseMessage.function_call.arguments;

    // デバッグ用にログ出力
    console.log("Function Call Arguments Raw:", functionCallArguments);

    // JSON.parse を試みる
    let parsedArguments;
    try {
      parsedArguments = JSON.parse(functionCallArguments);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Invalid JSON:", functionCallArguments);
      return new NextResponse("Invalid JSON format in function call arguments", { status: 500 });
    }

    // クイズ取得
    const quizzes: QuizType[] = parsedArguments.quizzes;

    if (!quizzes || quizzes.length === 0) {
      return new NextResponse("クイズが生成できませんでした", { status: 404 });
    }

    // クイズデータの整形
    const quizData: QuizDataType[] = quizzes.map((quiz) => ({
      question: quiz.question,
      answer: quiz.answer,
      options: quiz.options,
      quizId: userId, // 必要に応じて適切なIDを設定
    }));

    // クイズデータを保存する処理をここに追加（例：データベースへの保存）

    // レスポンスとしてクイズデータを返す
    return NextResponse.json({ quizzes: quizData }, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
