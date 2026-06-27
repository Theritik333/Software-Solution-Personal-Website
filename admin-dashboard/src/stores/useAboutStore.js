// import { create } from "zustand";
// import api from "../lib/axios";
// import toast from "react-hot-toast";

// const useAboutStore = create((set) => ({
//   about: null,
//   loading: false,

//   fetchAbout: async () => {
//     set({ loading: true });
//     try {
//       const { data } = await api.get("/about");
//       set({ about: data.about });
//     } catch {
//       toast.error("Failed to fetch about");
//     } finally {
//       set({ loading: false });
//     }
//   },

//   updateAbout: async (formData) => {
//     set({ loading: true });
//     try {
//       const { data } = await api.put("/about", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       set({ about: data.about });
//       toast.success("About updated!");
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//       return false;
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));

// export default useAboutStore;


import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useAboutStore = create((set, get) => ({
  abouts: [],
  loading: false,

  fetchAbout: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/about");
      set({ abouts: data.abouts || [] });
    } catch {
      toast.error("Failed to fetch about sections");
    } finally {
      set({ loading: false });
    }
  },

  createAbout: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/admin/about", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("About section created!");
      get().fetchAbout();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateAbout: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/admin/about/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("About section updated!");
      get().fetchAbout();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteAbout: async (id) => {
    try {
      await api.delete(`/admin/about/${id}`);
      toast.success("About section deleted");
      get().fetchAbout();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default useAboutStore;