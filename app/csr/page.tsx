"use client";

import { useState } from "react";
import { searchPosts } from "./actions";
import { Post } from "./types";

export default function Page() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const results = await searchPosts(query);
      setPosts(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 border rounded px-4 py-2"
          placeholder="検索キーワードを入力..."
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "検索中..." : "検索"}
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
