import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Custom storage object that uses cookies
const cookieStorage = {
  getItem: (name: string) => {
    console.log("Cookie - Getting item:", name);
    const value = Cookies.get(name);
    console.log("Cookie - Retrieved value:", value);
    return value ? value : null;
  },
  setItem: (name: string, value: any) => {
    console.log("Cookie - Setting item:", name, value);
    // Set cookie with secure options
    Cookies.set(name, value, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    console.log("Cookie - Set complete, current cookies:", document.cookie);
  },
  removeItem: (name: string) => {
    console.log("Cookie - Removing item:", name);
    Cookies.remove(name, { path: "/" });
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => cookieStorage),
    }
  )
);
