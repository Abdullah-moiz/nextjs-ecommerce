import connectDB from "@/DB/connectDB"

export async function GET(request: Request) {
  await connectDB();
  return new Response('Hello, Next.js!')
}
