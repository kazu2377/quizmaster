import { NextRequest, NextResponse } from "next/server";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);

    if (!res.ok) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = await res.json();
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
