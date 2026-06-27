// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ExternalLink } from "lucide-react";
// import useDataStore from "../stores/useDataStore";

// const CATEGORIES = ["frontend", "backend", "database", "devops", "mobile", "other"];
// const CAT_COLOR = { frontend: "tag-accent", backend: "tag-teal", database: "tag-rose", devops: "tag-amber", mobile: "tag-emerald", other: "tag-accent" };

// export default function TechnologiesPage() {
//   const { technologies } = useDataStore();
//   const [filter, setFilter] = useState("all");
//   const filtered = filter === "all" ? technologies : technologies.filter(t => t.category === filter);
//   useEffect(() => { if (!technologies.length) useDataStore.getState().fetchAll(); }, []);

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-5xl font-black mb-12">
//           Tech Stack
//         </motion.h1>
//         <div className="flex gap-2 mb-12 flex-wrap">
//           <button onClick={() => setFilter("all")} className={`tag ${filter === "all" ? "tag-accent" : "tag-accent opacity-40"}`}>All</button>
//           {CATEGORIES.map(c => <button key={c} onClick={() => setFilter(c)} className={`tag ${filter === c ? CAT_COLOR[c] : CAT_COLOR[c] + " opacity-40"}`}>{c}</button>)}
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filtered.map((t, i) => (
//             <motion.div key={t._id} className="glass-card p-6 flex flex-col items-center text-center hover-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
//               {t.icon?.url && <img src={t.icon.url} alt={t.title} className="w-12 h-12 mb-3" />}
//               <p className="font-semibold text-sm mb-2">{t.title}</p>
//               <span className={`tag ${CAT_COLOR[t.category]} text-xs`}>{t.category}</span>
//               {t.docsLink && <a href={t.docsLink} target="_blank" rel="noreferrer" className="mt-3 text-accent hover:text-glow transition-colors"><ExternalLink size={14} /></a>}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// import { motion } from "framer-motion";

// import {
//   ExternalLink,
//   Globe,
//   Server,
//   Database,
//   Smartphone,
//   Cloud,
//   Code2,
//   Sparkles,
// } from "lucide-react";

// import { Link } from "react-router-dom";

// import useDataStore from "../stores/useDataStore";

// const CATEGORIES = [
//   "frontend",
//   "backend",
//   "database",
//   "devops",
//   "mobile",
//   "other",
// ];

// const CATEGORY_ICONS = {
//   frontend: Globe,
//   backend: Server,
//   database: Database,
//   devops: Cloud,
//   mobile: Smartphone,
//   other: Code2,
// };

// const CATEGORY_STYLES = {
//   frontend:
//     "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",

//   backend:
//     "bg-violet-500/10 text-violet-300 border-violet-500/20",

//   database:
//     "bg-rose-500/10 text-rose-300 border-rose-500/20",

//   devops:
//     "bg-amber-500/10 text-amber-300 border-amber-500/20",

//   mobile:
//     "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

//   other:
//     "bg-white/10 text-gray-300 border-white/10",
// };

// export default function TechnologiesPage() {
//   const { technologies } =
//     useDataStore();

//   const [filter, setFilter] =
//     useState("all");

//   useEffect(() => {
//     if (!technologies.length) {
//       useDataStore
//         .getState()
//         .fetchAll();
//     }
//   }, []);

//   const filtered =
//     filter === "all"
//       ? technologies
//       : technologies.filter(
//           (t) =>
//             t.category ===
//             filter
//         );

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         {/* HERO */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-5">
//             <Sparkles size={14} />

//             <span className="text-sm text-gray-300">
//               Modern Tech Stack
//             </span>
//           </div>

//           <h1 className="font-display text-5xl md:text-6xl font-black mb-4">
//             Technologies
//             <span className="text-glow">
//               {" "}
//               We Use
//             </span>
//           </h1>

//           <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
//             Modern technologies and
//             tools used to build fast,
//             scalable, and secure
//             digital products.
//           </p>
//         </motion.div>

//         {/* FILTERS */}
//         <div className="flex flex-wrap gap-3 mb-12">
//           <button
//             onClick={() =>
//               setFilter("all")
//             }
//             className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
//               filter === "all"
//                 ? "bg-white text-black"
//                 : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
//             }`}
//           >
//             All
//           </button>

//           {CATEGORIES.map((c) => {
//             const Icon =
//               CATEGORY_ICONS[c];

//             return (
//               <button
//                 key={c}
//                 onClick={() =>
//                   setFilter(c)
//                 }
//                 className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 capitalize ${
//                   filter === c
//                     ? "bg-white text-black"
//                     : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
//                 }`}
//               >
//                 <Icon size={14} />

//                 {c}
//               </button>
//             );
//           })}
//         </div>

//         {/* GRID */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {filtered.map((t, i) => {
//             const Icon =
//               CATEGORY_ICONS[
//                 t.category
//               ] || Code2;

//             return (
//               <motion.div
//                 key={t._id}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   delay: i * 0.05,
//                 }}
//                 className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* GLOW */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
//                   <div className="absolute top-0 right-0 w-28 h-28 bg-accent/10 blur-[60px] rounded-full" />
//                 </div>

//                 <div className="relative z-10">
//                   {/* TOP */}
//                   <div className="flex items-start justify-between mb-5">
//                     <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
//                       {t.icon?.url ? (
//                         <img
//                           src={
//                             t.icon
//                               .url
//                           }
//                           alt={
//                             t.title
//                           }
//                           className="w-8 h-8 object-contain"
//                         />
//                       ) : (
//                         <Icon
//                           size={
//                             24
//                           }
//                         />
//                       )}
//                     </div>

//                     {t.docsLink && (
//                       <a
//                         href={
//                           t.docsLink
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
//                       >
//                         <ExternalLink
//                           size={
//                             14
//                           }
//                         />
//                       </a>
//                     )}
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="font-display text-xl font-bold mb-3">
//                     {t.title}
//                   </h3>

//                   {/* CATEGORY */}
//                   <div
//                     className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold capitalize mb-4 ${CATEGORY_STYLES[t.category]}`}
//                   >
//                     <Icon size={12} />

//                     {t.category}
//                   </div>

//                   {/* DESCRIPTION */}
//                   <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
//                     {t.description ||
//                       `${t.title} technology used for scalable and high-performance application development.`}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="mt-16 glass-card rounded-[32px] p-10 text-center"
//         >
//           <h2 className="font-display text-3xl md:text-5xl font-black mb-4">
//             Build Modern
//             <span className="text-glow">
//               {" "}
//               Applications
//             </span>
//           </h2>

//           <p className="text-gray-400 max-w-2xl mx-auto mb-8">
//             We combine modern
//             technologies with scalable
//             architecture to create
//             high-quality digital
//             products.
//           </p>

//           <Link
//             to="/contact"
//             className="btn-primary px-7 py-3 rounded-2xl inline-flex items-center justify-center"
//           >
//             Start Your Project
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// import { motion } from "framer-motion";

// import {
//   ExternalLink,
//   Globe,
//   Server,
//   Database,
//   Smartphone,
//   Cloud,
//   Code2,
//   Sparkles,
// } from "lucide-react";

// import { Link } from "react-router-dom";

// import useDataStore from "../stores/useDataStore";

// const CATEGORIES = [
//   "frontend",
//   "backend",
//   "database",
//   "devops",
//   "mobile",
//   "other",
// ];

// const CATEGORY_ICONS = {
//   frontend: Globe,
//   backend: Server,
//   database: Database,
//   devops: Cloud,
//   mobile: Smartphone,
//   other: Code2,
// };

// const CATEGORY_STYLES = {
//   frontend:
//     "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",

//   backend:
//     "bg-violet-500/10 text-violet-300 border-violet-500/20",

//   database:
//     "bg-rose-500/10 text-rose-300 border-rose-500/20",

//   devops:
//     "bg-amber-500/10 text-amber-300 border-amber-500/20",

//   mobile:
//     "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

//   other:
//     "bg-white/10 text-gray-300 border-white/10",
// };

// export default function TechnologiesPage() {
//   const { technologies } =
//     useDataStore();

//   const [filter, setFilter] =
//     useState("all");

//   useEffect(() => {
//     if (!technologies.length) {
//       useDataStore
//         .getState()
//         .fetchAll();
//     }
//   }, []);

//   const filtered =
//     filter === "all"
//       ? technologies
//       : technologies.filter(
//           (t) =>
//             t.category ===
//             filter
//         );

//   return (
//     <div className="pb-20 overflow-hidden">
//       <div className="section">
//         {/* HERO */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="mb-8 md:mb-12"
//         >
//           {/* BADGE */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
//             <Sparkles size={14} />

//             <span className="text-xs sm:text-sm text-gray-300">
//               Modern Tech Stack
//             </span>
//           </div>

//           {/* HEADING */}
//           <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight">
//             Technologies
//             <span className="text-glow">
//               {" "}
//               We Use
//             </span>
//           </h1>

//           {/* TEXT */}
//           <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
//             Modern technologies and
//             tools used to build fast,
//             scalable, and secure
//             digital products.
//           </p>
//         </motion.div>

//         {/* FILTERS */}
//         <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 md:mb-12">
//           <button
//             onClick={() =>
//               setFilter("all")
//             }
//             className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
//               filter === "all"
//                 ? "bg-white text-black"
//                 : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
//             }`}
//           >
//             All
//           </button>

//           {CATEGORIES.map((c) => {
//             const Icon =
//               CATEGORY_ICONS[c];

//             return (
//               <button
//                 key={c}
//                 onClick={() =>
//                   setFilter(c)
//                 }
//                 className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 capitalize ${
//                   filter === c
//                     ? "bg-white text-black"
//                     : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
//                 }`}
//               >
//                 <Icon size={13} />

//                 {c}
//               </button>
//             );
//           })}
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
//           {filtered.map((t, i) => {
//             const Icon =
//               CATEGORY_ICONS[
//                 t.category
//               ] || Code2;

//             return (
//               <motion.div
//                 key={t._id}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   delay: i * 0.05,
//                 }}
//                 className="group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-6 hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* GLOW */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
//                   <div className="absolute top-0 right-0 w-24 sm:w-28 h-24 sm:h-28 bg-accent/10 blur-[60px] rounded-full" />
//                 </div>

//                 <div className="relative z-10">
//                   {/* TOP */}
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
//                       {t.icon?.url ? (
//                         <img
//                           src={
//                             t.icon
//                               .url
//                           }
//                           alt={
//                             t.title
//                           }
//                           className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
//                         />
//                       ) : (
//                         <Icon
//                           size={
//                             22
//                           }
//                         />
//                       )}
//                     </div>

//                     {t.docsLink && (
//                       <a
//                         href={
//                           t.docsLink
//                         }
//                         target="_blank"
//                         rel="noreferrer"
//                         className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
//                       >
//                         <ExternalLink
//                           size={
//                             14
//                           }
//                         />
//                       </a>
//                     )}
//                   </div>

//                   {/* TITLE */}
//                   <h3 className="font-display text-lg sm:text-xl font-bold mb-3 line-clamp-1">
//                     {t.title}
//                   </h3>

//                   {/* CATEGORY */}
//                   <div
//                     className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] sm:text-xs font-semibold capitalize mb-4 ${CATEGORY_STYLES[t.category]}`}
//                   >
//                     <Icon size={11} />

//                     {t.category}
//                   </div>

//                   {/* DESC */}
//                   <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
//                     {t.description ||
//                       `${t.title} technology used for scalable and high-performance application development.`}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* CTA */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="mt-12 md:mt-16 glass-card rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 text-center"
//         >
//           <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
//             Build Modern
//             <span className="text-glow">
//               {" "}
//               Applications
//             </span>
//           </h2>

//           <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-7">
//             We combine modern
//             technologies with scalable
//             architecture to create
//             high-quality digital
//             products.
//           </p>

//           <Link
//             to="/contact"
//             className="btn-primary px-6 sm:px-7 py-3 rounded-2xl inline-flex items-center justify-center text-sm sm:text-base"
//           >
//             Start Your Project
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Globe,
  Server,
  Database,
  Smartphone,
  Cloud,
  Code2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import useDataStore from "../stores/useDataStore";

const CATEGORIES = ["frontend", "backend", "database", "devops", "mobile", "other"];

const CATEGORY_ICONS = {
  frontend: Globe,
  backend: Server,
  database: Database,
  devops: Cloud,
  mobile: Smartphone,
  other: Code2,
};

const CATEGORY_STYLES = {
  frontend: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  backend:  "bg-violet-500/10 text-violet-300 border-violet-500/20",
  database: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  devops:   "bg-amber-500/10 text-amber-300 border-amber-500/20",
  mobile:   "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  other:    "bg-white/10 text-gray-300 border-white/10",
};

export default function TechnologiesPage() {
  const { technologies } = useDataStore();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!technologies.length) {
      useDataStore.getState().fetchAll();
    }
  }, []);

  const filtered =
    filter === "all"
      ? technologies
      : technologies.filter((t) => t.category === filter);

  return (
    <div className="pb-16 sm:pb-20 overflow-hidden">
      <div className="section px-4 sm:px-6 md:px-10">

        {/* ─────────────────────── HERO ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 pt-6 sm:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-4">
            <Sparkles size={14} />
            <span className="text-xs sm:text-sm text-gray-300">Modern Tech Stack</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight">
            Technologies
            <span className="text-glow"> We Use</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            Modern technologies and tools used to build fast, scalable, and secure digital products.
          </p>
        </motion.div>

        {/* ─────────────────────── FILTERS ─────────────────────── */}
        {/* Horizontal scroll on mobile, wrap on larger screens */}
        <div className="flex gap-2 sm:gap-3 mb-8 md:mb-12 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible scrollbar-hide">
          <button
            onClick={() => setFilter("all")}
            className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-white text-black"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c];
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                  filter === c
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={13} />
                {c}
              </button>
            );
          })}
        </div>

        {/* ─────────────────────── GRID ─────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filtered.map((t, i) => {
            const Icon = CATEGORY_ICONS[t.category] || Code2;

            return (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[28px] border border-white/10 bg-white/[0.03] p-4 sm:p-5 md:p-6 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
                  <div className="absolute top-0 right-0 w-20 sm:w-28 h-20 sm:h-28 bg-accent/10 blur-[50px] sm:blur-[60px] rounded-full" />
                </div>

                <div className="relative z-10">
                  {/* Top row: icon + docs link */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {t.icon?.url ? (
                        <img
                          src={t.icon.url}
                          alt={t.title}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                        />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>

                    {t.docsLink && (
                      <a
                        href={t.docsLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all flex-shrink-0"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 line-clamp-1">
                    {t.title}
                  </h3>

                  {/* Category badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full border text-[10px] sm:text-xs font-semibold capitalize mb-3 sm:mb-4 ${CATEGORY_STYLES[t.category]}`}
                  >
                    <Icon size={10} />
                    {t.category}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {t.description ||
                      `${t.title} technology used for scalable and high-performance application development.`}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-10 text-center">
            <h3 className="text-xl sm:text-2xl font-black mb-2">No Technologies Found</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Technologies for this category will appear here soon.
            </p>
          </div>
        )}

        {/* ─────────────────────── CTA ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 glass-card rounded-[24px] sm:rounded-[28px] md:rounded-[32px] p-6 sm:p-8 md:p-10 text-center"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">
            Build Modern
            <span className="text-glow"> Applications</span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-7 px-2">
            We combine modern technologies with scalable architecture to create
            high-quality digital products.
          </p>

          <Link
            to="/contact"
            className="btn-primary px-6 sm:px-7 py-3 rounded-2xl inline-flex items-center justify-center text-sm sm:text-base"
          >
            Start Your Project
          </Link>
        </motion.div>

      </div>
    </div>
  );
}