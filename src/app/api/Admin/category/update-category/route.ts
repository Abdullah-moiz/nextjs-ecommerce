import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "@/model/Category";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      const  {name , _id  , description  , slug } = data

      const saveData = await Category.findOneAndUpdate(_id , { categoryName : name , categoryDescription : description ,categorySlug: slug}  , { new: true });

      if (saveData) {

        return NextResponse.json({ success: true, message: "Category updated successfully!" });

      } else {

        return NextResponse.json({ success: false, message: "Failed to update the category. Please try again!" });

      }

    } else {

      return NextResponse.json({ success: false, message: "You are not authorized." });

    }

  } catch (error) {

    console.log('Error in update a new category:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });

  }
}
