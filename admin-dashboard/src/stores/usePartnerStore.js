import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const usePartnerStore = create((set, get) => ({
  partners: [],
  loading: false,

  fetchPartners: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/partners");
      set({ partners: data.partners });
    } catch {
      toast.error("Failed to fetch partners");
    } finally {
      set({ loading: false });
    }
  },

  createPartner: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/partners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Partner added!");
      get().fetchPartners();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updatePartner: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/partners/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Partner updated!");
      get().fetchPartners();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deletePartner: async (id) => {
    try {
      await api.delete(`/partners/${id}`);
      toast.success("Partner deleted");
      get().fetchPartners();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default usePartnerStore;
