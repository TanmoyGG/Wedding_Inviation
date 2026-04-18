"use client";

import { motion } from "framer-motion";

type StationMarqueeProps = {
  lines: string[];
};

export function StationMarquee({ lines }: StationMarqueeProps) {
  const content = lines.join("  •  ");
  // Content repeated 5x to allow all lines to fully scroll through before repeating
  const repeated = ` ${content}  •  ${content}  •  ${content}  •  ${content}  •  ${content}  •  `;

  return (
    <section className="overflow-hidden rounded-2xl border border-wedding-journey-brass/45 bg-[#1f2428] p-3 shadow-ticket">
      {/* Desktop view: faster scroll */}
      <motion.div
        className="hidden whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-[#f7a53a] sm:text-base lg:block"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-1000%"] }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      >
        <span>{repeated}</span>
      </motion.div>
      
      {/* Mobile/Tablet view: slower scroll for readability on narrow screens */}
      <motion.div
        className="block whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-[#f7a53a] lg:hidden"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-1400%"] }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      >
        <span>{repeated}</span>
      </motion.div>
    </section>
  );
}
