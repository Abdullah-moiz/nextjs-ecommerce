import connectDB from "@/DB/connectDB"
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);
    if (isAuthenticated) {
        console.log(isAuthenticated)
        //  handle Rest Code here
        return NextResponse.json({ message: "Hello" });
    } else {
        return NextResponse.json({ message: "You are not authorized" });
    }
}