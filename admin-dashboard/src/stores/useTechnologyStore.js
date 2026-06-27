import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useTechnologyStore = create((set, get) => ({
  technologies: [],
  loading: false,

  fetchTechnologies: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/technologies");
      set({ technologies: data.technologies });
    } catch {
      toast.error("Failed to fetch technologies");
    } finally {
      set({ loading: false });
    }
  },

  createTechnology: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/technologies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Technology added!");
      get().fetchTechnologies();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateTechnology: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/technologies/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Technology updated!");
      get().fetchTechnologies();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteTechnology: async (id) => {
    try {
      await api.delete(`/technologies/${id}`);
      toast.success("Technology deleted");
      get().fetchTechnologies();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default useTechnologyStore;
