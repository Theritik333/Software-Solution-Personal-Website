// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import useDataStore from "../stores/useDataStore";

// export default function About() {
//   const { abouts, loading } = useDataStore();
//   useEffect(() => { if (!abouts.length) useDataStore.getState().fetchAll(); }, []);

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display text-5xl font-black mb-4">
//           About Us
//         </motion.h1>
//         <div className="grid md:grid-cols-2 gap-12 mt-12">
//           {abouts.map((a) => (
//             <motion.div key={a._id} className="glass-card p-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
//               {a.image?.url && <img src={a.image.url} alt={a.title} className="w-full h-64 object-cover rounded-xl mb-6" />}
//               <h2 className="font-display text-2xl font-bold mb-4">{a.title}</h2>
//               <p className="text-faint mb-6">{a.description}</p>
//               {a.mission && <div className="mb-4"><p className="text-sm font-semibold text-glow mb-2">Mission</p><p className="text-faint text-sm">{a.mission}</p></div>}
//               {a.vision && <div><p className="text-sm font-semibold text-teal mb-2">Vision</p><p className="text-faint text-sm">{a.vision}</p></div>}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Zap, Target, Eye, Users, Award, Rocket,
//   CheckCircle, ArrowRight, Heart, Brain, Lightbulb,
// } from "lucide-react";
// import useDataStore from "../stores/useDataStore";
// import useSettingStore from "../stores/useSettingStore";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// };

// export default function About() {
//   const { abouts, loading } = useDataStore();
//   const { setting } = useSettingStore();
//   const [activeTab, setActiveTab] = useState("story");

//   useEffect(() => {
//     if (!abouts.length) useDataStore.getState().fetchAll();
//   }, []);

//   // Company stats
//   const stats = [
//     { num: "50+", label: "Projects Delivered", icon: Rocket },
//     { num: "100+", label: "Happy Clients", icon: Heart },
//     { num: "5+", label: "Years in Business", icon: Award },
//     { num: "25+", label: "Team Members", icon: Users },
//   ];

//   // Core values
//   const values = [
//     {
//       icon: Lightbulb,
//       title: "Innovation",
//       description: "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
//       color: "text-yellow-400",
//     },
//     {
//       icon: Brain,
//       title: "Excellence",
//       description: "Quality is non-negotiable. We deliver code that's clean, scalable, and maintainable.",
//       color: "text-purple-400",
//     },
//     {
//       icon: Heart,
//       title: "Client Focus",
//       description: "Your success is our success. We listen, understand, and deliver beyond expectations.",
//       color: "text-rose-400",
//     },
//     {
//       icon: Users,
//       title: "Collaboration",
//       description: "We believe in teamwork, transparency, and building strong partnerships.",
//       color: "text-emerald-400",
//     },
//   ];

//   // Timeline events
//   const timeline = [
//     {
//       year: "2019",
//       title: "Founded",
//       description: "SSID Dev was born with a vision to transform businesses through software.",
//     },
//     {
//       year: "2020",
//       title: "First Milestone",
//       description: "Delivered our 10th project and crossed 50+ satisfied clients.",
//     },
//     {
//       year: "2021",
//       title: "Team Growth",
//       description: "Expanded team to 15+ dedicated developers and designers.",
//     },
//     {
//       year: "2022",
//       title: "Industry Recognition",
//       description: "Recognized as a top software development agency in the region.",
//     },
//     {
//       year: "2023",
//       title: "Global Reach",
//       description: "Started serving international clients across multiple continents.",
//     },
//     {
//       year: "2024",
//       title: "Innovation Hub",
//       description: "Launched internal R&D lab for emerging technologies.",
//     },
//   ];

//   // Team members
//   const team = [
//     {
//       name: "Rajesh Kumar",
//       role: "Founder & CEO",
//       expertise: "Full Stack Development",
//       image: "🚀",
//     },
//     {
//       name: "Priya Sharma",
//       role: "CTO",
//       expertise: "System Architecture",
//       image: "💻",
//     },
//     {
//       name: "Arjun Singh",
//       role: "Lead Developer",
//       expertise: "Backend Engineering",
//       image: "⚙️",
//     },
//     {
//       name: "Ananya Patel",
//       role: "Design Lead",
//       expertise: "UI/UX Design",
//       image: "🎨",
//     },
//   ];

//   return (
//     <main className="overflow-x-hidden bg-ink">
//       {/* Hero Section */}
//       <section className="relative  pb-16 px-5 md:px-10 min-h-screen flex items-center justify-center">
//         <div className="orb -top-40 -left-40 w-96 h-96 bg-accent/20" />
//         <div className="orb -bottom-40 right-0 w-96 h-96 bg-teal/20" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center relative"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rim bg-card/50 backdrop-blur-sm mb-6"
//           >
//             <Zap size={14} className="text-accent" />
//             <span className="text-xs font-semibold text-faint uppercase tracking-widest">Our Story</span>
//           </motion.div>

//           <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight">
//             Building Digital{" "}
//             <span className="grad-text-accent">Excellence Since 2019</span>
//           </h1>

//           <p className="text-faint text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
//             We're a team of passionate developers, designers, and strategists dedicated to transforming
//             your vision into powerful, scalable software solutions that drive real business impact.
//           </p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <a href="#journey" className="btn-primary">
//               Explore Our Journey <ArrowRight size={16} />
//             </a>
//             <Link to="/contact" className="btn-outline">
//               Let's Work Together
//             </Link>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-5 md:px-10 bg-void/50 border-t border-rim border-b">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             className="grid grid-cols-2 md:grid-cols-4 gap-6"
//           >
//             {stats.map((stat, i) => {
//               const Icon = stat.icon;
//               return (
//                 <motion.div
//                   key={i}
//                   variants={itemVariants}
//                   className="glass-card p-8 text-center hover-card"
//                 >
//                   <Icon size={32} className="text-accent mx-auto mb-4" />
//                   <p className="font-display text-3xl font-black text-white mb-2">{stat.num}</p>
//                   <p className="text-faint text-sm">{stat.label}</p>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </section>

//       {/* Company Overview Tabs */}
//       <section className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="font-display text-4xl font-black mb-12 text-center"
//         >
//           Who We Are
//         </motion.h2>

//         <div className="flex gap-3 mb-12 justify-center flex-wrap">
//           {["story", "mission", "values"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
//                 activeTab === tab
//                   ? "bg-accent text-white"
//                   : "border border-rim text-faint hover:text-white hover:border-accent"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Story Tab */}
//         {activeTab === "story" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="glass-card p-10 max-w-3xl mx-auto"
//           >
//             <h3 className="font-display text-2xl font-bold mb-6">Our Journey</h3>
//             <div className="space-y-4 text-faint leading-relaxed">
//               <p>
//                 Founded in 2019, SSID Dev emerged from a simple belief: technology should empower
//                 businesses, not complicate them. What started as a small team of 3 passionate developers
//                 has grown into a 25+ member agency delivering exceptional software solutions.
//               </p>
//               <p>
//                 From our humble beginnings in a co-working space in Delhi, we've scaled to serve clients
//                 across India, Asia, and beyond. We've worked with startups, scale-ups, and established
//                 enterprises—each project strengthening our commitment to excellence.
//               </p>
//               <p>
//                 Today, SSID Dev is known for delivering not just code, but strategic solutions that align
//                 with business goals. We don't just build software; we build partnerships that drive
//                 measurable success.
//               </p>
//               <p>
//                 Every project we undertake is guided by our core values: innovation, excellence, client
//                 focus, and collaboration. This philosophy has earned us 100+ satisfied clients and dozens
//                 of successful projects in our portfolio.
//               </p>
//             </div>
//           </motion.div>
//         )}

//         {/* Mission & Vision Tab */}
//         {activeTab === "mission" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
//           >
//             <div className="glass-card p-10">
//               <Target className="w-12 h-12 text-accent mb-4" />
//               <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
//               <p className="text-faint leading-relaxed">
//                 To empower businesses of all sizes by delivering innovative, scalable, and user-centric
//                 software solutions that drive growth, efficiency, and competitive advantage in the digital
//                 landscape.
//               </p>
//             </div>
//             <div className="glass-card p-10">
//               <Eye className="w-12 h-12 text-teal mb-4" />
//               <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
//               <p className="text-faint leading-relaxed">
//                 To be the most trusted technology partner for businesses seeking exceptional software
//                 development, where innovation meets reliability, and client success is our ultimate
//                 measure of achievement.
//               </p>
//             </div>
//           </motion.div>
//         )}

//         {/* Values Tab */}
//         {activeTab === "values" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
//           >
//             {values.map((value, i) => {
//               const Icon = value.icon;
//               return (
//                 <div key={i} className="glass-card p-8 hover-card">
//                   <Icon className={`w-10 h-10 ${value.color} mb-4`} />
//                   <h4 className="font-display text-xl font-bold mb-2">{value.title}</h4>
//                   <p className="text-faint text-sm">{value.description}</p>
//                 </div>
//               );
//             })}
//           </motion.div>
//         )}
//       </section>

//       {/* Timeline Section */}
//       <section
//         id="journey"
//         className="py-20 px-5 md:px-10 bg-void/50 border-t border-rim border-b"
//       >
//         <div className="max-w-7xl mx-auto">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="font-display text-4xl font-black mb-16 text-center"
//           >
//             Our Journey
//           </motion.h2>

//           <div className="relative">
//             {/* Timeline line */}
//             <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-teal hidden md:block" />

//             <div className="space-y-12 md:space-y-16">
//               {timeline.map((event, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.1 }}
//                   className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
//                 >
//                   {/* Content */}
//                   <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
//                     <div className="glass-card p-6 hover-card">
//                       <p className="text-accent font-semibold text-sm mb-2">{event.year}</p>
//                       <h4 className="font-display text-xl font-bold mb-2">{event.title}</h4>
//                       <p className="text-faint text-sm">{event.description}</p>
//                     </div>
//                   </div>

//                   {/* Timeline dot */}
//                   <div className="hidden md:flex items-center justify-center w-1/2 relative">
//                     <div className="w-4 h-4 rounded-full bg-accent border-4 border-ink absolute z-10" />
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="font-display text-4xl font-black mb-4 text-center"
//         >
//           Meet Our Leadership
//         </motion.h2>
//         <p className="text-faint text-center mb-12 max-w-2xl mx-auto">
//           Experienced professionals dedicated to delivering excellence and driving innovation in every
//           project we undertake.
//         </p>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {team.map((member, i) => (
//             <motion.div key={i} variants={itemVariants} className="glass-card p-8 text-center hover-card">
//               <div className="text-5xl mb-4">{member.image}</div>
//               <h4 className="font-display text-lg font-bold mb-1">{member.name}</h4>
//               <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
//               <p className="text-faint text-xs">{member.expertise}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </section>

//       {/* About Sections from Database */}
//       {abouts && abouts.length > 0 && (
//         <section className="py-20 px-5 md:px-10 bg-void/50 border-t border-rim border-b">
//           <div className="max-w-7xl mx-auto">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               className="font-display text-4xl font-black mb-12 text-center"
//             >
//               Our Company
//             </motion.h2>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               className="grid md:grid-cols-2 gap-12"
//             >
//               {abouts.map((a) => (
//                 <motion.div key={a._id} variants={itemVariants} className="glass-card p-8 hover-card">
//                   {a.image?.url && (
//                     <img
//                       src={a.image.url}
//                       alt={a.title}
//                       className="w-full h-64 object-cover rounded-xl mb-6"
//                     />
//                   )}
//                   <h3 className="font-display text-2xl font-bold mb-4">{a.title}</h3>
//                   <p className="text-faint mb-6 leading-relaxed">{a.description}</p>

//                   {a.stats && a.stats.length > 0 && (
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       {a.stats.map((stat, idx) => (
//                         <div key={idx} className="bg-card/50 p-4 rounded-lg">
//                           <p className="font-display text-2xl font-black text-glow">{stat.value}</p>
//                           <p className="text-faint text-xs mt-1">{stat.label}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {a.mission && (
//                     <div className="mb-4 pb-4 border-b border-rim">
//                       <p className="text-sm font-semibold text-glow mb-2 flex items-center gap-2">
//                         <Target size={14} /> Mission
//                       </p>
//                       <p className="text-faint text-sm">{a.mission}</p>
//                     </div>
//                   )}

//                   {a.vision && (
//                     <div>
//                       <p className="text-sm font-semibold text-teal mb-2 flex items-center gap-2">
//                         <Eye size={14} /> Vision
//                       </p>
//                       <p className="text-faint text-sm">{a.vision}</p>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>
//       )}

//       {/* CTA Section */}
//       <section className="py-20 px-5 md:px-10 relative">
//         <div className="orb -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20" />

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="max-w-3xl mx-auto text-center relative"
//         >
//           <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
//             Ready to Work With Us?
//           </h2>
//           <p className="text-faint text-lg mb-10 max-w-2xl mx-auto">
//             Whether you have a project in mind or want to explore how we can help your business,
//             let's start a conversation today.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/contact" className="btn-primary">
//               Get In Touch <ArrowRight size={16} />
//             </Link>
//             <Link to="/services" className="btn-outline">
//               Explore Services
//             </Link>
//           </div>
//         </motion.div>
//       </section>
//     </main>
//   );
// }


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, Target, Eye, Users, Award, Rocket,
  CheckCircle, ArrowRight, Heart, Brain, Lightbulb,
} from "lucide-react";
import useDataStore from "../stores/useDataStore";
import useSettingStore from "../stores/useSettingStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function About() {
  const { abouts, loading } = useDataStore();
  const { setting } = useSettingStore();
  const [activeTab, setActiveTab] = useState("story");

  useEffect(() => {
    if (!abouts.length) useDataStore.getState().fetchAll();
  }, []);

  // Company stats
  const stats = [
    { num: "50+", label: "Projects Delivered", icon: Rocket },
    { num: "100+", label: "Happy Clients", icon: Heart },
    { num: "5+", label: "Years in Business", icon: Award },
    { num: "25+", label: "Team Members", icon: Users },
  ];

  // Core values
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
      color: "text-yellow-400",
    },
    {
      icon: Brain,
      title: "Excellence",
      description:
        "Quality is non-negotiable. We deliver code that's clean, scalable, and maintainable.",
      color: "text-purple-400",
    },
    {
      icon: Heart,
      title: "Client Focus",
      description:
        "Your success is our success. We listen, understand, and deliver beyond expectations.",
      color: "text-rose-400",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in teamwork, transparency, and building strong partnerships.",
      color: "text-emerald-400",
    },
  ];

  // Timeline events
  const timeline = [
    {
      year: "2019",
      title: "Founded",
      description: "SSID Dev was born with a vision to transform businesses through software.",
    },
    {
      year: "2020",
      title: "First Milestone",
      description: "Delivered our 10th project and crossed 50+ satisfied clients.",
    },
    {
      year: "2021",
      title: "Team Growth",
      description: "Expanded team to 15+ dedicated developers and designers.",
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Recognized as a top software development agency in the region.",
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Started serving international clients across multiple continents.",
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description: "Launched internal R&D lab for emerging technologies.",
    },
  ];

  // Team members
  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      expertise: "Full Stack Development",
      image: "🚀",
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      expertise: "System Architecture",
      image: "💻",
    },
    {
      name: "Arjun Singh",
      role: "Lead Developer",
      expertise: "Backend Engineering",
      image: "⚙️",
    },
    {
      name: "Ananya Patel",
      role: "Design Lead",
      expertise: "UI/UX Design",
      image: "🎨",
    },
  ];

  return (
    <main className="overflow-x-hidden bg-ink">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative pb-16 px-4 sm:px-6 md:px-10 min-h-screen flex items-center justify-center">
        <div className="orb -top-40 -left-40 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20" />
        <div className="orb -bottom-40 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-teal/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rim bg-card/50 backdrop-blur-sm mb-6"
          >
            <Zap size={14} className="text-accent" />
            <span className="text-xs font-semibold text-faint uppercase tracking-widest">
              Our Story
            </span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
            Building Digital{" "}
            <span className="grad-text-accent">Excellence Since 2019</span>
          </h1>

          <p className="text-faint text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed px-2">
            We're a team of passionate developers, designers, and strategists dedicated to
            transforming your vision into powerful, scalable software solutions that drive real
            business impact.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#journey" className="btn-primary w-full sm:w-auto justify-center">
              Explore Our Journey <ArrowRight size={16} />
            </a>
            <Link to="/contact" className="btn-outline w-full sm:w-auto justify-center">
              Let's Work Together
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ───────────────────────── STATS ───────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-void/50 border-t border-rim border-b">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-card p-5 sm:p-8 text-center hover-card"
                >
                  <Icon size={28} className="text-accent mx-auto mb-3 sm:mb-4" />
                  <p className="font-display text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">
                    {stat.num}
                  </p>
                  <p className="text-faint text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────── COMPANY OVERVIEW TABS ─────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-black mb-10 sm:mb-12 text-center"
        >
          Who We Are
        </motion.h2>

        {/* Tab Buttons */}
        <div className="flex gap-2 sm:gap-3 mb-10 sm:mb-12 justify-center flex-wrap">
          {["story", "mission", "values"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-accent text-white"
                  : "border border-rim text-faint hover:text-white hover:border-accent"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Story Tab */}
        {activeTab === "story" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 sm:p-10 max-w-3xl mx-auto"
          >
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
              Our Journey
            </h3>
            <div className="space-y-4 text-faint leading-relaxed text-sm sm:text-base">
              <p>
                Founded in 2019, SSID Dev emerged from a simple belief: technology should empower
                businesses, not complicate them. What started as a small team of 3 passionate
                developers has grown into a 25+ member agency delivering exceptional software
                solutions.
              </p>
              <p>
                From our humble beginnings in a co-working space in Delhi, we've scaled to serve
                clients across India, Asia, and beyond. We've worked with startups, scale-ups, and
                established enterprises—each project strengthening our commitment to excellence.
              </p>
              <p>
                Today, SSID Dev is known for delivering not just code, but strategic solutions that
                align with business goals. We don't just build software; we build partnerships that
                drive measurable success.
              </p>
              <p>
                Every project we undertake is guided by our core values: innovation, excellence,
                client focus, and collaboration. This philosophy has earned us 100+ satisfied
                clients and dozens of successful projects in our portfolio.
              </p>
            </div>
          </motion.div>
        )}

        {/* Mission & Vision Tab */}
        {activeTab === "mission" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            <div className="glass-card p-6 sm:p-10">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-accent mb-4" />
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Our Mission
              </h3>
              <p className="text-faint leading-relaxed text-sm sm:text-base">
                To empower businesses of all sizes by delivering innovative, scalable, and
                user-centric software solutions that drive growth, efficiency, and competitive
                advantage in the digital landscape.
              </p>
            </div>
            <div className="glass-card p-6 sm:p-10">
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-teal mb-4" />
              <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Our Vision
              </h3>
              <p className="text-faint leading-relaxed text-sm sm:text-base">
                To be the most trusted technology partner for businesses seeking exceptional
                software development, where innovation meets reliability, and client success is our
                ultimate measure of achievement.
              </p>
            </div>
          </motion.div>
        )}

        {/* Values Tab */}
        {activeTab === "values" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="glass-card p-6 sm:p-8 hover-card">
                  <Icon className={`w-9 h-9 sm:w-10 sm:h-10 ${value.color} mb-4`} />
                  <h4 className="font-display text-lg sm:text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-faint text-sm">{value.description}</p>
                </div>
              );
            })}
          </motion.div>
        )}
      </section>

      {/* ───────────────────────── TIMELINE ───────────────────────── */}
      <section
        id="journey"
        className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-void/50 border-t border-rim border-b"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl font-black mb-12 sm:mb-16 text-center"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Centre vertical line — desktop only */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent to-teal hidden md:block" />

            {/* Mobile left-side line */}
            <div className="absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-accent to-teal md:hidden" />

            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {timeline.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  /* Mobile: always left-aligned with offset for the dot
                     Desktop: alternating left / right */
                  className={`
                    flex gap-6
                    pl-10 md:pl-0
                    md:gap-0
                    ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                  `}
                >
                  {/* Mobile dot */}
                  <div className="absolute left-[10px] mt-6 w-3 h-3 rounded-full bg-accent border-2 border-ink md:hidden" />

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-1/2 ${
                      i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="glass-card p-5 sm:p-6 hover-card">
                      <p className="text-accent font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                        {event.year}
                      </p>
                      <h4 className="font-display text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                        {event.title}
                      </h4>
                      <p className="text-faint text-xs sm:text-sm">{event.description}</p>
                    </div>
                  </div>

                  {/* Desktop centre dot */}
                  <div className="hidden md:flex items-center justify-center w-1/2 relative">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-ink absolute z-10" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── TEAM ───────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl font-black mb-3 sm:mb-4 text-center"
        >
          Meet Our Leadership
        </motion.h2>
        <p className="text-faint text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-2">
          Experienced professionals dedicated to delivering excellence and driving innovation in
          every project we undertake.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass-card p-5 sm:p-8 text-center hover-card"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{member.image}</div>
              <h4 className="font-display text-base sm:text-lg font-bold mb-1">{member.name}</h4>
              <p className="text-accent text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                {member.role}
              </p>
              <p className="text-faint text-xs">{member.expertise}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ───────────────── ABOUT SECTIONS FROM DATABASE ───────────────── */}
      {abouts && abouts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 bg-void/50 border-t border-rim border-b">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-4xl font-black mb-10 sm:mb-12 text-center"
            >
              Our Company
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
            >
              {abouts.map((a) => (
                <motion.div key={a._id} variants={itemVariants} className="glass-card p-6 sm:p-8 hover-card">
                  {a.image?.url && (
                    <img
                      src={a.image.url}
                      alt={a.title}
                      className="w-full h-48 sm:h-64 object-cover rounded-xl mb-5 sm:mb-6"
                    />
                  )}
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                    {a.title}
                  </h3>
                  <p className="text-faint mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {a.description}
                  </p>

                  {a.stats && a.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                      {a.stats.map((stat, idx) => (
                        <div key={idx} className="bg-card/50 p-3 sm:p-4 rounded-lg">
                          <p className="font-display text-xl sm:text-2xl font-black text-glow">
                            {stat.value}
                          </p>
                          <p className="text-faint text-xs mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {a.mission && (
                    <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-rim">
                      <p className="text-sm font-semibold text-glow mb-2 flex items-center gap-2">
                        <Target size={14} /> Mission
                      </p>
                      <p className="text-faint text-xs sm:text-sm">{a.mission}</p>
                    </div>
                  )}

                  {a.vision && (
                    <div>
                      <p className="text-sm font-semibold text-teal mb-2 flex items-center gap-2">
                        <Eye size={14} /> Vision
                      </p>
                      <p className="text-faint text-xs sm:text-sm">{a.vision}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 relative">
        <div className="orb -top-32 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-accent/20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-5 sm:mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-faint text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Whether you have a project in mind or want to explore how we can help your business,
            let's start a conversation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary w-full sm:w-auto justify-center">
              Get In Touch <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="btn-outline w-full sm:w-auto justify-center">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}