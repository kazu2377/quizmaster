import { fetchData } from "./actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = Array.isArray(searchParams.query) ? searchParams.query[0] : searchParams.query;
  const page = Number(searchParams.page) || 1;
  const perPage = 10;

  const allData = await fetchData(query || "");
  const totalPages = Math.ceil(allData.length / perPage);
  const paginatedData = allData.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form method="get" className="mb-6 flex gap-2">
        <input 
          name="query" 
          defaultValue={searchParams.query || ""} 
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="検索ワードを入力..."
        />
        <input type="hidden" name="page" value="1" />
        <button 
          type="submit"
          className={`
            px-6 py-2 
            bg-blue-500 hover:bg-blue-600 
            text-white font-medium
            rounded-lg 
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          検索
        </button>
      </form>

      <div className="space-y-4">
        {paginatedData.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
            <p className="mt-2 text-gray-600">{item.body}</p>
            <div className="mt-2 text-sm text-gray-500">
              Post ID: {item.id} | User ID: {item.userId}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <a
            key={i + 1}
            href={`?query=${query || ""}&page=${i + 1}`}
            className={`px-4 py-2 rounded-lg ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}
