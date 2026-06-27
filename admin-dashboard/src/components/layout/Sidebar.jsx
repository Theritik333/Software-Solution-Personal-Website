import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, Handshake, Briefcase,
  Star, Info, Phone, FileText, Cpu, Users,
  Settings, LogOut, Shield, ChevronRight, Menu, X, User,
} from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import { useState } from "react";

const navItems = [
  { to: "/admin",              icon: LayoutDashboard, label: "Dashboard",      end: true },
  { to: "/admin/projects",     icon: FolderKanban,    label: "Projects" },
  { to: "/admin/partners",     icon: Handshake,       label: "Partners" },
  { to: "/admin/services",     icon: Briefcase,       label: "Services" },
  { to: "/admin/reviews",      icon: Star,            label: "Client Reviews" },
  { to: "/admin/about",        icon: Info,            label: "About" },
  { to: "/admin/technologies", icon: Cpu,             label: "Technologies" },
  { to: "/admin/careers",      icon: Users,           label: "Careers" },
  { to: "/admin/contact",      icon: Phone,           label: "Contact Queries" },
  { to: "/admin/apply",        icon: FileText,        label: "Apply Now" },
  { to: "/admin/privacy",      icon: Shield,          label: "Privacy & Policy" },
  { to: "/admin/settings",     icon: Settings,        label: "Settings" },
  { to: "/admin/profile",      icon: User,            label: "My Profile" },
];

export default function Sidebar() {
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#252936]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">A</span>
          </div>
          <span className="font-display font-bold text-white text-lg">AdminPanel</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to} to={to} end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? "bg-indigo-600/15 text-indigo-400 border border-indigo-600/20"
                  : "text-slate-400 hover:text-slate-100 hover:bg-[#1a1e28]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-indigo-400" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div className="px-4 py-4 border-t border-[#252936]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-600/30 overflow-hidden flex items-center justify-center">
            {admin?.profileImage?.url
              ? <img src={admin.profileImage.url} alt="admin" className="w-full h-full object-cover" />
              : <span className="text-indigo-400 font-bold text-sm">{admin?.name?.[0]?.toUpperCase()}</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{admin?.name}</p>
            <p className="text-xs text-slate-500 truncate">{admin?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full btn-danger justify-center py-2">
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-[#13161d] border border-[#252936] rounded-lg text-slate-300"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-[#13161d] border-r border-[#252936] z-50">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-[#13161d] border-r border-[#252936] fixed top-0 left-0 z-30">
        <SidebarContent />
      </aside>
    </>
  );
}
