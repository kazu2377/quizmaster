//基本はSSGだがuse clientをつけてCSRにする
// "use client";
import { sharedAction } from "./actions";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default async function Page() {
  const greeting = "Good Morning!";

  // 新しいfetch処理の追加
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const res2 = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  // getDataSSR();
  // async function getDataSSR() {
  //   // サーバーサイドレンダリングでデータを取得する
  //   "use server";
  //   return "共有アクション";
  // }

  // 新しいfetch処理の追加 SSGにする
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "no-store" });
  // const res2 = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "no-store" });

  const post3: Post = await res.json();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Server Actions の例</h1>

      {/* <form action={submitForm} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="あなたの名前"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          送信
        </button>
      </form> */}

      <button onClick={sharedAction} className="bg-green-500 text-white p-2 rounded">
        サーバーアクションを実行
      </button>

      <form action={sharedAction}>
        <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
          サーバーアクションを実行
        </button>
      </form>
    </main>
  );
}
