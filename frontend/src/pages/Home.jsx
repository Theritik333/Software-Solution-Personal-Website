import { useEffect } from "react";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Technologies from "../components/sections/Technologies";
import Reviews from "../components/sections/Reviews";
import CTA from "../components/sections/CTA";
import useDataStore from "../stores/useDataStore";

export default function Home() {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  const { fetchAll } = useDataStore();
  useEffect(() => { fetchAll(); }, []);
  return <main className="overflow-x-hidden"><Hero /><Services /><Projects /><Technologies /><Reviews /><CTA /></main>;
}
