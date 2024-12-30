import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware.ts");
  // リクエストを処理してレスポンスを返す
  return NextResponse.next();
}
