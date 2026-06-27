import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github, Facebook, ArrowUpRight } from "lucide-react";
import useSettingStore from "../../stores/useSettingStore";

const LINKS = {
  Company: [
    { label: "About Us",     to: "/about" },
    { label: "Services",     to: "/services" },
    { label: "Projects",     to: "/projects" },
    { label: "Technologies", to: "/technologies" },
  ],
  Support: [
    { label: "Careers",         to: "/careers" },
    { label: "Contact",         to: "/contact" },
    { label: "Privacy Policy",  to: "/privacy" },
  ],
};

const SOCIAL_ICONS = { linkedin: Linkedin, twitter: Twitter, instagram: Instagram, github: Github, facebook: Facebook };

export default function Footer() {
  const { setting } = useSettingStore();

  return (
    <footer className="border-t border-rim bg-void">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                {setting?.companyName || "SSID Dev"}
              </span>
            </div>
            <p className="text-faint text-sm leading-relaxed max-w-xs mb-6">
              Building scalable software solutions that transform businesses. From idea to deployment, we craft digital excellence.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {setting?.socialLinks && Object.entries(setting.socialLinks).map(([key, url]) => {
                if (!url) return null;
                const Icon = SOCIAL_ICONS[key];
                if (!Icon) return null;
                return (
                  <a key={key} href={url} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-lg border border-rim hover:border-accent bg-card hover:bg-accent/10 flex items-center justify-center text-faint hover:text-glow transition-all duration-200">
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-faint uppercase tracking-widest mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map(({ label, to }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-faint hover:text-white transition-colors flex items-center gap-1 group">
                      {label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        {setting && (
          <div className="mt-12 pt-8 border-t border-rim grid grid-cols-1 sm:grid-cols-3 gap-4">
            {setting.email && (
              <a href={`mailto:${setting.email}`} className="flex items-center gap-3 text-faint hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-card border border-rim group-hover:border-accent flex items-center justify-center transition-colors">
                  <Mail size={14} className="text-accent" />
                </div>
                <span className="text-sm">{setting.email}</span>
              </a>
            )}
            {setting.number && (
              <a href={`tel:${setting.number}`} className="flex items-center gap-3 text-faint hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-card border border-rim group-hover:border-accent flex items-center justify-center transition-colors">
                  <Phone size={14} className="text-accent" />
                </div>
                <span className="text-sm">{setting.number}</span>
              </a>
            )}
            {setting.address && (
              <div className="flex items-center gap-3 text-faint">
                <div className="w-8 h-8 rounded-lg bg-card border border-rim flex items-center justify-center">
                  <MapPin size={14} className="text-accent" />
                </div>
                <span className="text-sm">{setting.address}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rim">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-faint text-xs">
            © {new Date().getFullYear()} {setting?.companyName || "SSID Dev"}. All rights reserved.
          </p>
          <p className="text-faint text-xs">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
