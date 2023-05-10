import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Category from "@/model/Category";
import Joi from "joi";


const AddCategorySchema  = Joi.object({
  categoryName  : Joi.string().required(),
  categoryDescription  : Joi.string().required(),
  categoryImage  : Joi.string().required(),
  categorySlug  : Joi.string().required(),
})


export const dynamic  = 'force-dynamic'

export async function POST(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated === 'admin') {
      const data = await req.json();
      const {categoryName , categoryDescription , categoryImage , categorySlug} =  data;
      
      const { error } = AddCategorySchema.validate({categoryName , categoryDescription , categoryImage , categorySlug});

      if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

      const saveData = await Category.create(data);

      if (saveData) {
        return NextResponse.json({ success: true, message: "Category added successfully!" });
      } else {
        return NextResponse.json({ success: false, message: "Failed to add the category. Please try again!" });
      }
    } else {
      return NextResponse.json({ success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in adding a new category:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}
