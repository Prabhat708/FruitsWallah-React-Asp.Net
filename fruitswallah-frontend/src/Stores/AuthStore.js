// store/authStore.js
import { create } from "zustand";
import jwt_decode from "jwt-decode";

const useAuthStore = create((set) => ({
  token:  localStorage.getItem("Token") || null,
  UserId: null,
  UserName: null,
  isAdmin: null,

    setAuthData: (token) => {
    try {
      const decoded = jwt_decode(token);
        localStorage.setItem("Token", token);
      set({
        token,
        UserId: decoded?.UserId || null,
        UserName: decoded?.UserName || null,
        isAdmin: decoded?.isAdmin || null,
      });
    } catch (error) {
      set({ token: null, UserId: null, UserName: null });
      localStorage.removeItem("Token");
    }
  },

  initializeAuth: () => {
    const token = localStorage.getItem("Token");

    if (!token) return;
    try {
      const decoded = jwt_decode(token);
      set({
        token,
        UserId: decoded?.UserId || null,
        UserName: decoded?.UserName || null,
        isAdmin: decoded?.isAdmin || null,
      });
    } catch (err) {
      localStorage.removeItem("Token");
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("Token");
    set({ token: null, UserId: null, UserName: null });
  },
}));

export default useAuthStore;
