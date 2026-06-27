// import { useEffect } from "react";
// import { motion } from "framer-motion";
// import useDataStore from "../stores/useDataStore";

// export default function ServicesPage() {
//   const { services, loading } = useDataStore();
//   useEffect(() => { if (!services.length) useDataStore.getState().fetchAll(); }, []);

//   return (
//     <div className="pt-20 pb-20">
//       <div className="section">
//         <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display text-5xl font-black mb-12">
//           Our Services
//         </motion.h1>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((s, i) => (
//             <motion.div key={s._id} className="hover-card p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//               {s.icon?.url && <img src={s.icon.url} alt={s.title} className="w-12 h-12 mb-4" />}
//               <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
//               <p className="text-faint text-sm mb-4">{s.description}</p>
//               {s.points && <ul className="space-y-2">{s.points.map((p, i) => <li key={i} className="text-sm text-soft flex gap-2"><span className="text-accent">✓</span> {p}</li>)}</ul>}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";

import { motion } from "framer-motion";

import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers3,
  Globe,
  ShieldCheck,
  Smartphone,
  Database,
  Server,
} from "lucide-react";

import { Link } from "react-router-dom";

import useDataStore from "../stores/useDataStore";

export default function ServicesPage() {
  const {
    services,
    loading,
  } = useDataStore();

  useEffect(() => {
    if (!services.length) {
      useDataStore
        .getState()
        .fetchAll();
    }
  }, []);

  return (
    <div className=" pb-24 overflow-hidden">
      {/* HERO */}
      <section className="section relative mb-24">
        {/* BG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />

          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6">
              <Sparkles size={15} />

              <span className="text-sm text-gray-300">
                Premium Digital Services
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight mb-6">
              Building Modern
              <br />

              <span className="text-glow">
                Digital Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
              We help startups,
              businesses, and brands
              create scalable software,
              beautiful user
              experiences, and
              high-performance digital
              platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="section mb-24">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "100+",
              sub: "Projects Delivered",
            },

            {
              title: "50+",
              sub: "Happy Clients",
            },

            {
              title: "24/7",
              sub: "Support Available",
            },

            {
              title: "5★",
              sub: "Client Satisfaction",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.1,
              }}
              className="glass-card p-8 text-center rounded-[30px]"
            >
              <h3 className="text-5xl font-black mb-3 text-glow">
                {item.title}
              </h3>

              <p className="text-gray-400">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section mb-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black mb-5">
            What We Offer
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl">
            End-to-end software
            development services
            tailored for startups,
            enterprises, and growing
            digital businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s._id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.08,
              }}
              className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:-translate-y-2 transition-all duration-500"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-[80px] rounded-full" />
              </div>

              {/* ICON */}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {s.icon?.url ? (
                    <img
                      src={s.icon.url}
                      alt={s.title}
                      className="w-9 h-9 object-contain"
                    />
                  ) : (
                    <Layers3 size={28} />
                  )}
                </div>

                {/* TITLE */}
                <h3 className="font-display text-2xl font-black mb-4">
                  {s.title}
                </h3>

                {/* DESC */}
                <p className="text-gray-400 leading-relaxed mb-6">
                  {s.description}
                </p>

                {/* POINTS */}
                {s.points &&
                  s.points.length >
                    0 && (
                    <div className="space-y-3 mb-8">
                      {s.points.map(
                        (p, index) => (
                          <div
                            key={
                              index
                            }
                            className="flex items-start gap-3"
                          >
                            <CheckCircle2
                              size={
                                18
                              }
                              className="text-accent mt-0.5 flex-shrink-0"
                            />

                            <p className="text-sm text-gray-300 leading-relaxed">
                              {p}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section mb-24">
        <div className="glass-card rounded-[36px] p-10 md:p-14">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-4xl md:text-6xl font-black mb-5">
              Our Process
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We follow a proven
              development process to
              ensure quality, speed,
              and scalability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "Understanding your goals and requirements.",
              },

              {
                step: "02",
                title: "Planning",
                desc: "Creating strategy, architecture, and roadmap.",
              },

              {
                step: "03",
                title: "Development",
                desc: "Building scalable and high-quality software.",
              },

              {
                step: "04",
                title: "Launch",
                desc: "Deployment, optimization, and support.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: i * 0.1,
                }}
              >
                <div className="text-5xl font-black text-white/10 mb-5">
                  {item.step}
                </div>

                <h3 className="font-bold text-xl mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="section mb-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          className="mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black mb-5">
            Technologies We Use
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl">
            Modern tools and
            technologies powering
            world-class digital
            experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Globe,
              title: "Frontend",
              desc: "React, Next.js, Tailwind CSS",
            },

            {
              icon: Server,
              title: "Backend",
              desc: "Node.js, Express.js, APIs",
            },

            {
              icon: Database,
              title: "Database",
              desc: "MongoDB, PostgreSQL, MySQL",
            },

            {
              icon: Smartphone,
              title: "Mobile Apps",
              desc: "React Native, Flutter",
            },

            {
              icon: ShieldCheck,
              title: "Security",
              desc: "Authentication & Protection",
            },

            {
              icon: Layers3,
              title: "Architecture",
              desc: "Scalable system design",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: i * 0.08,
              }}
              className="glass-card rounded-[28px] p-7"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                <item.icon
                  size={26}
                />
              </div>

              <h3 className="font-bold text-xl mb-3">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-12 md:p-16 text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />

          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
              Ready to Build
              <br />
              Something Amazing?
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
              Let’s transform your
              ideas into powerful
              digital products.
            </p>

            <Link
              to="/contact"
              className="btn-primary px-8 py-4 text-base rounded-2xl inline-flex items-center justify-center"
            >
              Start Your Project
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}