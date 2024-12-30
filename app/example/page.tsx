// app/example/page.tsx

import ClientComponent from "./ClientComponent";

// サーバーサイドでデータを取得して渡す
export default async function ExamplePage() {

  // // SSR
  // // サーバーサイドでデータを取得
  // const data = await fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
  //   res.json()
  // );

  // ISR 
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "force-cache", // SSGのためのキャッシュ設定
    next: {
      revalidate: 3600, // 1時間ごとに再検証（必要に応じて調整）
    },
  }).then((res) => res.json());

  return (
    <div>
      <h1>SSRとCSRの組み合わせ</h1>
      <ClientComponent initialData={data} />
    </div>
  );
}
