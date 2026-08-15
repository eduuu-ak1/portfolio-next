"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WarpText from "./WarpText";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-16 text-center"
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-4 font-mono text-sm uppercase tracking-widest text-ink-soft"
      >
        Creative Dev
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="mb-4 w-full max-w-3xl"
      >
        <WarpText
          text="EDU"
          color="#F2F1F5"
          fontFamily="var(--font-display)"
          fontWeight={700}
          fontSize="clamp(4.5rem, 15vw, 11rem)"
          letterSpacing="-0.02em"
          lineHeight={0.95}
          warpStrength={0.08}
          warpScale={1.7}
          speed={0.55}
          pointerInfluence={0.42}
          pointerStrength={0.38}
          refraction={0.018}
          ripple
          style={{ height: "clamp(160px, 22vw, 320px)" }}
        />
      </motion.div>

      <motion.h2
        variants={container}
        initial="hidden"
        animate="visible"
        className="mb-6 max-w-3xl font-display text-[clamp(1.5rem,4vw,2.4rem)] font-semibold leading-tight text-ink"
      >
        <motion.span variants={wordVariant} className="inline-block mr-[0.28em]">
          Ideas
        </motion.span>
        <motion.span variants={wordVariant} className="inline-block mr-[0.28em]">
          in.
        </motion.span>
        <motion.span variants={wordVariant} className="inline-block mr-[0.28em]">
          Working
        </motion.span>
        <motion.span
          variants={wordVariant}
          className="inline-block mr-[0.28em] font-serif italic font-normal text-accent"
        >
          software
        </motion.span>
        <motion.span variants={wordVariant} className="inline-block">
          out.
        </motion.span>
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="mb-8 max-w-lg text-lg text-ink-soft"
      >
        I design and build web apps, mobile experiences, and Godot games
        &mdash; crafted for seamless, impactful user experiences.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-full bg-accent px-7 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          View Projects
        </a>
        <Link
          href="/contact"
          className="rounded-full border border-line px-7 py-3 font-mono text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Contact Me
        </Link>
      </motion.div>
    </section>
  );
}