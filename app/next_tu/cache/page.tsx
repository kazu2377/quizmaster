import { Suspense } from "react";
//force-cacheとno-storeのテスト（suspendに書いてあるコンポーネントの部分がキャッシュのオプションでSSR、SSGと決まってるみたい？）
async function getTime(cacheOption: "force-cache" | "no-store" = "force-cache") {
  const res = await fetch("https://worldtimeapi.org/api/timezone/America/Argentina/Salta", {
    cache: cacheOption,
  });

  if (!res.ok) throw new Error("時刻の取得に失敗しました");
  return res.json();
}

async function TimeDisplay({ cacheOption }: { cacheOption: "force-cache" | "no-store" }) {
  const data = await getTime(cacheOption);
  return (
    <div className="p-4 border rounded">
      <p>現在時刻: {data.datetime}</p>
      <p>タイムゾーン: {data.timezone}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">アルゼンチン サルタの時刻</h1>
      <h2 className="text-xl mt-4 mb-2">静的データ (SSG)</h2>
      <Suspense fallback={<div>読み込み中...</div>}>
        <TimeDisplay cacheOption="force-cache" />
      </Suspense>

      <h2 className="text-xl mt-4 mb-2">動的データ (SSR)</h2>
      <Suspense fallback={<div>読み込み中...</div>}>
        <TimeDisplay cacheOption="no-store" />
      </Suspense>
    </div>
  );
}
// import { revalidateTag } from "next/cache";
// import { Suspense, use } from "react";

// async function getTime() {
//   let attempts = 0;
//   let res;
//   while (attempts < 5) {
//     try {
//       res = await fetch("https://worldtimeapi.org/api/timezone/America/Argentina/Salta", {
//         cache: "force-cache",
//         next: { tags: ["time"] },
//       });
//       if (res.ok) break;
//     } catch (error) {
//       console.error(`Attempt ${attempts + 1} failed:`, error);
//     }
//     attempts++;
//     if (attempts < 5) {
//       const delay = Math.min(1000 * Math.pow(2, attempts), 8000); // exponential backoff with max 8s
//       await new Promise(resolve => setTimeout(resolve, delay));
//     }
//   }
//   if (!res.ok) throw new Error("Failed to fetch time");
//   return res.json();
// }

// function TimeDisplay({ timePromise }: { timePromise: Promise<any> }) {
//   const data = use(timePromise);
//   return (
//     <div className="p-4 border rounded">
//       <p>現在時刻: {data.datetime}</p>
//       <p>タイムゾーン: {data.timezone}</p>
//     </div>
//   );
// }

// export default function Page() {
//   const timePromise = getTime();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">アルゼンチン サルタの時刻</h1>
//       <form
//         action={async () => {
//           "use server";
//           revalidateTag("time");
//         }}
//       >
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">再取得</button>
//       </form>
//       <Suspense fallback={<div>Loading...</div>}>
//         <TimeDisplay timePromise={timePromise} />
//       </Suspense>
//     </div>
//   );
// }
