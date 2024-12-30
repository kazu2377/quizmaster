//基本はSSGだがuse clientをつけてCSRにする
"use client";

//補足
// 'use client'でServerアクションの方法
//       <button onClick={() => sharedAction()} className="bg-green-500 text-white p-2 rounded">
//         サーバーアクションを実行
//       </button>

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

  // 新しいfetch処理の追加 SSGにする
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "no-store" });
  // const res2 = await fetch("https://jsonplaceholder.typicode.com/posts/1", { cache: "no-store" });

  const post3: Post = await res.json();

  return (
    <div className="container mx-auto p-4">
      <div className="text-xl mb-4">{greeting}</div>
      <h2 className="text-2xl font-bold mb-4">投稿検索</h2>

      {post3 && (
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">{post3.title}</h3>
          <p className="mt-2 text-gray-600">{post3.body}</p>
        </div>
      )}
    </div>
  );
}
