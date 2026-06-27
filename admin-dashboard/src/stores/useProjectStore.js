import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useProjectStore = create((set, get) => ({
  projects: [],
  total: 0,
  loading: false,
  page: 1,

  fetchProjects: async (page = 1) => {
    set({ loading: true });
    try {
      const { data } = await api.get(`/projects?page=${page}&limit=10`);
      set({ projects: data.projects, total: data.total, page });
    } catch (err) {
      toast.error("Failed to fetch projects");
    } finally {
      set({ loading: false });
    }
  },

  createProject: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project created!");
      get().fetchProjects(1);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateProject: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/projects/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Project updated!");
      get().fetchProjects(get().page);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteProject: async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      get().fetchProjects(get().page);
    } catch (err) {
      toast.error("Delete failed");
    }
  },
}));

export default useProjectStore;
