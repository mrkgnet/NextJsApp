import { connectDB } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import React from 'react';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';


const JWT_SECRET = process.env.JWT_SECRET;
const Login = async (req: any, res: any) => {

    // Check if method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Check if JWT_SECRET is defined in environment variables
    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ message: 'Server configuration error' });
    }


    try {
        await connectDB()
        const { email, password } = req.body;
        // Check if email and password are valid
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        // Check if user exists in database
        const user = await User.findOne({ email });


        if (!user) {
            return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' });
        }


        // Generate JWT token
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
            firstname: user.firstname,
        }

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
       
        res.setHeader('Set-Cookie', serialize("token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60, // ✅ 1 hour
                path: '/'

            }
        ));

        // Check if email and password are correct

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                email: user.email,
                firstname: user.firstname, // می‌توانید اطلاعات بیشتر کاربر را بفرستید
                role: user.role
            }
        });



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

export default Login;
