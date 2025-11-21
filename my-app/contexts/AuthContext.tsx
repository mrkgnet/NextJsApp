"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  // ۱. چک وضعیت لاگین هنگام بارگذاری
  useEffect(() => {
    fetch("/api/auth/status")
      .then((res) => res.json())
      .then((data) => setAuth(data))
      .catch(() => setAuth({ autenticated: false }));
  }, []);

  // ۲. تابع logout
  const logout = async () => {
    await fetch("/api/auth/logout");
    setAuth({ autenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ۳. هوکی که Navbar ازش استفاده می‌کند
export const useAuth = () => useContext(AuthContext);
