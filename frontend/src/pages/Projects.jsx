// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ExternalLink, Github } from "lucide-react";
// import useDataStore from "../stores/useDataStore";

// export default function ProjectsPage() {
//   const { projects } = useDataStore();
//   const [filter, setFilter] = useState("all");
//   const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
//   const categories = [...new Set(projects.map(p => p.category))];

//   useEffect(() => { if (!projects.length) useDataStore.getState().fetchAll(); }, []);

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-5xl font-black mb-8">
//           Our Projects
//         </motion.h1>
//         <div className="flex gap-2 mb-12 flex-wrap">
//           <button onClick={() => setFilter("all")} className={`tag ${filter === "all" ? "tag-accent" : "tag-accent opacity-40"}`}>All</button>
//           {categories.map(c => (
//             <button key={c} onClick={() => setFilter(c)} className={`tag ${filter === c ? "tag-accent" : "tag-accent opacity-40"}`}>{c}</button>
//           ))}
//         </div>
//         <div className="grid md:grid-cols-2 gap-8">
//           {filtered.map((p, i) => (
//             <motion.div key={p._id} className="glass-card overflow-hidden group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//               {p.image?.url && (
//                 <div className="aspect-video overflow-hidden">
//                   <img src={p.image.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                 </div>
//               )}
//               <div className="p-6">
//                 <div className="flex gap-2 mb-3">{p.technologies?.map(t => <span key={t} className="tag-accent text-xs">{t}</span>)}</div>
//                 <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
//                 <p className="text-faint text-sm mb-4">{p.description}</p>
//                 <div className="flex gap-3">
//                   {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs"><ExternalLink size={14} /> Live</a>}
//                   {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs"><Github size={14} /> Code</a>}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";

// import {
//   ExternalLink,
//   Github,
//   ArrowRight,
//   Layers3,
//   Sparkles,
//   Globe,
//   Database,
//   ShieldCheck,
//   Code2,
//   Star,
// } from "lucide-react";

// import { Link } from "react-router-dom";
// import useDataStore from "../stores/useDataStore";

// export default function ProjectsPage() {
//   const { projects } = useDataStore();

//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     if (!projects.length) {
//       useDataStore.getState().fetchAll();
//     }
//   }, []);

//   const filteredProjects =
//     filter === "all"
//       ? projects
//       : projects.filter((p) => p.category === filter);

//   const categories = useMemo(() => {
//     return [...new Set(projects.map((p) => p.category))];
//   }, [projects]);

//   const services = [
//     {
//       icon: Globe,
//       title: "Modern Web Apps",
//       desc: "Scalable and responsive web applications with premium UI.",
//     },
//     {
//       icon: Database,
//       title: "Backend Systems",
//       desc: "Secure backend architecture with APIs and database management.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Enterprise Security",
//       desc: "JWT auth, role-based access and production-ready protection.",
//     },
//     {
//       icon: Sparkles,
//       title: "Premium UI/UX",
//       desc: "Smooth animations, glassmorphism and modern experiences.",
//     },
//   ];

//   const stats = [
//     {
//       number: "50+",
//       label: "Projects Completed",
//     },
//     {
//       number: "15+",
//       label: "Industries Served",
//     },
//     {
//       number: "99%",
//       label: "Client Satisfaction",
//     },
//     {
//       number: "24/7",
//       label: "Support",
//     },
//   ];

//   const technologies = [
//     {
//       name: "React.js",
//       url: "https://react.dev",
//     },
//     {
//       name: "Next.js",
//       url: "https://nextjs.org/docs",
//     },
//     {
//       name: "Node.js",
//       url: "https://nodejs.org/en/docs",
//     },
//     {
//       name: "Express.js",
//       url: "https://expressjs.com",
//     },
//     {
//       name: "MongoDB",
//       url: "https://www.mongodb.com/docs",
//     },
//     {
//       name: "Tailwind CSS",
//       url: "https://tailwindcss.com/docs",
//     },
//     {
//       name: "Redux",
//       url: "https://redux.js.org",
//     },
//     {
//       name: "JWT Auth",
//       url: "https://jwt.io/introduction",
//     },
//     {
//       name: "Socket.IO",
//       url: "https://socket.io/docs/v4",
//     },
//     {
//       name: "Cloudinary",
//       url: "https://cloudinary.com/documentation",
//     },
//     {
//       name: "Framer Motion",
//       url: "https://www.framer.com/motion",
//     },
//     {
//       name: "REST APIs",
//       url: "https://restfulapi.net",
//     },
//   ];

//   return (
//     <div className=" pb-24 overflow-hidden">
//       <div className="section space-y-28">
//         {/* HERO */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="max-w-5xl mx-auto text-center relative"
//         >
//           <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full" />

//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-sm text-gray-300 mb-6">
//               <Layers3 size={16} />
//               Portfolio Showcase
//             </div>

//             <h1 className="font-display text-5xl md:text-7xl font-black leading-tight mb-6">
//               Premium Digital
//               <br />
//               Product Experiences
//             </h1>

//             <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
//               Explore our modern software products, SaaS platforms,
//               dashboards, enterprise systems and scalable web applications.
//             </p>
//           </div>
//         </motion.div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />

//               <div className="relative z-10">
//                 <h2 className="text-4xl font-black mb-2">
//                   {item.number}
//                 </h2>

//                 <p className="text-gray-400 text-sm">
//                   {item.label}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* SERVICES */}
//         <div>
//           <div className="flex items-center gap-3 mb-12">
//             <div className="h-8 w-1 bg-white rounded-full" />

//             <h2 className="text-4xl font-black">
//               What We Build
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-2 gap-7">
//             {services.map((item, i) => {
//               const Icon = item.icon;

//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.08 }}
//                   className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-white/20 transition-all duration-500"
//                 >
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/10 to-transparent" />

//                   <div className="relative z-10">
//                     <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-6">
//                       <Icon size={30} />
//                     </div>

//                     <h3 className="text-2xl font-bold mb-4">
//                       {item.title}
//                     </h3>

//                     <p className="text-gray-400 leading-relaxed">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>

//         {/* TECHNOLOGIES */}
//         <div>
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full" />

//             <h2 className="text-4xl font-black">
//               Technologies We Use
//             </h2>
//           </div>

//           <div className="flex flex-wrap gap-4">
//             {technologies.map((tech, i) => (
//               <motion.a
//                 key={tech.name}
//                 href={tech.url}
//                 target="_blank"
//                 rel="noreferrer"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.03 }}
//                 className="group relative overflow-hidden px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white hover:text-black transition duration-300"
//               >
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/10 to-transparent" />

//                 <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
//                   {tech.name}
//                   <ExternalLink size={14} />
//                 </span>
//               </motion.a>
//             ))}
//           </div>
//         </div>

//         {/* FILTERS */}
//         <div>
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
//             <div>
//               <h2 className="text-5xl font-black mb-3">
//                 Featured Projects
//               </h2>

//               <p className="text-gray-400 text-lg">
//                 Explore our latest premium development work.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <button
//                 onClick={() => setFilter("all")}
//                 className={`px-5 py-2.5 rounded-full border transition-all duration-300 ${filter === "all"
//                     ? "bg-white text-black border-white"
//                     : "bg-white/5 border-white/10 text-white hover:bg-white/10"
//                   }`}
//               >
//                 All
//               </button>

//               {categories.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => setFilter(c)}
//                   className={`px-5 py-2.5 rounded-full border transition-all duration-300 ${filter === c
//                       ? "bg-white text-black border-white"
//                       : "bg-white/5 border-white/10 text-white hover:bg-white/10"
//                     }`}
//                 >
//                   {c}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* PROJECTS GRID */}
//           <div className="grid lg:grid-cols-2 gap-8">
//             {filteredProjects.map((p, i) => (
//               <motion.div
//                 key={p._id}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.08 }}
//                 className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-[#0f0f0f] backdrop-blur-2xl"
//               >
//                 {/* GLOW */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

//                 {/* IMAGE */}
//                 {p.image?.url && (
//                   <div className="relative aspect-video overflow-hidden">
//                     <img
//                       src={p.image.url}
//                       alt={p.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//                     <div className="absolute top-5 left-5">
//                       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs font-semibold">
//                         <Star size={14} />
//                         Featured Project
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* CONTENT */}
//                 <div className="relative z-10 p-8">
//                   {/* CATEGORY */}
//                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold mb-5">
//                     <Code2 size={14} />
//                     {p.category}
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="text-3xl font-black mb-4 group-hover:translate-x-1 transition duration-300">
//                     {p.title}
//                   </h3>

//                   {/* DESCRIPTION */}
//                   <p className="text-gray-400 leading-relaxed mb-6">
//                     {p.description}
//                   </p>

//                   {/* TECH STACK */}
//                   {p.technologies?.length > 0 && (
//                     <div className="flex flex-wrap gap-3 mb-8">
//                       {p.technologies.map((tech) => (
//                         <span
//                           key={tech}
//                           className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </div>
//                   )}

//                   {/* BUTTONS */}
//                   <div className="flex flex-wrap gap-4">
//                     {p.liveUrl && (
//                       <a
//                         href={p.liveUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
//                       >
//                         <ExternalLink size={16} />
//                         Live Preview
//                       </a>
//                     )}

//                     {p.githubUrl && (
//                       <a
//                         href={p.githubUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition duration-300"
//                       >
//                         <Github size={16} />
//                         Source Code
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* EMPTY */}
//           {filteredProjects.length === 0 && (
//             <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-14 text-center">
//               <h3 className="text-3xl font-black mb-4">
//                 No Projects Found
//               </h3>

//               <p className="text-gray-400 text-lg">
//                 Projects for this category will appear here soon.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-14 md:p-20 text-center"
//         >
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />

//           <div className="relative z-10">
//             <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
//               Let’s Build Something
//               <br />
//               Extraordinary
//             </h2>

//             <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
//               From startup MVPs to enterprise-grade platforms,
//               we help businesses create scalable and premium
//               digital experiences.
//             </p>

//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition duration-300"
//             >
//               Start Your Project
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ExternalLink,
  Github,
  ArrowRight,
  Layers3,
  Sparkles,
  Globe,
  Database,
  ShieldCheck,
  Code2,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";
import useDataStore from "../stores/useDataStore";

export default function ProjectsPage() {
  const { projects } = useDataStore();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!projects.length) {
      useDataStore.getState().fetchAll();
    }
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const categories = useMemo(() => {
    return [...new Set(projects.map((p) => p.category))];
  }, [projects]);

  const services = [
    {
      icon: Globe,
      title: "Modern Web Apps",
      desc: "Scalable and responsive web applications with premium UI.",
    },
    {
      icon: Database,
      title: "Backend Systems",
      desc: "Secure backend architecture with APIs and database management.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      desc: "JWT auth, role-based access and production-ready protection.",
    },
    {
      icon: Sparkles,
      title: "Premium UI/UX",
      desc: "Smooth animations, glassmorphism and modern experiences.",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "15+", label: "Industries Served" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support" },
  ];

  const technologies = [
    { name: "React.js", url: "https://react.dev" },
    { name: "Next.js", url: "https://nextjs.org/docs" },
    { name: "Node.js", url: "https://nodejs.org/en/docs" },
    { name: "Express.js", url: "https://expressjs.com" },
    { name: "MongoDB", url: "https://www.mongodb.com/docs" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com/docs" },
    { name: "Redux", url: "https://redux.js.org" },
    { name: "JWT Auth", url: "https://jwt.io/introduction" },
    { name: "Socket.IO", url: "https://socket.io/docs/v4" },
    { name: "Cloudinary", url: "https://cloudinary.com/documentation" },
    { name: "Framer Motion", url: "https://www.framer.com/motion" },
    { name: "REST APIs", url: "https://restfulapi.net" },
  ];

  return (
    <div className="pb-16 sm:pb-24 overflow-hidden">
      <div className="section space-y-16 sm:space-y-24 px-4 sm:px-6 md:px-10">

        {/* ─────────────────────── HERO ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center relative pt-10 sm:pt-0"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-white/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs sm:text-sm text-gray-300 mb-5 sm:mb-6">
              <Layers3 size={15} />
              Portfolio Showcase
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-5 sm:mb-6">
              Premium Digital
              <br />
              Product Experiences
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto px-2">
              Explore our modern software products, SaaS platforms, dashboards,
              enterprise systems and scalable web applications.
            </p>
          </div>
        </motion.div>

        {/* ─────────────────────── STATS ─────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-8"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2">{item.number}</h2>
                <p className="text-gray-400 text-xs sm:text-sm">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─────────────────────── SERVICES ─────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-black">What We Build</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 transition-all duration-500"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-5 sm:mb-6">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────── TECHNOLOGIES ─────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-4xl font-black">Technologies We Use</h2>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            {technologies.map((tech, i) => (
              <motion.a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="group relative overflow-hidden px-4 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white hover:text-black transition duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
                  {tech.name}
                  <ExternalLink size={12} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ─────────────────────── FILTERS + PROJECTS ─────────────────────── */}
        <div>
          {/* Header + Filter Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6 mb-10 sm:mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-3">Featured Projects</h2>
              <p className="text-gray-400 text-base sm:text-lg">
                Explore our latest premium development work.
              </p>
            </div>

            {/* Filter Buttons — horizontal scroll on mobile */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-hide">
              <button
                onClick={() => setFilter("all")}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border text-sm transition-all duration-300 ${
                  filter === "all"
                    ? "bg-white text-black border-white"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border text-sm transition-all duration-300 ${
                    filter === c
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 bg-[#0f0f0f] backdrop-blur-2xl"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                {/* Image */}
                {p.image?.url && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={p.image.url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
                      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs font-semibold">
                        <Star size={12} />
                        Featured Project
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-8">
                  {/* Category */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold mb-4 sm:mb-5">
                    <Code2 size={13} />
                    {p.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 group-hover:translate-x-1 transition duration-300">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
                    {p.description}
                  </p>

                  {/* Tech Stack */}
                  {p.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                      {p.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm hover:bg-white/10 transition"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-black text-sm font-semibold hover:scale-105 transition duration-300"
                      >
                        <ExternalLink size={15} />
                        Live Preview
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 text-sm hover:bg-white/10 transition duration-300"
                      >
                        <Github size={15} />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="mt-8 sm:mt-10 rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-10 sm:p-14 text-center">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">No Projects Found</h3>
              <p className="text-gray-400 text-base sm:text-lg">
                Projects for this category will appear here soon.
              </p>
            </div>
          )}
        </div>

        {/* ─────────────────────── CTA ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 sm:p-14 md:p-20 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-white/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 sm:mb-6">
              Let's Build Something
              <br />
              Extraordinary
            </h2>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
              From startup MVPs to enterprise-grade platforms, we help businesses create
              scalable and premium digital experiences.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black text-sm sm:text-base font-semibold hover:scale-105 transition duration-300"
            >
              Start Your Project
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}