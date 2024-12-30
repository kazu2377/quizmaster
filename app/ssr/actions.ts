"use server";

import { Post } from "./types";

export async function searchPosts(query: string) {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts${
      query ? `?title=${encodeURIComponent(query)}` : ""
    }`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Failed to fetch posts");
    const posts = await res.json();

    return posts.filter((post: Post) =>
      query ? post.title.toLowerCase().includes(query.toLowerCase().trim()) : true
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
