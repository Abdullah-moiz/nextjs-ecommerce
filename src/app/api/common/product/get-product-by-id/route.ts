import connectDB from "@/DB/connectDB";
import { NextResponse } from "next/server";
import Product from "@/model/Product";
import Category from "@/model/Category";

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ status: 400, success: false, message: 'Please provide Product id.' });


    const registerCategoryModel = await Category.init();


    const getData = await Product.findById(id).populate('productCategory', ' categoryName categorySlug _id')
    if (getData) {
      return NextResponse.json({ success: true, data: getData });
    } else {
      return NextResponse.json({ status: 204, success: false, message: 'No Product found.' });
    }

  } catch (error) {
    console.log('Error in getting  product by id:', error);
    return NextResponse.json({ status: 500, success: false, message: 'Something went wrong. Please try again!' });
  }
}
