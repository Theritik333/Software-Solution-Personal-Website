import { create } from "zustand";
import api from "../lib/axios";

const useSettingStore = create((set) => ({
  setting: null,
  fetchSettings: async () => {
    try {
      const { data } = await api.get("/settings");
      set({ setting: data.setting });
    } catch {}
  },
}));
export default useSettingStore;
