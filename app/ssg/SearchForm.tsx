"use client";

import { useState } from "react";
import { Post } from "./types";

export default function SearchForm({ initialPosts }: { initialPosts: Post[] }) {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPosts = initialPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase().trim())
    );
    setPosts(filteredPosts);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

