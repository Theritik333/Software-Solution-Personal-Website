import { create } from "zustand";
import api from "../lib/axios";

const useDashboardStore = create((set) => ({
  stats: null,
  charts: null,
  loading: false,

  fetchDashboard: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/admin/dashboard");
      set({ stats: data.stats, charts: data.charts });
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDashboardStore;
