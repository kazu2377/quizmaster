// 'use client';

//Serverアクション
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitAction } from "./actions";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <form action={submitAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            メールアドレス
          </label>
          <Input id="email" name="email" type="email" required className="w-full" />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            パスワード
          </label>
          <Input id="password" name="password" type="password" required className="w-full" />
        </div>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
    </div>
  );
}
