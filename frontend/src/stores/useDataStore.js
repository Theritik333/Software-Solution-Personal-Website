import { create } from "zustand";
import api from "../lib/axios";

const useDataStore = create((set) => ({
  projects:     [],
  partners:     [],
  services:     [],
  reviews:      [],
  technologies: [],
  abouts:       [],
  careers:      [],
  loading:      false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const [proj, part, serv, rev, tech, about, career] = await Promise.allSettled([
        api.get("/projects"),
        api.get("/partners"),
        api.get("/services"),
        api.get("/reviews"),
        api.get("/technologies"),
        api.get("/about"),
        api.get("/careers"),
      ]);
      set({
        projects:     proj.status    === "fulfilled" ? proj.value.data.projects     : [],
        partners:     part.status    === "fulfilled" ? part.value.data.partners     : [],
        services:     serv.status    === "fulfilled" ? serv.value.data.services     : [],
        reviews:      rev.status     === "fulfilled" ? rev.value.data.reviews       : [],
        technologies: tech.status    === "fulfilled" ? tech.value.data.technologies : [],
        abouts:       about.status   === "fulfilled" ? about.value.data.abouts      : [],
        careers:      career.status  === "fulfilled" ? career.value.data.careers    : [],
      });
    } catch {}
    finally { set({ loading: false }); }
  },

  fetchCareers: async () => {
    try {
      const { data } = await api.get("/careers");
      set({ careers: data.careers });
    } catch {}
  },
}));
export default useDataStore;
