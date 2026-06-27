import { useEffect, useState } from "react";
import { Save, Globe, Phone, Mail, MapPin, Building2 } from "lucide-react";
import useSettingStore from "../../stores/useSettingStore";
import ImageUpload from "../../components/ui/ImageUpload";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const SOCIALS = [
  { key: "linkedin",  label: "LinkedIn URL",  placeholder: "https://linkedin.com/company/..." },
  { key: "twitter",   label: "Twitter / X URL", placeholder: "https://twitter.com/..." },
  { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { key: "facebook",  label: "Facebook URL",  placeholder: "https://facebook.com/..." },
  { key: "github",    label: "GitHub URL",    placeholder: "https://github.com/..." },
];

const EMPTY_SOCIAL = { linkedin: "", twitter: "", instagram: "", facebook: "", github: "" };

export default function Settings() {
  const { setting, loading, fetchSettings, updateSettings } = useSettingStore();
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile]     = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [form, setForm] = useState({
    companyName: "", number: "", email: "", address: "",
    metaTitle: "", metaDescription: "",
    socialLinks: { ...EMPTY_SOCIAL },
  });

  useEffect(() => { fetchSettings(); }, []);
  useEffect(() => {
    if (setting)
      setForm({
        companyName:     setting.companyName     || "",
        number:          setting.number          || "",
        email:           setting.email           || "",
        address:         setting.address         || "",
        metaTitle:       setting.metaTitle       || "",
        metaDescription: setting.metaDescription || "",
        socialLinks:     { ...EMPTY_SOCIAL, ...setting.socialLinks },
      });
  }, [setting]);

  const f  = (k)    => (e) => setForm({ ...form, [k]: e.target.value });
  const fs = (k)    => (e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [k]: e.target.value } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append("companyName",     form.companyName);
    fd.append("number",          form.number);
    fd.append("email",           form.email);
    fd.append("address",         form.address);
    fd.append("metaTitle",       form.metaTitle);
    fd.append("metaDescription", form.metaDescription);
    fd.append("socialLinks",     JSON.stringify(form.socialLinks));
    if (logoFile)    fd.append("logo",    logoFile);
    if (faviconFile) fd.append("favicon", faviconFile);
    await updateSettings(fd);
    setSaving(false);
  };

  if (loading && !setting)
    return <div className="flex justify-center py-20"><Spinner size={32} /></div>;

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage company information & branding" />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">

        {/* Branding */}
        <div className="card p-6 space-y-5">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
            <Building2 size={18} className="text-indigo-400" /> Branding
          </h3>
          <div className="grid grid-cols-2 gap-5">
            <ImageUpload label="Company Logo"  value={setting?.logo?.url}    onChange={setLogoFile} />
            <ImageUpload label="Favicon (ICO / PNG)" value={setting?.favicon?.url} onChange={setFaviconFile} />
          </div>
        </div>

        {/* Company Info */}
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
            <Building2 size={18} className="text-indigo-400" /> Company Info
          </h3>

          <div>
            <label className="label">Company Name</label>
            <div className="relative">
              <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input className="input pl-9" value={form.companyName} onChange={f("companyName")} placeholder="Acme Solutions Pvt. Ltd." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input className="input pl-9" value={form.number} onChange={f("number")} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" className="input pl-9" value={form.email} onChange={f("email")} placeholder="info@company.com" />
              </div>
            </div>
          </div>

          <div>
            <label className="label">Office Address</label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-3.5 text-slate-500" />
              <textarea rows={2} className="input pl-9 resize-none" value={form.address} onChange={f("address")} placeholder="123, Tech Park, Sector 62, Noida, UP - 201301" />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
            <Globe size={18} className="text-indigo-400" /> SEO / Meta
          </h3>
          <div>
            <label className="label">Meta Title</label>
            <input className="input" value={form.metaTitle} onChange={f("metaTitle")} placeholder="Acme Solutions — Software Development Company" />
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea rows={3} className="input resize-none" value={form.metaDescription} onChange={f("metaDescription")} placeholder="We build scalable web and mobile applications..." />
          </div>
        </div>

        {/* Social Links */}
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
            <Globe size={18} className="text-indigo-400" /> Social Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOCIALS.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="label">{label}</label>
                <input className="input" value={form.socialLinks[key]} onChange={fs(key)} placeholder={placeholder} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <Spinner size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
