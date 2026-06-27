import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create(
  persist(
    (set, get) => ({
      admin: null,
      loading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await api.post("/auth/login", { email, password });
          set({ admin: data.admin, isAuthenticated: true });
          toast.success("Welcome back!");
          return true;
        } catch (err) {
          toast.error(err.response?.data?.message || "Login failed");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch {}
        set({ admin: null, isAuthenticated: false });
        toast.success("Logged out");
      },

      getMe: async () => {
        try {
          const { data } = await api.get("/auth/me");
          set({ admin: data.admin, isAuthenticated: true });
        } catch {
          set({ admin: null, isAuthenticated: false });
        }
      },

      updateProfile: async (formData) => {
        set({ loading: true });
        try {
          const { data } = await api.put("/auth/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          set({ admin: data.admin });
          toast.success("Profile updated!");
          return true;
        } catch (err) {
          toast.error(err.response?.data?.message || "Update failed");
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "admin-auth", partialize: (s) => ({ admin: s.admin, isAuthenticated: s.isAuthenticated }) }
  )
);

export default useAuthStore;
