import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "@/model/Category";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if(!id) return NextResponse.json({status: 400 , success: false, message: 'Please provide category id.' });

    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const getData = await Category.findById(id);
      if (getData) {
        return NextResponse.json({success  :true , data : getData});
      } else {
        return NextResponse.json({status: 204 , success: false, message: 'No categories found.' });
      }
    } else {
      return NextResponse.json({status: 401 , success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in getting  categories by id:', error);
    return NextResponse.json({status : 500 , success: false, message: 'Something went wrong. Please try again!' });
  }
}
