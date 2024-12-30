"use server";

export async function sayGoodMorning(name?: string) {
  const greeting = name ? `おはようございます、${name}さん!` : "おはようございます!";

  return greeting;
}

export async function sharedAction() {
  // 複数のコンポーネントから呼び出し可能
  return "共有アクション";
}
