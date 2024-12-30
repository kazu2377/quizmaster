'use client';
import React, { useState } from 'react';
import { getPost } from './actions';

// メインページコンポーネント
const Page: React.FC = () => {
    // 状態管理の設定
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // フォーム送信時の処理
    async function handleSubmit(formData: FormData) {
        try {
            const data = await getPost(formData);
            setResult(data);
            setError(null);
        } catch (error: any) {
            setError(error.message);
            setResult(null);
        }
    }

    return (
        <div>
            <h1>データ取得フォーム</h1>
            {/* フォームコンポーネント */}
            <form action={handleSubmit}>
                <label htmlFor="postId">Post ID:</label>
                <input
                    type="number"
                    id="postId"
                    name="postId"
                    required
                />
                <button type="submit">データ取得</button>
            </form>
            {/* エラーメッセージの表示 */}
            {error && <p>{error}</p>}
            {/* 結果の表示 */}
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default Page;
