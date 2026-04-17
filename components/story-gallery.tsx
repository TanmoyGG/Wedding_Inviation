"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type StoryFrame = {
  src: string;
  alt: string;
  caption?: string;
};

type StoryGalleryProps = {
  frames: StoryFrame[];
};

export function StoryGallery({ frames }: StoryGalleryProps) {
  return (
    <section className="space-y-8">
      {frames.map((frame, index) => (
        <motion.figure
          key={`${frame.src}-${index}`}
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.05 }}
          className="overflow-hidden rounded-3xl border border-wedding-journey-brass/35 bg-white/80 shadow-ticket"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/4]">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              priority={index === 0}
              className="object-cover"
            />
          </div>
          {frame.caption ? (
            <figcaption className="px-4 py-3 text-center text-sm text-wedding-journey-charcoal/80 sm:text-base">
              {frame.caption}
            </figcaption>
          ) : null}
        </motion.figure>
      ))}
    </section>
  );
}
