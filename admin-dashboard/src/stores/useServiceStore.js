import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useServiceStore = create((set, get) => ({
  services: [],
  loading: false,

  fetchServices: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/services");
      set({ services: data.services });
    } catch {
      toast.error("Failed to fetch services");
    } finally {
      set({ loading: false });
    }
  },

  createService: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Service created!");
      get().fetchServices();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateService: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/services/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Service updated!");
      get().fetchServices();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteService: async (id) => {
    try {
      await api.delete(`/services/${id}`);
      toast.success("Service deleted");
      get().fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default useServiceStore;
