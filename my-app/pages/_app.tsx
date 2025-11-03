import Footer from "@/components/footer/Footer";
import Menu from "@/components/menu/menu";
import Navbar from "@/components/navbar/navbar";
import SideBar from "@/components/sidebar/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // استایل پیش‌فرض نوار

// تنظیم ظاهر نوار (اختیاری)
NProgress.configure({ showSpinner: false, speed: 400 });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Menu />
      <SideBar />
      <Component {...pageProps} />

      <Footer />

    </>
  );
}
