//オープンAIでファインチューニングにて問い合わせ

import { NextResponse } from "next/server";
import OpenAI from "openai";

// OpenAI設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const functions = [
  {
    name: "SalesData",
    description: "Generate sales data for software products.",
    parameters: {
      type: "object",
      properties: {
        salesItems: {
          type: "array",
          items: {
            type: "object",
            properties: {
              softwareName: {
                type: "string",
                description: "ソフトウェア名",
              },
              salesVolume: {
                type: "number",
                description: "売上本数",
              },
              releaseDate: {
                type: "string",
                description: "発売日",
              },
              publisher: {
                type: "string",
                description: "発売元",
              },
              price: {
                type: "number",
                description: "価格",
              },
            },
            required: ["softwareName", "salesVolume", "releaseDate", "publisher", "price"],
          },
        },
      },
      required: ["salesItems"],
    },
  },
];
// 型定義
export type SalesItemType = {
  softwareName: string;
  salesVolume: number;
  releaseDate: string;
  publisher: string;
  price: number;
};

export type SalesDataType = {
  salesItems: SalesItemType[];
};

export async function POST(request: Request) {
  try {
    // リクエストボディの取得
    const body = await request.json();
    console.log(body);

    const { topic } = body; // 必要なパラメータのみ取得

    console.log(body);

    // ChatGPTへのリクエスト
    const response = await openai.chat.completions.create({
      model: "ft:gpt-4o-mini-2024-07-18:personal:my-test2:Ak0YxfEO", // ファインチューニング済みモデルを指定
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that is able to generate multiple choice questions and answers.",
        },
        {
          role: "user",
          content: `Generate multiple choice questions about ${topic}.`, // 製品（topic）のみを指定
        },
      ],
      functions,
      function_call: {
        name: "SalesData",
      },
    });

    // メッセージ取得
    const responseMessage = response.choices[0].message;
    console.log(responseMessage);

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

    const functionCallNameArguments = JSON.parse(responseMessage.function_call.arguments);
    console.log(functionCallNameArguments);
    const sales: SalesDataType[] = functionCallNameArguments.softwareName;

    if (functionCallNameArguments.length === 0) {
      return new NextResponse("生成できませんでした", { status: 404 });
    }

    //responseMessageの中身をreturnで返したいjson
    return NextResponse.json({ message: responseMessage }, { status: 200 });
    // return NextResponse.json({ quizId: responseQuiz.id }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
}
