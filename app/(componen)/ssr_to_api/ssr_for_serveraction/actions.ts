"use server";

export async function fetchData(query: string) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts${
      query ? `?title_like=${encodeURIComponent(query)}` : ""
      }`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
