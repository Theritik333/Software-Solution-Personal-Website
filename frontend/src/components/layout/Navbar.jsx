import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import useSettingStore from "../../stores/useSettingStore";
import clsx from "clsx";

const NAV = [
  { to: "/",            label: "Home" },
  { to: "/about",       label: "About" },
  { to: "/services",    label: "Services" },
  { to: "/projects",    label: "Projects" },
  { to: "/technologies",label: "Technologies" },
  { to: "/careers",     label: "Careers" },
  { to: "/contact",     label: "Contact" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setting } = useSettingStore();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-void/90 backdrop-blur-xl border-b border-rim shadow-2xl shadow-black/50"
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {setting?.logo?.url ? (
              <img src={setting.logo.url} alt="logo" className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                <Zap size={16} className="text-white" />
              </div>
            )}
            <span className="font-display font-bold text-white text-lg group-hover:text-glow transition-colors">
              {setting?.companyName || "SSID Dev"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to} to={to} end={to === "/"}
                className={({ isActive }) => clsx(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white bg-accent/10 border border-accent/20"
                    : "text-faint hover:text-white hover:bg-white/5"
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-faint hover:text-white hover:bg-white/5 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={clsx(
        "fixed inset-0 z-40 lg:hidden transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={clsx(
          "absolute top-16 left-0 right-0 bg-void border-b border-rim transition-all duration-300",
          open ? "translate-y-0" : "-translate-y-4"
        )}>
          <div className="px-5 py-6 space-y-1">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to} to={to} end={to === "/"}
                className={({ isActive }) => clsx(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive ? "bg-accent/10 border border-accent/20 text-white" : "text-faint hover:text-white hover:bg-white/5"
                )}
              >
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-primary w-full justify-center mt-4">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
