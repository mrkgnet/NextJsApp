import jwt from 'jsonwebtoken'; // ۱. استفاده از 'jsonwebtoken' (چون در سرور Node.js هستیم)
import { connectDB } from '@/lib/db'; // ۲. ایمپورت اتصال دیتابیس
import User from '@/models/user'; // ۳. ایمپورت مدل یوزر

/**
 * این تابع HOF، یک تابع getServerSideProps دیگر را به عنوان ورودی (اختیاری) می‌گیرد
 * و یک تابع getServerSideProps جدید برمی‌گرداند که اطلاعات 'user' به آن تزریق شده است.
 */
export function withAuth(gssp) {
    
    return async (context) => {
        const { token } = context.req.cookies;
        const JWT_SECRET = process.env.JWT_SECRET;

        // ۴. چک کردن مجدد توکن (لایه امنیتی اضافه)
        if (!token) {
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        let user;
        try {
            // ۵. توکن را decode می‌کنیم تا ID کاربر را بدست آوریم
            const decoded = jwt.verify(token, JWT_SECRET);
            
            // ۶. به دیتابیس وصل می‌شویم
            await connectDB();
            
            // ۷. کاربر را از دیتابیس پیدا می‌کنیم
            const userFromDB = await User.findOne({ _id: decoded.id }).select('firstname email _id lastname role');

            if (!userFromDB) {
                // اگر یوزر در دیتابیس نبود
                return {
                    redirect: {
                        destination: '/auth/login',
                        permanent: false,
                    },
                };
            }

            // ۸. آبجکت Mongoose را به JSON ساده تبدیل می‌کنیم تا به props پاس داده شود
            user = JSON.parse(JSON.stringify(userFromDB));

        } catch (err) {
            // اگر توکن نامعتبر یا منقضی بود
            console.error('withAuth HOF Error:', err.message);
            return {
                redirect: {
                    destination: '/auth/login',
                    permanent: false,
                },
            };
        }

        // ۹. اگر صفحه خودش دیتای دیگری هم لازم داشت
        if (gssp) {
            // تابع gssp اصلی صفحه را اجرا می‌کنیم
            const pageProps = await gssp(context, user); 
            
            // props های صفحه را با props یوزر ترکیب می‌کنیم
            return {
                props: {
                    ...pageProps.props, // props های مخصوص صفحه
                    user: user, // یوزر احراز هویت شده
                },
            };
        }

        // ۱۰. اگر صفحه دیتای دیگری لازم نداشت (مثل داشبورد ساده)
        return {
            props: {
                user: user,
            },
        };
    };
}


