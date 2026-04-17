"use client";

import { motion } from "framer-motion";

type StationMarqueeProps = {
  text: string;
};

export function StationMarquee({ text }: StationMarqueeProps) {
  const repeated = ` ${text} • ${text} • ${text} • ${text} • `;

  return (
    <section className="overflow-hidden rounded-2xl border border-wedding-journey-brass/45 bg-[#1f2428] p-3 shadow-ticket">
      <motion.div
        className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-[#f7a53a] sm:text-base"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 14, ease: "linear", repeat: Infinity }}
      >
        <span>{repeated}</span>
        <span>{repeated}</span>
      </motion.div>
    </section>
  );
}
