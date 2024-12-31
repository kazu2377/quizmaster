import axios from "axios";
import axiosRetry from "axios-retry";
import moment from "moment-timezone";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// OpenAI設定
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// URL
const WORLD_TIME_URL = "https://worldtimeapi.org/api/timezone";
const OPEN_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

// axios-retryの設定
axiosRetry(axios, {
  retries: 5, // リトライ回数
  retryDelay: (retryCount) => {
    return retryCount * 1000; // リトライ間隔を1秒、2秒、3秒とする
  },
  retryCondition: (error) => {
    // ネットワークエラーや5xxステータスコードの場合にリトライ
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNRESET";
  },
});

// 時刻取得
const getTime = async (location: string, name: string) => {
  try {
    console.log(location);
    console.log(`${WORLD_TIME_URL}/${location}`);

    // APIコール
    const response = await axios.get(`${WORLD_TIME_URL}/${location}`, {
      timeout: 5000, // タイムアウトを5秒に設定
    });
    console.log(response.data);

    // 時刻取得
    const { datetime } = response.data;

    // 時刻フォーマット
    const dateTime = moment.tz(datetime, location).format("A HH:mm");

    return `${name}の時刻は${dateTime}です。`;
  } catch (error) {
    console.error(`getTime エラー: ${error}`);
    return `${name}の時刻は分かりませんでした。`;
  }
};

// 天気取得
const getWeather = async (location: string, name: string) => {
  try {
    console.log(location);

    // APIコール
    const response = await axios.get(OPEN_WEATHER_URL, {
      params: {
        q: location,
        appid: process.env.OPEN_WEATHER_API_KEY,
        units: "metric",
        lang: "ja",
      },
      timeout: 5000, // タイムアウトを5秒に設定
    });

    // 天気取得
    const description = response.data.weather[0].description;

    // 気温取得
    const temp = response.data.main.temp;

    return `${name}の天気は${description}で${temp}度です。`;
  } catch (error) {
    console.error(`getWeather エラー: ${error}`);
    return `${name}の天気は分かりませんでした。`;
  }
};

// Function Calling設定
const functions = [
  {
    name: "getTime",
    description: "Get the current time for a specific location.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description:
            "The specified location, for instance, Tokyo, Los Angeles, should be represented in the form of a timezone name such as Asia/Tokyo.",
        },
        name: {
          type: "string",
          description:
            "The location referred to in the prompt could be, for example, Tokyo, Los Angeles.",
        },
      },
      required: ["location", "name"],
    },
  },
  {
    name: "getWeather",
    description: "Get the current weather for a specific location.",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description:
            "The specified location, for instance, Tokyo, Los Angeles, should be identified by its geographical name.",
        },
        name: {
          type: "string",
          description:
            "The location referred to in the prompt could be, for example, Tokyo, Los Angeles.",
        },
      },
      required: ["location", "name"],
    },
  },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // ChatGPT
    const response = await openai.chat.completions.create({
      model: "gpt-4", // モデル名を正確に
      messages,
      functions,
      function_call: "auto",
    });

    // メッセージ取得
    const responseMessage = response.choices[0].message;

    // メッセージ取得エラー
    if (!responseMessage) {
      return new NextResponse("Message Error", { status: 500 });
    }

    // 通常のメッセージ
    if (responseMessage.content) {
      return NextResponse.json(responseMessage);
    } else {
      // Function Callingチェック
      if (!responseMessage.function_call) {
        return new NextResponse("Function Call Error", { status: 500 });
      }

      // 引数チェック
      if (!responseMessage.function_call.arguments) {
        return new NextResponse("Function Call Arguments Error", {
          status: 500,
        });
      }

      // 関数名取得
      const functionCallName = responseMessage.function_call.name;

      // 引数取得
      let functionCallArguments;
      try {
        functionCallArguments = JSON.parse(responseMessage.function_call.arguments);
      } catch (parseError) {
        console.error("引数のJSONパースエラー:", parseError);
        return new NextResponse("Invalid Function Call Arguments", { status: 500 });
      }

      // メッセージ内容
      let content = "";

      // 関数名によって処理を分岐
      if (functionCallName === "getTime") {
        // 時刻取得
        content = await getTime(functionCallArguments.location, functionCallArguments.name);
      } else if (functionCallName === "getWeather") {
        // 天気取得
        content = await getWeather(functionCallArguments.location, functionCallArguments.name);
      } else {
        return new NextResponse("Function Call Name Error", { status: 500 });
      }

      // レスポンスのメッセージ作成
      const message = {
        role: "assistant",
        content,
      };

      return NextResponse.json(message);
    }
  } catch (error) {
    console.error("POSTハンドラーエラー:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
