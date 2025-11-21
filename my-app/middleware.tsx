import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // 1. ایمپورت کردن از jose

// 2. تابع باید async باشد
export async function middleware(req:any) {
    const token = req.cookies.get('token')?.value;
    const url = req.nextUrl.clone();
    const JWT_SECRET = process.env.JWT_SECRET;
  
    if (!token) {
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    if (!JWT_SECRET) {
        console.error('JWT_SECRET is not defined in .env');
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }

    try {
     
        const secret = new TextEncoder().encode(JWT_SECRET);
        
        // 5. تابع await می‌شود
        await jwtVerify(token, secret);

        // اگر توکن معتبر بود، اجازه عبور می‌دهیم
        return NextResponse.next();

    } catch (err) {
        // اگر توکن نامعتبر یا منقضی بود
        console.error('JWT Verification Error in Middleware:', err.message);
        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
}

// این بخش عالی است و نیازی به تغییر ندارد
// middleware فقط برای این مسیرها اجرا می‌شود
export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/profile/:path*', '/admin/:path*','/user/:path*'],
};