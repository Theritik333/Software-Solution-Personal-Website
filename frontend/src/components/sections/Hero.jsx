// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen  pb-20 overflow-hidden">
//       {/* Orbs */}
//       <div className="orb -top-40 -left-40 w-96 h-96 bg-accent/20" />
//       <div className="orb -bottom-40 -right-40 w-96 h-96 bg-teal/20" />

//       <div className="relative section flex flex-col items-center justify-center text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-rim bg-card/50 backdrop-blur-sm"
//         >
//           <Sparkles size={14} className="text-accent" />
//           <span className="text-xs font-semibold text-faint uppercase tracking-widest">Welcome to excellence</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="font-display text-5xl md:text-7xl font-black max-w-4xl mb-6 leading-tight"
//         >
//           Transform Your Ideas Into{" "}
//           <span className="grad-text-accent">Digital Reality</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-faint text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
//         >
//           We craft scalable, beautiful software solutions that empower businesses to grow. From startups to enterprises, we're your digital partner.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="flex flex-col sm:flex-row gap-4 mb-20"
//         >
//           <Link to="/contact" className="btn-primary">
//             Get Started <ArrowRight size={16} />
//           </Link>
//           <Link to="/projects" className="btn-outline">
//             View Our Work
//           </Link>
//         </motion.div>

//         {/* Featured stats */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="grid grid-cols-3 gap-6 pt-12 border-t border-rim"
//         >
//           {[
//             { num: "50+", label: "Projects Delivered" },
//             { num: "100+", label: "Happy Clients" },
//             { num: "5+", label: "Years Experience" },
//           ].map((stat) => (
//             <div key={stat.label}>
//               <p className="text-3xl font-black text-glow">{stat.num}</p>
//               <p className="text-xs text-faint mt-2">{stat.label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function Hero() {
  const CountUp = ({ end, suffix = "+" }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => 
      Math.floor(latest).toLocaleString() + suffix
    );

    useEffect(() => {
      const controls = animate(count, parseInt(end), {
        duration: 2.2,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return () => controls.stop();
    }, [end]);

    return (
      <motion.span className="tabular-nums tracking-[-1px]">
        {rounded}
      </motion.span>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-12 md:pb-20">
      {/* Premium Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-[100px] md:blur-[120px] animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] md:w-[580px] md:h-[580px] bg-teal-400/20 rounded-full blur-[100px] md:blur-[140px] animate-pulse-slow delay-700" />

      <div className="relative z-10 w-full section flex flex-col items-center justify-center text-center px-5 sm:px-6 md:px-8">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8 md:mb-10 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl"
        >
          <Sparkles size={15} className="text-accent" />
          <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-faint">
            Crafting Digital Excellence
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-[2.6rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-black max-w-4xl mb-6 md:mb-8"
        >
          Transform Your Ideas Into{" "}
          <span className="grad-text-accent">Digital Reality</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-faint text-base md:text-lg max-w-xl md:max-w-2xl mb-10 md:mb-14 leading-relaxed px-2"
        >
          We craft scalable, beautiful software solutions that empower businesses to grow. 
          From visionary startups to established enterprises.
        </motion.p>

        {/* CTA Buttons - Now Perfectly Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-5 mb-16 md:mb-20 w-full max-w-sm sm:max-w-none justify-center items-center"
        >
          <Link 
            to="/contact" 
            className="btn-primary text-base md:text-lg px-10 py-4 flex items-center justify-center gap-3 group w-full sm:w-auto"
          >
            Get Started 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <Link 
            to="/projects" 
            className="btn-outline text-base md:text-lg px-9 py-4 w-full sm:w-auto"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Professional Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 md:gap-12 pt-10 md:pt-12 border-t border-white/10 w-full max-w-3xl px-4"
        >
          {[
            { num: "50", label: "Projects Delivered" },
            { num: "100", label: "Happy Clients" },
            { num: "5", label: "Years Experience" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl lg:text-6xl font-black text-glow tracking-tighter mb-1 md:mb-2">
                <CountUp end={stat.num} />
              </p>
              <p className="text-xs md:text-sm text-faint font-medium leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}