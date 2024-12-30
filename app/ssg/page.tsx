import { searchPosts } from "./actions";
import SearchForm from "./SearchForm";

//isr_になるが本番環境でないとNGなのでSSGになる
export const revalidate = 30; // 1時間ごとに再生成

export default async function SearchPage() {
  const posts = await searchPosts("");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿検索</h1>
      <SearchForm initialPosts={posts} />
    </div>
  );
}
