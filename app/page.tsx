"use client"; // Next.jsのクライアントコンポーネントであることを示すディレクティブ。

import { History } from "@/components/history"; // 履歴表示コンポーネントをインポート。
import { LoginForm } from "@/components/login-form"; // ログインフォームコンポーネントをインポート。
import { Quiz } from "@/components/quiz"; // クイズ表示コンポーネントをインポート。
import { useState } from "react"; // ReactのuseStateフックをインポート。

export default function Home() {
  // ユーザーIDの状態管理（未ログイン時はnull）。
  const [userId, setUserId] = useState<string | null>(null);

  // 履歴表示モードかどうかを管理する状態変数。
  const [showHistory, setShowHistory] = useState(false);

  // ユーザーがログインしていない場合、ログインフォームを表示。
  if (!userId) {
    return <LoginForm onLogin={setUserId} />; // ログイン後、ユーザーIDを状態にセット。
  }

  // 履歴表示モードの場合、履歴コンポーネントを表示。
  if (showHistory) {
    return (
      <History
        userId={userId} // 履歴を表示するためのユーザーID。
        onBack={() => setShowHistory(false)} // 「戻る」ボタンが押されたときに履歴モードを解除。
      />
    );
  }

  // ユーザーがログイン済みかつ履歴モードでない場合、クイズを表示。
  return (
    <Quiz
      userId={userId} // クイズデータを取得するためのユーザーID。
      onShowHistory={() => setShowHistory(true)} // 履歴を表示するボタンが押されたときに履歴モードを有効化。
    />
  );
}
