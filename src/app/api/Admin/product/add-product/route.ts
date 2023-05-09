import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Product from "@/model/Product";


export const dynamic  = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      const saveData = await Product.create(data);

      if (saveData) {
        return NextResponse.json({ success: true, message: "Product added successfully!" });
      } else {
        return NextResponse.json({ success: false, message: "Failed to add the Product. Please try again!" });
      }
    } else {
      return NextResponse.json({ success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in adding a new Product:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}
