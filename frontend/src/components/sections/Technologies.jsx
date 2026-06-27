// import { motion } from "framer-motion";
// import useDataStore from "../../stores/useDataStore";

// export default function Technologies() {
//   const { technologies } = useDataStore();
//   return (
//     <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
//       <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-4xl md:text-5xl font-black mb-4">
//         Our Tech Stack
//       </motion.h2>
//       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-faint max-w-2xl mb-16">
//         Modern technologies powering your solutions
//       </motion.p>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {technologies.slice(0, 12).map((t, i) => (
//           <motion.div key={t._id} className="glass-card p-6 flex flex-col items-center text-center hover-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
//             {t.icon?.url && <img src={t.icon.url} alt={t.title} className="w-10 h-10 mb-2" />}
//             <p className="font-semibold text-xs">{t.title}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import useDataStore from "../../stores/useDataStore";

export default function Technologies() {
  const { technologies } = useDataStore();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="orb -top-40 -right-40 w-96 h-96 bg-accent/10" />
      <div className="orb -bottom-32 -left-40 w-80 h-80 bg-teal/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
          >
            <span className="text-accent">⚡</span>
            <span className="uppercase text-sm font-semibold tracking-widest text-faint">
              Tech Stack
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
          >
            Our Tech Stack
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-faint text-lg max-w-2xl"
          >
            Modern technologies powering your solutions with speed, scalability, and performance
          </motion.p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {technologies.slice(0, 12).map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl hover:border-accent/30 hover:bg-card/70 transition-all duration-500 group"
            >
              {t.icon?.url && (
                <div className="mb-4 transition-transform group-hover:scale-110 duration-500">
                  <img
                    src={t.icon.url}
                    alt={t.title}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
              )}
              <p className="font-semibold text-sm md:text-base text-white group-hover:text-accent transition-colors">
                {t.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}