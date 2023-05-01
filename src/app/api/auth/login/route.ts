import connectDB from '@/DB/connectDB';
import User from '@/model/User';
import Joi from 'joi';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});




export  async function POST (req: Request){
    await connectDB();

    const { email, password } = await req.json();
    const { error } = schema.validate({ email, password });

    if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return NextResponse.json({ success: false, message: "Account not Found" });

        const isMatch = await compare(password, checkUser.password);
        if (!isMatch) return NextResponse.json({ success: false, message: "Incorrect Password" });

        const token = jwt.sign({ id: checkUser._id, email: checkUser.email , role : checkUser?.role }, process.env.JWT_SECREAT ?? 'default_secret_dumbScret', { expiresIn: '1d' });

        const finalData = {token , user : {email : checkUser.email , name : checkUser.name , _id : checkUser._id , role : checkUser?.role}}
        return NextResponse.json({ success: true, message: "Login Successfull",  finalData})

    } catch (error) {
        console.log('Error in register (server) => ', error);
        return NextResponse.json({ success: false, message: "Something Went Wrong Please Retry Later !" })
    }
}
