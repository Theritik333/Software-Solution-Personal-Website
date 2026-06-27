// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";

// export default function CTA() {
//   return (
//     <section className="relative py-20 md:py-28 px-5 md:px-10">
//       <div className="orb -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/20" />
//       <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center relative">
//         <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
//           Ready to Grow Your Business?
//         </h2>
//         <p className="text-faint text-lg mb-10 max-w-2xl mx-auto">
//           Let's build something amazing together. Get in touch and let's discuss how we can help transform your ideas into reality.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link to="/contact" className="btn-primary">
//             Start Your Project <ArrowRight size={16} />
//           </Link>
//           <Link to="/careers" className="btn-outline">
//             Join Our Team
//           </Link>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="orb -top-40 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-gradient-to-br from-accent/20 to-purple-500/10" />
      <div className="orb -bottom-40 left-1/3 w-96 h-96 bg-teal/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <Sparkles size={18} className="text-accent" />
            <span className="uppercase text-sm font-semibold tracking-widest text-faint">
              Let's Build Together
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            Ready to Grow Your <span className="grad-text-accent">Business?</span>
          </h2>

          {/* Description */}
          <p className="text-faint text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Let's turn your vision into a powerful digital reality. 
            Get in touch today and take the first step towards extraordinary growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="btn-primary text-lg px-10 py-4 flex items-center gap-3 group"
            >
              Start Your Project
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/careers"
              className="btn-outline text-lg px-8 py-4 flex items-center gap-3 group"
            >
              Join Our Team
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}