import connectDB from '@/DB/connectDB';
import User from '@/model/User';
import Joi from 'joi';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';


const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required()
});


export  async function POST (req : Request)  {
    console.log('i got hit')
    await connectDB();

    

    const { email, password, name } = await req.json();
    const { error } = schema.validate({ email, password, name });

    if (error) return NextResponse.json({ success: false, message: error.details[0].message.replace(/['"]+/g, '') });

    try {
        const ifExist = await User.findOne({ email });
        
        if (ifExist) {
            return NextResponse.json({ success: false, message: "User Already Exist" });
        }

        else {
            const hashedPassword = await hash(password, 12)
            const createUser = await User.create({ email, name, password: hashedPassword });
            if(createUser) return NextResponse.json({ success: true, message: "Account created successfully" });
        }
    } catch (error) {
        console.log('Error in register (server) => ', error);
        return NextResponse.json({ success: false, message: "Something Went Wrong Please Retry Later !" })
    }
}

