// import { motion } from "framer-motion";
// import useDataStore from "../../stores/useDataStore";

// export default function Services() {
//   const { services } = useDataStore();
//   return (
//     <section className="relative py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
//       <div className="orb -top-40 right-0 w-72 h-72 bg-teal/10" />
//       <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-black mb-4">
//         What We Offer
//       </motion.h2>
//       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-faint max-w-2xl mb-16">
//         Comprehensive software solutions tailored to your business needs
//       </motion.p>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
//         {services.slice(0, 6).map((s, i) => (
//           <motion.div key={s._id} className="hover-card p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//             {s.icon?.url && <img src={s.icon.url} alt={s.title} className="w-14 h-14 mb-4 rounded-lg" />}
//             <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
//             <p className="text-faint text-sm mb-4">{s.description}</p>
//             {s.points && <ul className="space-y-2">{s.points.slice(0, 3).map((p, i) => <li key={i} className="text-xs text-soft flex gap-2"><span className="text-accent">→</span> {p}</li>)}</ul>}
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import useDataStore from "../../stores/useDataStore";

// export default function Services() {
//   const { services } = useDataStore();

//   return (
//     <section className="relative py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto overflow-hidden">
//       {/* Background Lighting */}
//       <div className="orb -top-40 right-0 w-96 h-96 bg-teal/10" />
//       <div className="orb -bottom-32 -left-40 w-80 h-80 bg-accent/10" />

//       <div className="flex flex-col items-center text-center mb-16">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
//         >
//           <span className="text-accent">✦</span>
//           <span className="uppercase text-sm font-semibold tracking-widest text-faint">
//             Our Expertise
//           </span>
//         </motion.div>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
//         >
//           What We Offer
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="text-faint text-lg max-w-2xl"
//         >
//           Comprehensive digital solutions crafted with precision to accelerate your business growth
//         </motion.p>
//       </div>

//       {/* Services Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//         {services.slice(0, 6).map((service, i) => (
//           <motion.div
//             key={service._id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.08, duration: 0.6 }}
//             whileHover={{ y: -8 }}
//             className="group hover-card p-8 md:p-10 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-accent/20 hover:bg-card/70"
//           >
//             {/* Icon */}
//             {service.icon?.url && (
//               <div className="mb-6">
//                 <img
//                   src={service.icon.url}
//                   alt={service.title}
//                   className="w-16 h-16 object-contain transition-transform group-hover:scale-110 duration-500"
//                 />
//               </div>
//             )}

//             {/* Title */}
//             <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
//               {service.title}
//             </h3>

//             {/* Description */}
//             <p className="text-faint text-[15px] leading-relaxed mb-6">
//               {service.description}
//             </p>

//             {/* Key Points */}
//             {service.points && service.points.length > 0 && (
//               <ul className="space-y-3 mb-8">
//                 {service.points.slice(0, 3).map((point, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-start gap-3 text-sm text-soft"
//                   >
//                     <span className="text-accent mt-1.5">•</span>
//                     <span>{point}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* Learn More */}
//             <Link
//               to={`/services/${service._id}`}
//               className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors group/link"
//             >
//               Learn More
//               <ArrowRight
//                 size={16}
//                 className="transition-transform group-hover/link:translate-x-1"
//               />
//             </Link>
//           </motion.div>
//         ))}
//       </div>

//       {/* View All Button */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="flex justify-center mt-16"
//       >
//         <Link
//           to="/services"
//           className="btn-outline px-8 py-4 text-lg flex items-center gap-3 group"
//         >
//           View All Services
//           <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//         </Link>
//       </motion.div>
//     </section>
//   );
// }

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import useDataStore from "../../stores/useDataStore";

// export default function Services() {
//   const { services } = useDataStore();

//   return (
//     <section className="relative py-20 md:py-28 overflow-hidden">
//       {/* Background Lighting */}
//       <div className="orb -top-40 right-0 w-96 h-96 bg-teal/10" />
//       <div className="orb -bottom-32 -left-40 w-80 h-80 bg-accent/10" />

//       <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-16 md:mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
//           >
//             <span className="text-accent">✦</span>
//             <span className="uppercase text-sm font-semibold tracking-widest text-faint">
//               Our Expertise
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
//           >
//             What We Offer
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className="text-faint text-lg max-w-2xl"
//           >
//             Comprehensive digital solutions crafted with precision to accelerate your business growth
//           </motion.p>
//         </div>

//         {/* Services Grid - Better Spacing */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
//           {services.slice(0, 6).map((service, i) => (
//             <motion.div
//               key={service._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08, duration: 0.6 }}
//               whileHover={{ y: -8 }}
//               className="group hover-card p-8 md:p-9 lg:p-10 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-accent/20 hover:bg-card/70"
//             >
//               {/* Icon */}
//               {service.icon?.url && (
//                 <div className="mb-6">
//                   <img
//                     src={service.icon.url}
//                     alt={service.title}
//                     className="w-16 h-16 object-contain transition-transform group-hover:scale-110 duration-500"
//                   />
//                 </div>
//               )}

//               {/* Title */}
//               <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
//                 {service.title}
//               </h3>

//               {/* Description */}
//               <p className="text-faint text-[15px] leading-relaxed mb-6">
//                 {service.description}
//               </p>

//               {/* Key Points */}
//               {service.points && service.points.length > 0 && (
//                 <ul className="space-y-3 mb-8">
//                   {service.points.slice(0, 3).map((point, idx) => (
//                     <li key={idx} className="flex items-start gap-3 text-sm text-soft">
//                       <span className="text-accent mt-1.5">•</span>
//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {/* Learn More */}
//               <Link
//                 to={`/services/${service._id}`}
//                 className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-white transition-colors group/link"
//               >
//                 Learn More
//                 <ArrowRight
//                   size={16}
//                   className="transition-transform group-hover/link:translate-x-1"
//                 />
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="flex justify-center mt-16 md:mt-20"
//         >
//           <Link
//             to="/services"
//             className="btn-outline px-8 py-4 text-lg flex items-center gap-3 group"
//           >
//             View All Services
//             <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useDataStore from "../../stores/useDataStore";

export default function Services() {
  const { services } = useDataStore();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Lighting */}
      <div className="orb -top-40 right-0 w-96 h-96 bg-teal/10" />
      <div className="orb -bottom-32 -left-40 w-80 h-80 bg-accent/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
          >
            <span className="text-accent">✦</span>
            <span className="uppercase text-sm font-semibold tracking-widest text-faint">
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
          >
            What We Offer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-faint text-lg max-w-2xl"
          >
            Comprehensive digital solutions crafted with precision to accelerate your business growth
          </motion.p>
        </div>

        {/* Services Grid - Desktop pe 2 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 xl:gap-10">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group hover-card p-8 md:p-9 lg:p-10 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl transition-all duration-500 hover:border-accent/20 hover:bg-card/70"
            >
              {/* Icon */}
              {service.icon?.url && (
                <div className="mb-6">
                  <img
                    src={service.icon.url}
                    alt={service.title}
                    className="w-16 h-16 object-contain transition-transform group-hover:scale-110 duration-500"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-faint text-[15px] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Key Points */}
              {service.points && service.points.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {service.points.slice(0, 6).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-soft">
                      <span className="text-accent mt-1.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <Link
            to="/services"
            className="btn-outline px-8 py-4 text-lg flex items-center gap-3 group"
          >
            View All Services
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}