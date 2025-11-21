import Footer from "@/components/footer/Footer";
import Menu from "@/components/menu/menu";
import Navbar from "@/components/navbar/navbar";
import SideBar from "@/components/sidebar/SideBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // استایل پیش‌فرض نوار
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// تنظیم ظاهر نوار (اختیاری)
NProgress.configure({ showSpinner: false, speed: 400 });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {

// show login 
const [isAuth , setIsAuth] = useState(false)
useEffect(() =>{
  const checkAuth  = async () => {
    const res = await fetch('/api/auth/status')
    if (res.status === 200) {
      setIsAuth(true)
    }else {
      setIsAuth(false)
    }
  }

  checkAuth ()
},[])



  return (
    <>
    
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Menu />
      <SideBar />
       
      <Component {...pageProps} isAuth={isAuth} setIsAuth={setIsAuth}/>

      <Footer />


    </>

  );
}
