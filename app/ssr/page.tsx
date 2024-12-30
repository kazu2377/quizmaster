import { searchPosts } from "./actions";
import { Post } from "./types";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || "";
  const posts = await searchPosts(query);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿検索</h1>
      <form className="mb-4">
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="検索キーワードを入力"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
          検索
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">検索結果：</h2>
        {posts.length > 0 ? (
          <ul className="space-y-2">
            {posts.map((post: Post) => (
              <li key={post.id} className="border p-2 rounded">
                <h3 className="font-bold">{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>投稿が見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
}
