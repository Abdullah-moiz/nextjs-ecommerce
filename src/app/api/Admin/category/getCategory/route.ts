import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "@/model/Category";


export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const getData = await Category.find({});
      if (getData) {
        return NextResponse.json({success  :true , data : getData});
      } else {
        return NextResponse.json({status: 204 , success: false, message: 'No categories found.' });
      }
    } else {
      return NextResponse.json({status: 401 , success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in getting all categories:', error);
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
  }
}
