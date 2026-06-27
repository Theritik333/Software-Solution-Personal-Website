import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollTop";
import useSettingStore from "./stores/useSettingStore";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Technologies from "./pages/Technologies";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Privacy from "./pages/Privacy";

export default function App() {
  const { fetchSettings } = useSettingStore();
  useEffect(() => { fetchSettings(); }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { background: "#141720", color: "#e8eaf6", border: "1px solid #1e2235" } }} />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/projects"     element={<Projects />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/careers"      element={<Careers />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/apply"        element={<Apply />} />
          <Route path="/privacy"      element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
