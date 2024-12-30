'use server';

export async function submitAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    throw new Error('必須項目が入力されていません');
  }

  try {
    // ここに認証ロジックを実装
    console.log('ログイン処理:', { email });
    return { success: true };
  } catch (error) {
    throw new Error('ログインに失敗しました');
  }
}