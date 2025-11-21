import { connectDB } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs'; // 👈 مطمئن شوید که این کتابخانه نصب شده است
// import jwt from 'jsonwebtoken'; // اگر قصد ساخت توکن دارید، اینجا اضافه کنید

// خط import React در API Route لازم نیست و می‌تواند حذف شود.

const Register = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    } else {
        try {
            await connectDB();

            const { firstname, lastname, email, password } = req.body;
            

            //1. اعتبارسنجی ورودی‌ها
            if (!firstname?.trim() || !lastname?.trim() || !email?.trim() || !password?.trim()) {
                return res.status(400).json({
                    message: 'پر کردن فیلدهای نام، نام خانوادگی، ایمیل و رمز عبور اجباری است',
                });
            }

            //2. بررسی تکراری بودن ایمیل
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'ایمیل تکراری است' });
            }

            //3. هش کردن رمز عبور
            const hashPassword = await bcrypt.hash(password, 10);


            // 4. شمارش کاربران
            const countUsers = await User.countDocuments();

            // 4. ایجاد و ذخیره کاربر جدید
            const user = new User({
                firstname,
                lastname,
                email,
                role: countUsers === 0 ? 'admin' : 'user',
                password: hashPassword
            });

            await user.save();

            // 5. پاسخ موفقیت‌آمیز
            return res.status(201).json({ message: 'User created successfully', user: { id: user._id, email: user.email } });

        }
        catch (error) {
            console.error(error); // 👈 استفاده از console.error برای خطاهای مهم

            // مدیریت خطای اعتبارسنجی Mongoose (در صورتی که در اسکیما خطا رخ دهد)
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default Register;