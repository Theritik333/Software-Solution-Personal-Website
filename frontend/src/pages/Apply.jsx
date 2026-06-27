// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";
// import api from "../lib/axios";
// import toast from "react-hot-toast";

// export default function Apply() {
//   const [params] = useSearchParams();
//   const careerRole = params.get("role");
//   const careerId = params.get("id");
//   const [form, setForm] = useState({ name: "", email: "", number: "", message: "", applyingFor: careerRole || "" });
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onDrop = (files) => {
//     if (files[0]) setResume(files[0]);
//   };
//   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"] } });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!resume) { toast.error("Resume is required"); return; }
//     setLoading(true);
//     try {
//       const fd = new FormData();
//       Object.entries(form).forEach(([k, v]) => fd.append(k, v));
//       fd.append("resume", resume);
//       if (careerId) fd.append("careerId", careerId);
//       await api.post("/apply", fd, { headers: { "Content-Type": "multipart/form-data" } });
//       toast.success("Application submitted! Good luck!");
//       setForm({ name: "", email: "", number: "", message: "", applyingFor: careerRole || "" });
//       setResume(null);
//     } catch {
//       toast.error("Failed to submit application. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   return (
//     <div className="pt-20 pb-20 min-h-screen">
//       <div className="max-w-2xl mx-auto px-5">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
//           <h1 className="font-display text-4xl font-black mb-2">Apply Now</h1>
//           {careerRole && <p className="text-faint">Position: <span className="text-glow font-semibold">{careerRole}</span></p>}
//         </motion.div>

//         <motion.form onSubmit={handleSubmit} className="glass-card p-10 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
//           <div className="grid sm:grid-cols-2 gap-6">
//             <div>
//               <label className="field-label">Full Name *</label>
//               <input required className="field" value={form.name} onChange={f("name")} placeholder="John Doe" />
//             </div>
//             <div>
//               <label className="field-label">Email *</label>
//               <input required type="email" className="field" value={form.email} onChange={f("email")} placeholder="john@example.com" />
//             </div>
//           </div>

//           <div>
//             <label className="field-label">Phone Number *</label>
//             <input required className="field" value={form.number} onChange={f("number")} placeholder="+91..." />
//           </div>

//           {!careerRole && (
//             <div>
//               <label className="field-label">Position Applying For</label>
//               <input className="field" value={form.applyingFor} onChange={f("applyingFor")} placeholder="Frontend Developer" />
//             </div>
//           )}

//           <div>
//             <label className="field-label">Message</label>
//             <textarea rows={4} className="field resize-none" value={form.message} onChange={f("message")} placeholder="Tell us why you're interested..." />
//           </div>

//           <div>
//             <label className="field-label">Upload Resume (PDF/DOC) *</label>
//             <div {...getRootProps()} className="border-2 border-dashed border-rim rounded-xl p-8 text-center cursor-pointer hover:border-accent transition-colors">
//               <input {...getInputProps()} />
//               <Upload size={32} className="mx-auto text-accent mb-3" />
//               <p className="text-white font-semibold mb-1">Drag & drop your resume here</p>
//               <p className="text-faint text-sm">or click to browse (Max 10MB)</p>
//               {resume && <p className="text-glow text-sm mt-2">✓ {resume.name}</p>}
//             </div>
//           </div>

//           <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
//             {loading ? "Submitting..." : "Submit Application"}
//           </button>
//         </motion.form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";

import { useDropzone } from "react-dropzone";

import {
  Upload,
  Briefcase,
  FileText,
} from "lucide-react";

import api from "../lib/axios";

import toast from "react-hot-toast";

export default function Apply() {
  const [params] = useSearchParams();

  const careerRole =
    params.get("role");

  const careerId =
    params.get("id");

  const [loading, setLoading] =
    useState(false);

  const [resume, setResume] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    message: "",

    applyingFor:
      careerRole || "",
  });

  // ─────────────────────────────────────
  // Resume Upload
  // ─────────────────────────────────────
  const onDrop = (files) => {
    if (files[0]) {
      setResume(files[0]);
    }
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,

    multiple: false,

    accept: {
      "application/pdf": [".pdf"],

      "application/msword": [
        ".doc",
        ".docx",
      ],
    },
  });

  // ─────────────────────────────────────
  // Input Handler
  // ─────────────────────────────────────
  const handleChange =
    (key) => (e) => {
      setForm({
        ...form,
        [key]: e.target.value,
      });
    };

  // ─────────────────────────────────────
  // Submit
  // ─────────────────────────────────────
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!resume) {
      return toast.error(
        "Resume is required"
      );
    }

    try {
      setLoading(true);

      const fd = new FormData();

      Object.entries(form).forEach(
        ([k, v]) => {
          fd.append(k, v);
        }
      );

      fd.append("resume", resume);

      if (careerId) {
        fd.append(
          "careerId",
          careerId
        );
      }

      await api.post(
        "/apply",
        fd,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Application submitted successfully!"
      );

      setForm({
        name: "",
        email: "",
        number: "",
        message: "",

        applyingFor:
          careerRole || "",
      });

      setResume(null);
    } catch (err) {
      toast.error(
        err?.response?.data
          ?.message ||
          "Failed to submit application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-5">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-5 text-sm text-gray-300">
            <Briefcase size={15} />
            Career Application
          </div>

          <h1 className="font-display text-5xl font-black mb-3">
            Apply Now
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Join our team and help us
            build scalable digital
            experiences.
          </p>

          {careerRole && (
            <div className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
              <FileText size={16} />

              <span className="text-sm text-gray-300">
                Applying for:
              </span>

              <span className="font-semibold">
                {careerRole}
              </span>
            </div>
          )}
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="glass-card p-8 md:p-10 space-y-7 rounded-[32px]"
        >
          {/* NAME + EMAIL */}
          <div className="grid sm:grid-cols-2 gap-6">
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
                className="field h-14"
              />
            </div>

            <div>
              <label className="field-label">
                Email *
              </label>

              <input
                required
                type="email"
                value={form.email}
                onChange={handleChange(
                  "email"
                )}
                placeholder="john@example.com"
                className="field h-14"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="field-label">
              Phone Number *
            </label>

            <input
              required
              value={form.number}
              onChange={handleChange(
                "number"
              )}
              placeholder="+91 9876543210"
              className="field h-14"
            />
          </div>

          {/* APPLYING FOR */}
          {!careerRole && (
            <div>
              <label className="field-label">
                Position Applying For
              </label>

              <input
                value={form.applyingFor}
                onChange={handleChange(
                  "applyingFor"
                )}
                placeholder="Frontend Developer"
                className="field h-14"
              />
            </div>
          )}

          {/* MESSAGE */}
          <div>
            <label className="field-label">
              Message
            </label>

            <textarea
              rows={5}
              value={form.message}
              onChange={handleChange(
                "message"
              )}
              placeholder="Tell us why you're interested..."
              className="field resize-none py-4"
            />
          </div>

          {/* RESUME */}
          <div>
            <label className="field-label">
              Upload Resume *
            </label>

            <div
              {...getRootProps()}
              className="group border-2 border-dashed border-white/10 rounded-[28px] p-10 text-center cursor-pointer hover:border-white/30 transition-all duration-300 bg-white/[0.02]"
            >
              <input
                {...getInputProps()}
              />

              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <Upload size={30} />
              </div>

              <p className="text-white font-semibold mb-2 text-lg">
                Drag & drop your resume
              </p>

              <p className="text-gray-400 text-sm">
                PDF, DOC, DOCX supported
              </p>

              {resume && (
                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm">
                  ✓ {resume.name}
                </div>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base rounded-2xl"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}