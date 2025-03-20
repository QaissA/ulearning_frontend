import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface Role {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  roleId: number;
  role: Role;
  adress?: string;
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
    try {
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Error parsing cookie:", error);
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    console.log("Cookie - Setting item:", name, value);
    Cookies.set(name, JSON.stringify(value), {
      expires: 7,
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

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: cookieStorage,
    }
  )
);
