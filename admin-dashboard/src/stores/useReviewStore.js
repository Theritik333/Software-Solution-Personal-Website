import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";

const useReviewStore = create((set, get) => ({
  reviews: [],
  loading: false,

  fetchReviews: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/reviews");
      set({ reviews: data.reviews });
    } catch {
      toast.error("Failed to fetch reviews");
    } finally {
      set({ loading: false });
    }
  },

  createReview: async (formData) => {
    set({ loading: true });
    try {
      await api.post("/reviews", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Review added!");
      get().fetchReviews();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateReview: async (id, formData) => {
    set({ loading: true });
    try {
      await api.put(`/reviews/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Review updated!");
      get().fetchReviews();
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteReview: async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Review deleted");
      get().fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  },
}));

export default useReviewStore;
