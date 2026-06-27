import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import PrivateRoute from "./components/layout/PrivateRoute.jsx";
import AdminLayout  from "./components/layout/AdminLayout.jsx";

import Login        from "./pages/Login.jsx";
import Dashboard    from "./pages/admin/Dashboard.jsx";
import Projects     from "./pages/admin/Projects.jsx";
import Partners     from "./pages/admin/Partners.jsx";
import Services     from "./pages/admin/Services.jsx";
import Reviews      from "./pages/admin/Reviews.jsx";
import About        from "./pages/admin/About.jsx";
import Technologies from "./pages/admin/Technologies.jsx";
import Careers      from "./pages/admin/Careers.jsx";
import Contact      from "./pages/admin/Contact.jsx";
import Apply        from "./pages/admin/Apply.jsx";
import Privacy      from "./pages/admin/Privacy.jsx";
import Settings     from "./pages/admin/Settings.jsx";
import Profile      from "./pages/admin/Profile.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#13161d",
            color: "#e8eaf0",
            border: "1px solid #252936",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#13161d" } },
          error:   { iconTheme: { primary: "#ef4444", secondary: "#13161d" } },
        }}
      />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Protected Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index           element={<Dashboard />} />
          <Route path="projects"     element={<Projects />} />
          <Route path="partners"     element={<Partners />} />
          <Route path="services"     element={<Services />} />
          <Route path="reviews"      element={<Reviews />} />
          <Route path="about"        element={<About />} />
          <Route path="technologies" element={<Technologies />} />
          <Route path="careers"      element={<Careers />} />
          <Route path="contact"      element={<Contact />} />
          <Route path="apply"        element={<Apply />} />
          <Route path="privacy"      element={<Privacy />} />
          <Route path="settings"     element={<Settings />} />
          <Route path="profile"      element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
