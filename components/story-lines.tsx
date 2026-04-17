"use client";

import { motion } from "framer-motion";

type StoryLinesProps = {
  lines: string[];
};

export function StoryLines({ lines }: StoryLinesProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {lines.map((line, index) => (
        <motion.blockquote
          key={line}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: index * 0.05 }}
          className="rounded-2xl border border-wedding-journey-brass/40 bg-white/75 p-5 text-lg italic leading-relaxed text-wedding-journey-charcoal shadow-ticket"
        >
          {line}
        </motion.blockquote>
      ))}
    </section>
  );
}
