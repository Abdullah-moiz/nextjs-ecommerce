import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Cart from "@/model/Cart";


export async function DELETE(req: Request) {
  try {
    await connectDB();
    const isAuthenticated = await AuthCheck(req);

    if (isAuthenticated) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('id');

      if(!id)  return NextResponse.json({ success: true, message: "cart Item  ID is Required" });

      const deleteData = await Cart.findByIdAndDelete(id);

      if (deleteData) {
        return NextResponse.json({ success: true, message: "cart Item  Deleted successfully!" });
      } else {
        return NextResponse.json({ success: false, message: "Failed to Delete the cart Item . Please try again!" });
      }
    } else {
      return NextResponse.json({ success: false, message: "You are not authorized." });
    }
  } catch (error) {
    console.log('Error in deleting a cart item :', error);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
  }
}
