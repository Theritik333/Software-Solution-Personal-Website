import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const usePrivacyStore = create((set) => ({
  policy: null,
  loading: false,

  fetchPolicy: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/privacy-policy");
      set({ policy: data.policy });
    } catch {
      toast.error("Failed to fetch privacy policy");
    } finally {
      set({ loading: false });
    }
  },

  updatePolicy: async (body) => {
    set({ loading: true });
    try {
      const { data } = await api.put("/privacy-policy", body);
      set({ policy: data.policy });
      toast.success("Privacy policy updated!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePrivacyStore;
