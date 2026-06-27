import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../lib/axios";

export default function Privacy() {
  const [policy, setPolicy] = useState(null);
  useEffect(() => {
    api.get("/privacy-policy").then(res => setPolicy(res.data.policy)).catch(() => {});
  }, []);

  return (
    <div className=" pt-20 pb-20">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-10">
          <h1 className="font-display text-4xl font-black mb-2">{policy?.title || "Privacy Policy"}</h1>
          <div className="text-faint text-sm mb-8">{policy?.lastUpdated && `Last updated: ${new Date(policy.lastUpdated).toLocaleDateString()}`}</div>
          <div className="prose prose-invert max-w-none">
            {policy?.description ? <div dangerouslySetInnerHTML={{ __html: policy.description.replace(/\n/g, "<br />") }} /> : <p className="text-faint">Loading privacy policy...</p>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
