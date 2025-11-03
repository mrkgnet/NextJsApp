import React from "react";

const Index = () => {
  return (
    <div className="font_sm">
      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
            فرم تماس با ما
          </h2>

          <form
            className="bg-white p-8 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("پیام شما با موفقیت ارسال شد ✅");
            }}
          >
            {/* نام */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام کامل
              </label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="مثلاً محمدرضا خسروی"
                required
              />
            </div>

            {/* ایمیل */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* شماره تماس */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره تماس
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="09123456789"
              />
            </div>

            {/* موضوع */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                موضوع
              </label>
              <input
                type="text"
                name="subject"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="موضوع پیام شما"
              />
            </div>

            {/* پیام */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                متن پیام
              </label>
              <textarea
                name="message"
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="متن پیام خود را بنویسید..."
                required
              ></textarea>
            </div>

            {/* دکمه ارسال */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-medium px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                ارسال پیام
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
