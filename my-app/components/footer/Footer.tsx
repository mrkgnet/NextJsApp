import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* ستون‌ها */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* ستون ۱ */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                درباره ما
              </h4>
              <p className="text-sm leading-6">
                ما یک تیم توسعه‌دهنده هستیم که هدفمان ساخت اپلیکیشن‌ها و
                وب‌سایت‌های مدرن، سریع و کاربرپسند است.
              </p>
            </div>

            {/* ستون ۲ */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                لینک‌های مفید
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    خانه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    خدمات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    نمونه‌کارها
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>

            {/* ستون ۳ */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                خدمات ما
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    طراحی وب‌سایت
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    توسعه اپلیکیشن
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    سئو و بهینه‌سازی
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    پشتیبانی فنی
                  </a>
                </li>
              </ul>
            </div>

            {/* ستون ۴ */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                تماس با ما
              </h4>
              <ul className="space-y-2 text-sm">
                <li>📍 تهران، خیابان مثال، پلاک ۱۲۳</li>
                <li>📞 ۰۹۱۲۳۴۵۶۷۸۹</li>
                <li>✉️ info@example.com</li>
              </ul>
            </div>

            {/* ستون ۵ */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                ما را دنبال کنید
              </h4>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="hover:text-blue-400 text-xl">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className="hover:text-pink-400 text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-blue-600 text-xl">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="hover:text-blue-700 text-xl">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* خط جداکننده */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
