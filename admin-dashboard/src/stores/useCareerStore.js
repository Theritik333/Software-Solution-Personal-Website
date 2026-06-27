// import { create } from "zustand";
// import api from "../lib/axios";
// import toast from "react-hot-toast";

// const useCareerStore = create((set, get) => ({
//   careers: [],
//   loading: false,

//   fetchCareers: async () => {
//     set({ loading: true });
//     try {
//       const { data } = await api.get("/careers");
//       set({ careers: data.careers });
//     } catch {
//       toast.error("Failed to fetch careers");
//     } finally {
//       set({ loading: false });
//     }
//   },

//   createCareer: async (body) => {
//     set({ loading: true });
//     try {
//       await api.post("/careers", body);
//       toast.success("Career posted!");
//       get().fetchCareers();
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Create failed");
//       return false;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   updateCareer: async (id, body) => {
//     set({ loading: true });
//     try {
//       await api.put(`/careers/${id}`, body);
//       toast.success("Career updated!");
//       get().fetchCareers();
//       return true;
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//       return false;
//     } finally {
//       set({ loading: false });
//     }
//   },

//   deleteCareer: async (id) => {
//     try {
//       await api.delete(`/careers/${id}`);
//       toast.success("Career deleted");
//       get().fetchCareers();
//     } catch {
//       toast.error("Delete failed");
//     }
//   },
// }));

// export default useCareerStore;
import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

// Safely convert array to JSON string for FormData / JSON body
const toJson = (val) => {
  if (!val) return "[]";
  if (Array.isArray(val)) return JSON.stringify(val);
  return val; // already string
};

const useCareerStore = create((set, get) => ({
  careers: [],
  loading: false,

  fetchCareers: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/careers");
      set({ careers: data.careers });
    } catch {
      toast.error("Failed to fetch careers");
    } finally {
      set({ loading: false });
    }
  },

  createCareer: async (body) => {
    set({ loading: true });
    try {
      // Send as JSON (not FormData) — no file uploads in careers
      await api.post("/careers", {
        ...body,
        requirements:   Array.isArray(body.requirements)   ? body.requirements   : [],
        mustHaveSkills: Array.isArray(body.mustHaveSkills) ? body.mustHaveSkills : [],
      });
      toast.success("Career posted!");
      get().fetchCareers();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateCareer: async (id, body) => {
    set({ loading: true });
    try {
      await api.put(`/careers/${id}`, {
        ...body,
        requirements:   Array.isArray(body.requirements)   ? body.requirements   : [],
        mustHaveSkills: Array.isArray(body.mustHaveSkills) ? body.mustHaveSkills : [],
      });
      toast.success("Career updated!");
      get().fetchCareers();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteCareer: async (id) => {
    try {
      await api.delete(`/careers/${id}`);
      toast.success("Career deleted");
      get().fetchCareers();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default useCareerStore;