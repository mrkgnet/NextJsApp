import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { m } from 'framer-motion';
import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
    try {
        const { token } = req.cookies;
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'not jwt' });
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        //connect to db
        await connectDB();

        //find user
        const user = await User.findById(decoded.id).select('firstname lastname  email role _id');

        //check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        // res.status(200).json({ message: 'Authorized' });
        return res.status(200).json({
            autenticated: true,
            user: JSON.parse(JSON.stringify(user)),
            message: 'Authorized'
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}