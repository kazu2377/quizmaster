"use client"; // このモジュールはクライアントサイドで実行されることを指定

import { Button } from "@/components/ui/button"; // UIコンポーネント（ボタン）
import { Card } from "@/components/ui/card"; // UIコンポーネント（カード）
import { Input } from "@/components/ui/input"; // UIコンポーネント（入力フィールド）
import { useToast } from "@/components/ui/use-toast"; // 通知メッセージ用カスタムフック
import { storage } from "@/lib/storage"; // ローカルストレージ操作用のカスタムライブラリ
import { zodResolver } from "@hookform/resolvers/zod"; // zodを使ったバリデーション用リゾルバ
import { Brain } from "lucide-react"; // アイコンコンポーネント（脳のアイコン）
import { useState } from "react"; // ReactのuseStateフック
import { useForm } from "react-hook-form"; // フォーム管理用のライブラリ
import * as z from "zod"; // バリデーションスキーマ定義用ライブラリ

// 入力フォームのバリデーションスキーマをzodで定義
const formSchema = z.object({
  id: z.string().min(3, "ID must be at least 3 characters"), // IDは3文字以上
  password: z.string().min(6, "Password must be at least 6 characters"), // パスワードは6文字以上
});

// コンポーネントのプロパティ型を定義
interface LoginFormProps {
  onLogin: (userId: string) => void; // ログイン成功時に呼ばれるコールバック
}

// ログインフォームコンポーネント
export function LoginForm({ onLogin }: LoginFormProps) {
  const [isNewUser, setIsNewUser] = useState(false); // 新規登録モードかログインモードかを管理
  const { toast } = useToast(); // 通知メッセージを表示するためのフック

  // react-hook-formを初期化
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // zodをバリデーションスキーマとして使用
  });

  interface FormSchema {
    name: string;
    age: number;
  }

  const FormSchema_jen: FormSchema = {
    name: "example",
    age: 100,
  };

  interface FormSchema_zzz {
    aname: string;
    age: number;
    additionalField: string;
  }

  const FormSchema_zzz: FormSchema_zzz = {
    aname: "example",
    age: 100,
    additionalField: "extra",
  };

  function fom<T>({ a, b, c, d }: { a: number; b: number; c: number; d: T }) {
    return { r: a, h: b, f: c, g: d };
  }
  const { r, h, f, g } = fom<FormSchema_zzz>({
    a: 1,
    b: 2,
    c: 3,
    d: FormSchema_zzz,
  });

  console.log(r, h, f, g); // 1, 2, 3, "example"
  console.log("ooo"); // "extra"

  const hensu = (suuji: number): number => {
    console.log(suuji);
    return 100;
  };

  const hensuudesu = 100;

  function handleClick_2(hensu: (suuji: number) => number) {
    hensu(hensuudesu);

    return {
      a: 1,
      b: 2,
      c: 3,
    };
  }

  const { a, b, c } = handleClick_2(hensu);
  console.log(a, b, c);

  function fomz<T>({ ...atai }: { a: number; b: number; c: number }) {
    return { rr: atai.a, hh: atai.b, ff: atai.c };
  }

  const { rr, hh, ff } = fomz({
    a: 1,
    b: 2,
    c: 3,
  });
  console.log(rr, hh, ff);

  function 関数作る() {
    console.log("関数作る");
  }

  const 関数いれる = () => {
    console.log("関数いれる");
  };

  const 関数実行 = 関数いれる();

  // フォーム送信時の処理
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const existingUser = storage.getUser(data.id); // ローカルストレージからユーザー情報を取得

    if (isNewUser) {
      // 新規登録モードの場合
      if (existingUser) {
        // ユーザーが既に存在する場合はエラーメッセージを表示
        toast({
          title: "Error",
          description: "User ID already exists. Please choose a different ID.",
          variant: "destructive",
        });
        return;
      }
      // 新規ユーザー情報を保存
      storage.saveUser({ id: data.id, password: data.password });
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } else {
      // ログインモードの場合
      if (!existingUser || existingUser.password !== data.password) {
        // ユーザーが存在しない、またはパスワードが一致しない場合
        toast({
          title: "Error",
          description: "Invalid ID or password.",
          variant: "destructive",
        });
        return;
      }
    }
    onLogin(data.id); // ログイン成功時のコールバックを実行
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md p-6">
        {/* ヘッダー部分 */}
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" /> {/* 脳のアイコン */}
          <h1 className="text-2xl font-bold mb-2">Quiz Master</h1> {/* タイトル */}
          <p className="text-sm text-muted-foreground">
            {isNewUser ? "Create an account to start" : "Login to continue"}{" "}
            {/* モードに応じたメッセージ */}
          </p>
        </div>

        {/* フォーム部分 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Enter your ID" // ID入力フィールド
              {...register("id")} // react-hook-formの登録
              className="w-full"
            />
            {errors.id && (
              <p className="text-sm text-red-500 mt-1">{errors.id.message}</p> // バリデーションエラーメッセージ
            )}
          </div>

          <div>
            <Input
              type="password" // パスワード入力フィールド
              placeholder="Enter your password"
              {...register("password")}
              className="w-full"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p> // バリデーションエラーメッセージ
            )}
          </div>

          <Button type="submit" className="w-full">
            {isNewUser ? "Create Account" : "Login"} {/* モードに応じたボタン表示 */}
          </Button>
        </form>

        {/* モード切り替えボタン */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsNewUser(!isNewUser)} // モードを切り替え
            className="text-sm text-blue-500 hover:underline"
          >
            {isNewUser
              ? "Already have an account? Login" // ログインへの切り替えリンク
              : "Don't have an account? Sign up"}{" "}
            // 新規登録への切り替えリンク
          </button>
        </div>
      </Card>
    </div>
  );
}
