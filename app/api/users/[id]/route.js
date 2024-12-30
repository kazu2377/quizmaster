// app/api/users/[id]/route.js
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  // idに基づいてデータを取得する処理
  const user = { id: parseInt(id), name: `User ${id}` };

  return NextResponse.json(user);
}

// app/api/users/route.js
export async function POST(request) {
  const data = await request.json();
  // ユーザーを作成する処理
  return NextResponse.json({ message: "User created", data });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  // ユーザーを更新する処理
  return NextResponse.json({ message: `User ${id} updated`, data });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  // ユーザーを削除する処理
  return NextResponse.json({ message: `User ${id} deleted` });
}
