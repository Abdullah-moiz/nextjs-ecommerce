import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
import Bookmark from "@/model/Bookmark";
import AuthCheck from "@/middleware/AuthCheck";
import Product from "@/model/Product";
import User from "@/model/User";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');


    if (!id) return NextResponse.json({ status: 400, success: false, message: 'Please Login !' });

    const registerProductModel =  await Product.init();
    
    const registerUserModel =  await User.init();

    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const getData = await Bookmark.find({ userID: id }).populate('userID').populate('productID');
      if (getData) {
        return NextResponse.json({ success: true, data: getData });
      } else {
        return NextResponse.json({ status: 204, success: false, message: 'No bookmark Item found.' });
      }

    } else {
      return NextResponse.json({ success: false, message: "You are not authorized Please login!" });
    }


  } catch (error) {
    console.log('Error in getting  bookmark :', error);
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' });
  }
}
