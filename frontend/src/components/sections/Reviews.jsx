// import { motion } from "framer-motion";
// import { Star } from "lucide-react";
// import useDataStore from "../../stores/useDataStore";

// export default function Reviews() {
//   const { reviews } = useDataStore();
//   return (
//     <section className="relative py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
//       <div className="orb -bottom-40 left-0 w-80 h-80 bg-rose/10" />
//       <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-4xl md:text-5xl font-black mb-4 relative">
//         Client Stories
//       </motion.h2>
//       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-faint max-w-2xl mb-16 relative">
//         What our clients say about working with us
//       </motion.p>
//       <div className="grid md:grid-cols-2 gap-6 relative">
//         {reviews.slice(0, 4).map((r, i) => (
//           <motion.div key={r._id} className="glass-card p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//             <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < r.rating ? "fill-amber-400 text-amber-400" : "text-rim"} />)}</div>
//             <p className="text-faint mb-6 line-clamp-4">{r.text}</p>
//             <div className="flex gap-3 items-center">
//               {r.roundImage?.url && <img src={r.roundImage.url} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-rim" />}
//               <div>
//                 <p className="font-semibold text-sm">{r.name}</p>
//                 <p className="text-xs text-faint">{r.designation}{r.company ? ` • ${r.company}` : ""}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import useDataStore from "../../stores/useDataStore";

export default function Reviews() {
  const { reviews } = useDataStore();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="orb -top-40 -right-40 w-96 h-96 bg-rose/10" />
      <div className="orb -bottom-40 -left-40 w-80 h-80 bg-accent/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
          >
            <Star size={16} className="text-amber-400" />
            <span className="uppercase text-sm font-semibold tracking-widest text-faint">
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-faint text-lg max-w-2xl"
          >
            Real stories from amazing clients who trusted us with their vision
          </motion.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.slice(0, 4).map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass-card p-8 md:p-10 rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl hover:border-rose/20 hover:bg-card/70 transition-all duration-500 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className={`${
                      idx < r.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-rim"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-faint text-[15px] leading-relaxed mb-8 line-clamp-5 group-hover:text-white/90 transition-colors">
                "{r.text}"
              </p>

              {/* Client Info */}
              <div className="flex gap-4 items-center">
                {r.roundImage?.url && (
                  <img
                    src={r.roundImage.url}
                    alt={r.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                )}
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-sm text-faint">
                    {r.designation}
                    {r.company && ` • ${r.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}