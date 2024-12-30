//Serverサイドレンダリングの場合は、APIルートを使用してデータを取得することができます。

import { sayGoodMorning } from "./actions";
import { fetchPost } from "./post";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export default async function Page() {
  const greeting = await sayGoodMorning("ユーザー");
  const { data: post } = await fetchPost("1"); // 例として投稿ID:1を取得

  return (
    <div className="container mx-auto p-4">
      <div className="text-xl mb-4">{greeting}</div>
      <h2 className="text-2xl font-bold mb-4">投稿検索</h2>


      {post && (
        <div className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="mt-2 text-gray-600">{post.body}</p>
        </div>
      )}
    </div>
  );
}
