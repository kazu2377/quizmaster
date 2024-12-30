"use server";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPost(id: string): Promise<{ data?: Post; error?: string }> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: "投稿が見つかりませんでした" };
    }

    const post = await res.json();
    return { data: post };
  } catch (error) {
    console.error("投稿取得エラー:", error);
    return { error: "サーバーエラーが発生しました" };
  }
}
