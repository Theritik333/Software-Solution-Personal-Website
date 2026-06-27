import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const useContactStore = create((set, get) => ({
  contacts: [],
  total: 0,
  unread: 0,
  loading: false,
  page: 1,
  filter: "all", // all | unread | read

  fetchContacts: async (page = 1, filter = "all") => {
    set({ loading: true });
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (filter === "unread") params.append("isRead", "false");
      if (filter === "read")   params.append("isRead", "true");

      const { data } = await api.get(`/admin/contacts?${params}`);
      set({ contacts: data.contacts, total: data.total, unread: data.unread, page, filter });
    } catch {
      toast.error("Failed to fetch contacts");
    } finally {
      set({ loading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      await api.put(`/admin/contacts/${id}/read`);
      // update local state
      set((s) => ({
        contacts: s.contacts.map((c) => c._id === id ? { ...c, isRead: true } : c),
        unread: Math.max(0, s.unread - 1),
      }));
    } catch {
      toast.error("Failed to mark as read");
    }
  },

  deleteContact: async (id) => {
    try {
      await api.delete(`/admin/contacts/${id}`);
      toast.success("Contact deleted");
      get().fetchContacts(get().page, get().filter);
    } catch {
      toast.error("Delete failed");
    }
  },

  exportToExcel: async () => {
    try {
      const { data } = await api.get("/admin/contacts?limit=10000");
      const rows = data.contacts.map((c, i) => ({
        "S.No":           i + 1,
        "Name":           c.name,
        "Email":          c.email,
        "Country Code":   c.countryCode,
        "Phone":          c.phoneNumber,
        "Business Name":  c.businessName || "-",
        "Service Needed": c.serviceNeeded || "-",
        "Message":        c.message,
        "Read":           c.isRead ? "Yes" : "No",
        "Submitted On":   new Date(c.createdAt).toLocaleString("en-IN"),
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contacts");
      XLSX.writeFile(wb, "contact-queries.xlsx");
      toast.success("Excel file downloaded!");
    } catch {
      toast.error("Export failed");
    }
  },
}));

export default useContactStore;
