"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Post } from "./types";

export function SearchResults({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;

    const params = new URLSearchParams(searchParams?.toString() || "");
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          name="search"
          defaultValue={searchParams?.get("q") ?? ""}
          type="search"
          className="flex-1 px-4 py-2 border rounded"
          placeholder="検索キーワードを入力..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          検索
        </button>
      </form>

      <div className="grid gap-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 border rounded">
            <h2 className="font-bold">{post.title}</h2>
            <p className="mt-2">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
