// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Briefcase, Calendar, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import useDataStore from "../stores/useDataStore";

// export default function CareersPage() {
//   const { careers } = useDataStore();
//   const active = careers.filter(c => c.isActive);
//   useEffect(() => { if (!careers.length) useDataStore.getState().fetchCareers(); }, []);

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
//           <h1 className="font-display text-5xl font-black mb-4">Join Our Team</h1>
//           <p className="text-faint text-lg max-w-2xl">We're looking for talented developers and designers to help us build amazing software solutions.</p>
//         </motion.div>

//         {active.length === 0 ? (
//           <div className="glass-card p-12 text-center"><p className="text-faint mb-4">No open positions at the moment.</p><p className="text-sm text-muted">Check back soon!</p></div>
//         ) : (
//           <div className="space-y-4">
//             {active.map((c, i) => (
//               <motion.div key={c._id} className="hover-card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1">
//                     <h3 className="font-display text-xl font-bold mb-3">{c.role}</h3>
//                     <div className="flex flex-wrap gap-3 mb-4 text-sm text-faint">
//                       <span className="flex items-center gap-1"><MapPin size={14} /> {c.location}</span>
//                       <span className="flex items-center gap-1"><Briefcase size={14} /> {c.jobType}</span>
//                       {c.salary && <span className="text-glow font-semibold">{c.salary}</span>}
//                       {c.lastDate && <span className="flex items-center gap-1"><Calendar size={14} /> Apply by {new Date(c.lastDate).toLocaleDateString()}</span>}
//                     </div>
//                     <p className="text-faint text-sm mb-4 line-clamp-2">{c.jobDescription}</p>
//                     {c.mustHaveSkills && <div className="flex flex-wrap gap-2 mb-4">{c.mustHaveSkills.slice(0, 4).map(s => <span key={s} className="tag-accent text-xs">{s}</span>)}</div>}
//                   </div>
//                   <Link to={`/apply?role=${encodeURIComponent(c.role)}&id=${c._id}`} className="btn-primary flex-shrink-0">
//                     Apply <ArrowRight size={14} />
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Briefcase,
//   Calendar,
//   ArrowRight,
//   CheckCircle,
//   Users,
//   Rocket,
//   Laptop,
//   HeartHandshake,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import useDataStore from "../stores/useDataStore";

// export default function CareersPage() {
//   const { careers } = useDataStore();

//   useEffect(() => {
//     if (!careers.length) {
//       useDataStore.getState().fetchCareers();
//     }
//   }, []);

//   const active = careers.filter((c) => c.isActive);

//   const benefits = [
//     "Flexible Work Environment",
//     "Remote Friendly Culture",
//     "Career Growth Opportunities",
//     "Performance Bonuses",
//     "Modern Tech Stack",
//     "Supportive Team",
//   ];

//   const culture = [
//     {
//       icon: Rocket,
//       title: "Innovation First",
//       desc: "We love building modern scalable software products.",
//     },
//     {
//       icon: Users,
//       title: "Team Collaboration",
//       desc: "Healthy communication and teamwork are part of our culture.",
//     },
//     {
//       icon: Laptop,
//       title: "Modern Technologies",
//       desc: "Work with MERN, React, Node.js, Cloud & AI tools.",
//     },
//     {
//       icon: HeartHandshake,
//       title: "Work-Life Balance",
//       desc: "We value productivity and personal well-being equally.",
//     },
//   ];

//   const process = [
//     "Application Review",
//     "Technical Interview",
//     "Practical Assignment",
//     "Final HR Discussion",
//     "Offer & Onboarding",
//   ];

//   const faqs = [
//     {
//       q: "Do you offer remote jobs?",
//       a: "Yes, depending on the role and project requirements.",
//     },
//     {
//       q: "What technologies do you use?",
//       a: "Mostly React.js, Node.js, MongoDB, Express, Tailwind CSS and cloud services.",
//     },
//     {
//       q: "Can freshers apply?",
//       a: "Yes, passionate freshers are always welcome.",
//     },
//     {
//       q: "How long does hiring take?",
//       a: "Usually between 3–10 working days.",
//     },
//   ];

//   return (
//     <div className=" pb-20">
//       <div className="section space-y-24">
//         {/* HERO SECTION */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-center max-w-4xl mx-auto"
//         >
//           <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-6">
//             Careers & Opportunities
//           </div>

//           <h1 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6">
//             Build The Future With Our Team
//           </h1>

//           <p className="text-lg text-gray-400 leading-relaxed">
//             We are looking for passionate developers, designers and innovators
//             who want to create impactful digital products and scalable software
//             solutions.
//           </p>
//         </motion.div>

//         {/* BENEFITS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//         >
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full"></div>
//             <h2 className="text-3xl font-bold">Why Join Us?</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {benefits.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5"
//               >
//                 <div className="flex items-center gap-3">
//                   <CheckCircle className="text-green-400" size={20} />
//                   <span className="font-medium">{item}</span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* CULTURE */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//         >
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full"></div>
//             <h2 className="text-3xl font-bold">Our Culture</h2>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {culture.map((item, i) => {
//               const Icon = item.icon;

//               return (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="hover-card p-8 rounded-3xl border border-white/10 bg-white/5"
//                 >
//                   <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
//                     <Icon size={28} />
//                   </div>

//                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>

//                   <p className="text-gray-400 leading-relaxed">
//                     {item.desc}
//                   </p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>

//         {/* HIRING PROCESS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//         >
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full"></div>
//             <h2 className="text-3xl font-bold">Hiring Process</h2>
//           </div>

//           <div className="grid md:grid-cols-5 gap-6">
//             {process.map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5 text-center"
//               >
//                 <div className="w-12 h-12 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto mb-4">
//                   {i + 1}
//                 </div>

//                 <h3 className="font-semibold">{step}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* JOB OPENINGS */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//         >
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full"></div>
//             <h2 className="text-3xl font-bold">Open Positions</h2>
//           </div>

//           {active.length === 0 ? (
//             <div className="glass-card p-12 rounded-3xl border border-white/10 bg-white/5 text-center">
//               <p className="text-gray-300 text-lg mb-2">
//                 No open positions currently.
//               </p>

//               <p className="text-gray-500">
//                 Please check again later.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {active.map((c, i) => (
//                 <motion.div
//                   key={c._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className="hover-card p-8 rounded-3xl border border-white/10 bg-white/5"
//                 >
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//                     <div className="flex-1">
//                       <h3 className="text-2xl font-bold mb-4">
//                         {c.role}
//                       </h3>

//                       <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
//                         <span className="flex items-center gap-2">
//                           <MapPin size={15} />
//                           {c.location}
//                         </span>

//                         <span className="flex items-center gap-2">
//                           <Briefcase size={15} />
//                           {c.jobType}
//                         </span>

//                         {c.lastDate && (
//                           <span className="flex items-center gap-2">
//                             <Calendar size={15} />
//                             Apply by{" "}
//                             {new Date(c.lastDate).toLocaleDateString()}
//                           </span>
//                         )}

//                         {c.salary && (
//                           <span className="font-semibold text-white">
//                             {c.salary}
//                           </span>
//                         )}
//                       </div>

//                       <p className="text-gray-400 leading-relaxed mb-5">
//                         {c.jobDescription}
//                       </p>

//                       {c.mustHaveSkills?.length > 0 && (
//                         <div className="flex flex-wrap gap-3">
//                           {c.mustHaveSkills.map((skill) => (
//                             <span
//                               key={skill}
//                               className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <Link
//                         to={`/apply?role=${encodeURIComponent(
//                           c.role
//                         )}&id=${c._id}`}
//                         className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
//                       >
//                         Apply Now
//                         <ArrowRight size={16} />
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* FAQ */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//         >
//           <div className="flex items-center gap-3 mb-10">
//             <div className="h-8 w-1 bg-white rounded-full"></div>
//             <h2 className="text-3xl font-bold">
//               Frequently Asked Questions
//             </h2>
//           </div>

//           <div className="space-y-5">
//             {faqs.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="glass-card p-6 rounded-3xl border border-white/10 bg-white/5"
//               >
//                 <h3 className="text-lg font-semibold mb-3">
//                   {item.q}
//                 </h3>

//                 <p className="text-gray-400 leading-relaxed">
//                   {item.a}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-12 text-center"
//         >
//           <h2 className="text-4xl font-black mb-5">
//             Didn’t Find The Right Role?
//           </h2>

//           <p className="text-gray-400 max-w-2xl mx-auto mb-8">
//             We are always looking for talented people. Send us your resume
//             and we’ll contact you when a suitable opportunity opens up.
//           </p>

//           <Link
//             to="/contact"
//             className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
//           >
//             Contact Us
//             <ArrowRight size={18} />
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Calendar,
  ArrowRight,
  CheckCircle,
  Users,
  Rocket,
  Laptop,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import useDataStore from "../stores/useDataStore";

export default function CareersPage() {
  const { careers } = useDataStore();

  useEffect(() => {
    if (!careers.length) {
      useDataStore.getState().fetchCareers();
    }
  }, []);

  const active = careers.filter((c) => c.isActive);

  const benefits = [
    "Flexible Work Environment",
    "Remote Friendly Culture",
    "Career Growth Opportunities",
    "Performance Bonuses",
    "Modern Tech Stack",
    "Supportive Team",
  ];

  const culture = [
    {
      icon: Rocket,
      title: "Innovation First",
      desc: "We love building modern scalable software products.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      desc: "Healthy communication and teamwork are part of our culture.",
    },
    {
      icon: Laptop,
      title: "Modern Technologies",
      desc: "Work with MERN, React, Node.js, Cloud & AI tools.",
    },
    {
      icon: HeartHandshake,
      title: "Work-Life Balance",
      desc: "We value productivity and personal well-being equally.",
    },
  ];

  const process = [
    "Application Review",
    "Technical Interview",
    "Practical Assignment",
    "Final HR Discussion",
    "Offer & Onboarding",
  ];

  const faqs = [
    {
      q: "Do you offer remote jobs?",
      a: "Yes, depending on the role and project requirements.",
    },
    {
      q: "What technologies do you use?",
      a: "Mostly React.js, Node.js, MongoDB, Express, Tailwind CSS and cloud services.",
    },
    {
      q: "Can freshers apply?",
      a: "Yes, passionate freshers are always welcome.",
    },
    {
      q: "How long does hiring take?",
      a: "Usually between 3–10 working days.",
    },
  ];

  return (
    <div className="pb-16 sm:pb-20">
      <div className="section space-y-16 sm:space-y-24 px-4 sm:px-6 md:px-10">

        {/* ─────────────────────── HERO ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto pt-6 sm:pt-0"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs sm:text-sm text-gray-300 mb-5 sm:mb-6">
            Careers & Opportunities
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 sm:mb-6">
            Build The Future With Our Team
          </h1>

          <p className="text-sm sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto px-2">
            We are looking for passionate developers, designers and innovators who want to create
            impactful digital products and scalable software solutions.
          </p>
        </motion.div>

        {/* ─────────────────────── BENEFITS ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold">Why Join Us?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400 flex-shrink-0" size={18} />
                  <span className="font-medium text-sm sm:text-base">{item}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────── CULTURE ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold">Our Culture</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {culture.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="hover-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center mb-4 sm:mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ─────────────────────── HIRING PROCESS ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold">Hiring Process</h2>
          </div>

          {/* Mobile: vertical list | Desktop: 5-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 text-center flex lg:flex-col items-center gap-4 lg:gap-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black font-bold flex items-center justify-center flex-shrink-0 lg:mx-auto lg:mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-left lg:text-center">{step}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────── JOB OPENINGS ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold">Open Positions</h2>
          </div>

          {active.length === 0 ? (
            <div className="glass-card p-8 sm:p-12 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 text-center">
              <p className="text-gray-300 text-base sm:text-lg mb-2">No open positions currently.</p>
              <p className="text-gray-500 text-sm sm:text-base">Please check again later.</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              {active.map((c, i) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="hover-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{c.role}</h3>

                      {/* Meta info — wraps gracefully on mobile */}
                      <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {c.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {c.jobType}
                        </span>
                        {c.lastDate && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            Apply by {new Date(c.lastDate).toLocaleDateString()}
                          </span>
                        )}
                        {c.salary && (
                          <span className="font-semibold text-white">{c.salary}</span>
                        )}
                      </div>

                      <p className="text-gray-400 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
                        {c.jobDescription}
                      </p>

                      {c.mustHaveSkills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {c.mustHaveSkills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10 text-xs sm:text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Apply button — full width on mobile */}
                    <div className="lg:flex-shrink-0">
                      <Link
                        to={`/apply?role=${encodeURIComponent(c.role)}&id=${c._id}`}
                        className="inline-flex w-full lg:w-auto items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-black text-sm font-semibold hover:scale-105 transition"
                      >
                        Apply Now
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ─────────────────────── FAQ ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="h-6 sm:h-8 w-1 bg-white rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5"
              >
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{item.q}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─────────────────────── CTA ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[28px] sm:rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-5">
            Didn't Find The Right Role?
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base px-2">
            We are always looking for talented people. Send us your resume and we'll contact you
            when a suitable opportunity opens up.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black text-sm sm:text-base font-semibold hover:scale-105 transition"
          >
            Contact Us
            <ArrowRight size={17} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}