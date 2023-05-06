import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "@/model/Category";


export async function DELETE(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json()



      const deleteData = await Category.find({});

      if (deleteData) {
        return NextResponse.json({ success: true, message: "Category Deleted successfully!" });
      } else {
        return NextResponse.json({ success: false, message: "Failed to Delete the category. Please try again!" });
      }
    } else {
      return NextResponse.json({ success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in adding a new category:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}
