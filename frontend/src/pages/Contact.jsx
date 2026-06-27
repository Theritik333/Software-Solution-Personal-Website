// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";
// import api from "../lib/axios";
// import toast from "react-hot-toast";
// import useSettingStore from "../stores/useSettingStore";

// export default function Contact() {
//   const { setting } = useSettingStore();
//   const [form, setForm] = useState({ name: "", email: "", businessName: "", phoneNumber: "", serviceNeeded: "", message: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await api.post("/contact", form);
//       toast.success("Message sent! We'll get back to you soon.");
//       setForm({ name: "", email: "", businessName: "", phoneNumber: "", serviceNeeded: "", message: "" });
//     } catch {
//       toast.error("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-5xl font-black mb-12">
//           Get in Touch
//         </motion.h1>

//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Contact info */}
//           <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
//             <p className="text-faint mb-8 leading-relaxed">Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
//             <div className="space-y-6">
//               {setting?.email && (
//                 <div className="flex gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-accent" /></div>
//                   <div>
//                     <p className="text-sm text-faint mb-1">Email</p>
//                     <a href={`mailto:${setting.email}`} className="text-white hover:text-glow transition-colors">{setting.email}</a>
//                   </div>
//                 </div>
//               )}
//               {setting?.number && (
//                 <div className="flex gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-teal" /></div>
//                   <div>
//                     <p className="text-sm text-faint mb-1">Phone</p>
//                     <a href={`tel:${setting.number}`} className="text-white hover:text-glow transition-colors">{setting.number}</a>
//                   </div>
//                 </div>
//               )}
//               {setting?.address && (
//                 <div className="flex gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-rose/10 border border-rose/20 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-rose" /></div>
//                   <div>
//                     <p className="text-sm text-faint mb-1">Address</p>
//                     <p className="text-white">{setting.address}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>

//           {/* Form */}
//           <motion.form onSubmit={handleSubmit} className="glass-card p-8" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
//             <div className="mb-5">
//               <label className="field-label">Name *</label>
//               <input required className="field" value={form.name} onChange={f("name")} placeholder="Your name" />
//             </div>
//             <div className="mb-5">
//               <label className="field-label">Email *</label>
//               <input required type="email" className="field" value={form.email} onChange={f("email")} placeholder="your@email.com" />
//             </div>
//             <div className="grid grid-cols-2 gap-4 mb-5">
//               <div>
//                 <label className="field-label">Business Name</label>
//                 <input className="field" value={form.businessName} onChange={f("businessName")} placeholder="Your company" />
//               </div>
//               <div>
//                 <label className="field-label">Phone</label>
//                 <input className="field" value={form.phoneNumber} onChange={f("phoneNumber")} placeholder="+91..." />
//               </div>
//             </div>
//             <div className="mb-5">
//               <label className="field-label">Service Needed</label>
//               <select className="field" value={form.serviceNeeded} onChange={f("serviceNeeded")}>
//                 <option value="">Select a service</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Mobile App">Mobile App</option>
//                 <option value="Consulting">Consulting</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <div className="mb-6">
//               <label className="field-label">Message *</label>
//               <textarea required rows={5} className="field resize-none" value={form.message} onChange={f("message")} placeholder="Tell us about your project..." />
//             </div>
//             <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//           </motion.form>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Building2,
} from "lucide-react";

import api from "../lib/axios";
import toast from "react-hot-toast";

import useSettingStore from "../stores/useSettingStore";

export default function Contact() {
  const { setting } =
    useSettingStore();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      businessName: "",
      phoneNumber: "",
      serviceNeeded: "",
      message: "",
    });

  // INPUT CHANGE
  const handleChange =
    (key) => (e) => {
      setForm({
        ...form,
        [key]: e.target.value,
      });
    };

  // SUBMIT
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/contact",
        form
      );

      toast.success(
        "Message sent successfully!"
      );

      setForm({
        name: "",
        email: "",
        businessName: "",
        phoneNumber: "",
        serviceNeeded: "",
        message: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" md:pt-12 pb-20 overflow-hidden">
      <div className="section">
        {/* HERO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-4xl mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
            <Sparkles size={14} />

            <span className="text-sm text-gray-300">
              Let’s Work Together
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-black mb-3 leading-tight">
            Get In
            <span className="text-glow">
              {" "}
              Touch
            </span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            Have a project idea,
            startup, or business
            requirement? Send us a
            message and we’ll get back
            to you quickly.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-6">
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            className="space-y-4"
          >
            {/* EMAIL */}
            {setting?.email && (
              <div className="glass-card rounded-[26px] p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail
                    size={22}
                    className="text-cyan-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Email Address
                  </p>

                  <a
                    href={`mailto:${setting.email}`}
                    className="text-lg font-semibold hover:text-glow transition-colors break-all"
                  >
                    {setting.email}
                  </a>
                </div>
              </div>
            )}

            {/* PHONE */}
            {setting?.number && (
              <div className="glass-card rounded-[26px] p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone
                    size={22}
                    className="text-violet-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Phone Number
                  </p>

                  <a
                    href={`tel:${setting.number}`}
                    className="text-lg font-semibold hover:text-glow transition-colors"
                  >
                    {setting.number}
                  </a>
                </div>
              </div>
            )}

            {/* ADDRESS */}
            {setting?.address && (
              <div className="glass-card rounded-[26px] p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin
                    size={22}
                    className="text-rose-300"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Office Address
                  </p>

                  <p className="text-lg font-semibold leading-relaxed">
                    {setting.address}
                  </p>
                </div>
              </div>
            )}

            {/* EXTRA CARD */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[70px] rounded-full" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Building2 size={24} />
                </div>

                <h3 className="font-display text-2xl font-black mb-3">
                  Let’s Build
                  Something Amazing
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  We create scalable
                  websites, SaaS
                  platforms, mobile
                  apps, and custom
                  software solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            className="glass-card rounded-[30px] p-6 md:p-7"
          >
            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="field-label">
                  Full Name *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={handleChange(
                    "name"
                  )}
                  placeholder="John Doe"
                  className="field h-13"
                />
              </div>

              <div>
                <label className="field-label">
                  Email Address *
                </label>

                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange(
                    "email"
                  )}
                  placeholder="john@example.com"
                  className="field h-13"
                />
              </div>
            </div>

            {/* BUSINESS + PHONE */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="field-label">
                  Business Name
                </label>

                <input
                  value={
                    form.businessName
                  }
                  onChange={handleChange(
                    "businessName"
                  )}
                  placeholder="Your Company"
                  className="field h-13"
                />
              </div>

              <div>
                <label className="field-label">
                  Phone Number
                </label>

                <input
                  value={
                    form.phoneNumber
                  }
                  onChange={handleChange(
                    "phoneNumber"
                  )}
                  placeholder="+91 9876543210"
                  className="field h-13"
                />
              </div>
            </div>

            {/* SERVICE */}
            <div className="mb-4">
              <label className="field-label">
                Service Needed
              </label>

              <select
                value={
                  form.serviceNeeded
                }
                onChange={handleChange(
                  "serviceNeeded"
                )}
                className="field h-13"
              >
                <option value="">
                  Select a Service
                </option>

                <option value="Web Development">
                  Web Development
                </option>

                <option value="Mobile App Development">
                  Mobile App
                  Development
                </option>

                <option value="UI/UX Design">
                  UI/UX Design
                </option>

                <option value="SaaS Development">
                  SaaS Development
                </option>

                <option value="Consulting">
                  Consulting
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="mb-5">
              <label className="field-label">
                Project Details *
              </label>

              <textarea
                required
                rows={5}
                value={form.message}
                onChange={handleChange(
                  "message"
                )}
                placeholder="Tell us about your project..."
                className="field resize-none py-4"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-4 rounded-2xl text-base inline-flex items-center gap-2"
            >
              <Send size={18} />

              {loading
                ? "Sending..."
                : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}