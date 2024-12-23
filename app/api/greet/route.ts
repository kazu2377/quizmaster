export async function GET(request: Request): Promise<Response> {
  return new Response(JSON.stringify({ message: "Hello from the server!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
