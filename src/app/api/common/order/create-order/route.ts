import connectDB from "@/DB/connectDB";
import AuthCheck from "@/middleware/AuthCheck";
import { NextResponse } from "next/server";
import Order from "@/model/Order";
import Joi from "joi";
import Cart from "@/model/Cart";


const createOrderSchema = Joi.object({
    user: Joi.string().required(),
})





export const dynamic  = 'force-dynamic'

export async function POST(req: Request) {
    try {
        await connectDB();
        const isAuthenticated = await AuthCheck(req);

        if (isAuthenticated) {
            const data = await req.json();
            console.log(data)
            

            const { user } = data;



            const { error } = createOrderSchema.validate({ user });

            if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });


            const saveData = await Order.create(data);

            

            if (saveData) {
                const deleteData = await Cart.deleteMany({userID: user});
                return NextResponse.json({ success: true, message: "Products Are on The way !!" });
            } else {
                return NextResponse.json({ success: false, message: "Failed to create Order . Please try again!" });
            }
        } else {
            return NextResponse.json({ success: false, message: "You are not authorized Please login!" });
        }
    } catch (error) {
        console.log('Error in creating order :', error);
        return NextResponse.json({ success: false, message: 'Something went wrong. Please try again!' });
    }
}
