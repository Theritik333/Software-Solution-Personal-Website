// import { motion } from "framer-motion";
// import { ExternalLink, Github } from "lucide-react";
// import useDataStore from "../../stores/useDataStore";

// export default function Projects() {
//   const { projects } = useDataStore();
//   return (
//     <section className="py-20 md:py-28 px-5 md:px-10 max-w-7xl mx-auto">
//       <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-display text-4xl md:text-5xl font-black mb-4">
//         Featured Work
//       </motion.h2>
//       <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-faint max-w-2xl mb-16">
//         Showcase of our latest projects and success stories
//       </motion.p>
//       <div className="grid md:grid-cols-2 gap-8">
//         {projects.slice(0, 4).map((p, i) => (
//           <motion.div key={p._id} className="glass-card overflow-hidden group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
//             {p.image?.url && <div className="aspect-video overflow-hidden"><img src={p.image.url} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>}
//             <div className="p-6">
//               <span className="tag-accent text-xs">{p.category}</span>
//               <h3 className="font-display text-xl font-bold mt-3 mb-2">{p.title}</h3>
//               <p className="text-faint text-sm mb-4">{p.description}</p>
//               <div className="flex gap-3">
//                 {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs"><ExternalLink size={14} /> Live</a>}
//                 {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs"><Github size={14} /> Code</a>}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
// import { motion } from "framer-motion";
// import { ExternalLink, Github, ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import useDataStore from "../../stores/useDataStore";

// export default function Projects() {
//   const { projects } = useDataStore();

//   return (
//     <section className="relative py-20 md:py-28 overflow-hidden">
//       {/* Background Elements */}
//       <div className="orb -top-40 -right-40 w-96 h-96 bg-accent/10" />
//       <div className="orb -bottom-32 -left-40 w-80 h-80 bg-teal/10" />

//       <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-16 md:mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6"
//           >
//             <span className="text-accent">★</span>
//             <span className="uppercase text-sm font-semibold tracking-widest text-faint">
//               Featured Projects
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
//           >
//             Our Latest Work
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className="text-faint text-lg max-w-2xl"
//           >
//             Handpicked projects that showcase our expertise in creating exceptional digital experiences
//           </motion.p>
//         </div>

//         {/* Projects Grid - Better Spacing */}
//         <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
//           {projects.slice(0, 4).map((project, i) => (
//             <motion.div
//               key={project._id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1, duration: 0.6 }}
//               whileHover={{ y: -12 }}
//               className="group glass-card overflow-hidden rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl hover:border-accent/20 transition-all duration-500"
//             >
//               {/* Project Image */}
//               {project.image?.url && (
//                 <div className="relative aspect-video overflow-hidden">
//                   <img
//                     src={project.image.url}
//                     alt={project.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   {/* Overlay Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
//                   {/* Category Tag */}
//                   <div className="absolute top-5 left-5">
//                     <span className="tag-accent text-xs px-4 py-1.5 rounded-full backdrop-blur-md">
//                       {project.category}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Content */}
//               <div className="p-7 md:p-8 lg:p-9">
//                 <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
//                   {project.title}
//                 </h3>

//                 <p className="text-faint text-[15px] leading-relaxed mb-6 line-clamp-3">
//                   {project.description}
//                 </p>

//                 {/* Links */}
//                 <div className="flex items-center gap-3">
//                   {project.liveUrl && (
//                     <a
//                       href={project.liveUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-ghost flex items-center gap-2 text-sm group/link"
//                     >
//                       <ExternalLink size={16} />
//                       <span>Live Demo</span>
//                     </a>
//                   )}

//                   {project.githubUrl && (
//                     <a
//                       href={project.githubUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="btn-ghost flex items-center gap-2 text-sm group/link"
//                     >
//                       <Github size={16} />
//                       <span>Source Code</span>
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* View All Projects Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="flex justify-center mt-16 md:mt-20"
//         >
//           <Link
//             to="/projects"
//             className="btn-outline px-8 py-4 text-lg flex items-center gap-3 group"
//           >
//             View All Projects
//             <ArrowRight className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useDataStore from "../../stores/useDataStore";

export default function Projects() {
  const { projects } = useDataStore();

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
            <span className="text-accent">★</span>
            <span className="uppercase text-sm font-semibold tracking-widest text-faint">
              Featured Projects
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black mb-4"
          >
            Our Latest Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-faint text-lg max-w-2xl"
          >
            Handpicked projects that showcase our expertise in creating exceptional digital experiences
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {projects.slice(0, 4).map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -12 }}
              className="group glass-card overflow-hidden rounded-3xl border border-white/5 bg-card/40 backdrop-blur-xl hover:border-accent/20 transition-all duration-500"
            >
              {/* Project Image */}
              {project.image?.url && (
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image.url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="tag-accent text-xs px-4 py-1.5 rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-7 md:p-8 lg:p-9">
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-faint text-[15px] leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Key Features */}
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-faint mb-3">Key Features</p>
                    <ul className="space-y-2">
                      {project.keyFeatures.slice(0, 10).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-soft">
                          <span className="text-accent mt-1.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-faint mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 10).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[13px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-faint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost flex items-center gap-2 text-sm group/link"
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost flex items-center gap-2 text-sm group/link"
                    >
                      <Github size={16} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <Link
            to="/projects"
            className="btn-outline px-8 py-4 text-lg flex items-center gap-3 group"
          >
            View All Projects
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}