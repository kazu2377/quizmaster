'use client';

import { useState } from 'react';

interface Data {
  title: string;
  body: string;
}

export default function ClientComponent({ initialData }: { initialData: Data }) {
  const [data, setData] = useState<Data>(initialData);

  const updateTitle = () => {
    setData((prev) => ({ ...prev, title: prev.title + ' (Updated)' }));
  };

  return (
    <div>
      <h2>クライアントサイドコンポーネント</h2>
      <p>Title: {data.title}</p>
      <p>Body: {data.body}</p>
      <button onClick={updateTitle}>タイトルを更新</button>
    </div>
  );
}
