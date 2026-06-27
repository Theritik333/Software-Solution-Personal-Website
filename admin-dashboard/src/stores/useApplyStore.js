// import { create } from "zustand";
// import api from "../lib/axios";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";

// const useApplyStore = create((set, get) => ({
//   applications: [],
//   total: 0,
//   unread: 0,
//   loading: false,
//   page: 1,
//   statusFilter: "all",

//   fetchApplications: async (page = 1, statusFilter = "all") => {
//     set({ loading: true });
//     try {
//       const params = new URLSearchParams({ page, limit: 15 });
//       if (statusFilter !== "all") params.append("status", statusFilter);

//       const { data } = await api.get(`/admin/applications?${params}`);
//       set({ applications: data.applications, total: data.total, unread: data.unread, page, statusFilter });
//     } catch {
//       toast.error("Failed to fetch applications");
//     } finally {
//       set({ loading: false });
//     }
//   },

//   updateStatus: async (id, status) => {
//     try {
//       await api.put(`/admin/applications/${id}`, { status, isRead: true });
//       toast.success(`Status updated to ${status}`);
//       set((s) => ({
//         applications: s.applications.map((a) =>
//           a._id === id ? { ...a, status, isRead: true } : a
//         ),
//       }));
//     } catch {
//       toast.error("Update failed");
//     }
//   },

//   deleteApplication: async (id) => {
//     try {
//       await api.delete(`/admin/applications/${id}`);
//       toast.success("Application deleted");
//       get().fetchApplications(get().page, get().statusFilter);
//     } catch {
//       toast.error("Delete failed");
//     }
//   },

//   exportToExcel: async () => {
//     try {
//       const { data } = await api.get("/admin/applications?limit=10000");
//       const rows = data.applications.map((a, i) => ({
//         "S.No":         i + 1,
//         "Name":         a.name,
//         "Email":        a.email,
//         "Phone":        a.number,
//         "Applying For": a.applyingFor || "-",
//         "Message":      a.message || "-",
//         "Resume URL":   a.resume?.url || "-",
//         "Status":       a.status,
//         "Applied On":   new Date(a.createdAt).toLocaleString("en-IN"),
//       }));
//       const ws = XLSX.utils.json_to_sheet(rows);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Applications");
//       XLSX.writeFile(wb, "apply-now-queries.xlsx");
//       toast.success("Excel file downloaded!");
//     } catch {
//       toast.error("Export failed");
//     }
//   },
// }));

// export default useApplyStore;

import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const useApplyStore = create((set, get) => ({
  applications: [],
  total:        0,
  unread:       0,
  loading:      false,
  page:         1,
  statusFilter: "all",
  careerFilter: null,

  fetchApplications: async (page = 1, statusFilter = "all", careerId = null) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (statusFilter !== "all") params.append("status",   statusFilter);
      if (careerId)               params.append("careerId", careerId);

      const { data } = await api.get(`/admin/applications?${params}`);
      set({
        applications: data.applications,
        total:        data.total,
        unread:       data.unread,
        page,
        statusFilter,
        careerFilter: careerId,
      });
    } catch {
      toast.error("Failed to fetch applications");
    } finally {
      set({ loading: false });
    }
  },

  updateStatus: async (id, status) => {
    try {
      await api.put(`/admin/applications/${id}`, { status, isRead: true });
      toast.success(`Status → ${status}`);
      set((s) => ({
        applications: s.applications.map((a) =>
          a._id === id ? { ...a, status, isRead: true } : a
        ),
      }));
    } catch {
      toast.error("Update failed");
    }
  },

  deleteApplication: async (id) => {
    try {
      await api.delete(`/admin/applications/${id}`);
      toast.success("Application deleted");
      set((s) => ({ applications: s.applications.filter((a) => a._id !== id) }));
    } catch {
      toast.error("Delete failed");
    }
  },

  exportToExcel: async (careerId = null) => {
    try {
      const params = new URLSearchParams({ limit: 10000 });
      if (careerId) params.append("careerId", careerId);
      const { data } = await api.get(`/admin/applications?${params}`);

      const rows = data.applications.map((a, i) => ({
        "S.No":        i + 1,
        "Name":        a.name,
        "Email":       a.email,
        "Phone":       a.number,
        "Applied For": a.careerRole || a.careerId?.role || "General",
        "Location":    a.careerId?.location || "—",
        "Job Type":    a.careerId?.jobType  || "—",
        "Message":     a.message   || "—",
        "Resume URL":  a.resume?.url,
        "Status":      a.status,
        "Applied On":  new Date(a.createdAt).toLocaleString("en-IN"),
      }));

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Applications");
      XLSX.writeFile(wb, careerId ? `applications-${careerId}.xlsx` : "all-applications.xlsx");
      toast.success("Excel downloaded!");
    } catch {
      toast.error("Export failed");
    }
  },
}));

export default useApplyStore;