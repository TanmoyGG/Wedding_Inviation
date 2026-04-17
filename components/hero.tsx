"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type HeroProps = {
  title: string;
  subtitle: string;
};

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] overflow-hidden rounded-3xl border border-wedding-journey-brass/30 bg-wedding-journey-platform-100/80 shadow-2xl shadow-wedding-journey-maroon/20">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 1.04 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/assets/images/platform-3.jpg"
          alt="Platform 3 illustration"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-wedding-journey-maroon/80 via-wedding-journey-maroon/35 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.2 }}
        className="relative z-10 flex min-h-[92vh] items-end p-6 sm:p-10"
      >
        <div className="max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-wedding-journey-ticket-paper">
            Platform 3 Invitation
          </p>
          <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-wedding-journey-ticket-paper sm:text-lg">
            {subtitle}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
