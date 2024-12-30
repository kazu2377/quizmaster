'use server';

// 指定されたIDのポストを取得するサーバーアクション
export async function getPost(formData: FormData) {
    // フォームデータからIDを取得
    const id = formData.get('postId');
    
    try {
        // JSONPlaceholderのAPIからデータを取得
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
            throw new Error('データの取得に失敗しました。');
        }
        return response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}
