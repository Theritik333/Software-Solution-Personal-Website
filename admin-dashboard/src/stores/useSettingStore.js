import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useSettingStore = create((set) => ({
  setting: null,
  loading: false,

  fetchSettings: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/settings");
      set({ setting: data.setting });
    } catch {
      toast.error("Failed to fetch settings");
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (formData) => {
    set({ loading: true });
    try {
      const { data } = await api.put("/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ setting: data.setting });
      toast.success("Settings saved!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default useSettingStore;
