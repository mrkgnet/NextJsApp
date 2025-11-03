// components/FlowbiteNavbar.jsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RxCaretDown } from "react-icons/rx";

const FlowbiteNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // بررسی می‌کنیم که ref به یک المان متصل باشد و کلیک خارج از آن المان بوده باشد
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // افزودن شنونده رویداد
    document.addEventListener("mousedown", handleClickOutside);

    // حذف شنونده رویداد در زمان پاکسازی (cleanup)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // <--- اصلاح اصلی: آرایه وابستگی به [] تغییر کرد

  return (
    <div className="border-b border-gray-200">
      <nav
        dir="rtl"
        className=" container m-auto dark:border-gray-600 dark:bg-gray-900 font_sm"
      >
        <div className="flex flex-wrap justify-between items-center mx-auto p-4">
          <div
            id="mega-menu-full-cta"
            style={{ width: "100%" }}
            className="items-center w-full justify-between hidden md:flex md:w-auto md:order-1"
          >
            <ul className="flex w-full flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-4 relative">
              <li>
                <Link
                  href="/product/laptop"
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                  aria-current="page"
                >
                  لپ تاپ
                </Link>
              </li>

              {/* المانی که ref به آن متصل است */}
              <li ref={menuRef}>
                <button // بهتر است از button برای کنترل تعاملات استفاده شود تا Link
                  onClick={() => setIsOpen(!isOpen)}
                  id="mega-menu-full-cta-dropdown-button"
                  data-collapse-toggle="mega-menu-full-cta-dropdown"
                  data-dropdown-placement="bottom"
                  className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                >
                  دوربین
                  <RxCaretDown size={15} />
                </button>

                {isOpen && (
                  <div
                    id="mega-menu-full-cta-dropdown"
                    className="mt-1 bg-gray-200 border-gray-200 shadow-xs border-y dark:bg-gray-800 dark:border-gray-600 absolute right-0 w-full top-7"
                  >
                    {/* ... بقیه محتوای منو ... */}
                    <div className="grid px-4 py-5 mx-auto text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
                      <ul>
                        <li>
                          <Link href="/product/laptop/dell" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                           dell
                          </Link>
                        </li>
                        {/* ... بقیه آیتم‌ها */}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              <li>
                <Link
                  href="/product/mobile"
                  className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                  aria-current="page"
                >
                  موبایل
                </Link>
              </li>




              {/* ... بقیه لینک‌های نوبار ... */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FlowbiteNavbar;