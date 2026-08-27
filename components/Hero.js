"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AutomationGraphCanvas from "./AutomationGraphCanvas";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20 py-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.p
            variants={fadeUp}
            className="wire-node mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint"
          >
            Edu Nitre &mdash; AI Automation &amp; Full-Stack Systems
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2rem,4.6vw,3.9rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
            style={{ textWrap: "balance" }}
          >
            Replacing manual busywork with{" "}
            <span className="bg-ink px-1.5 py-0.5 text-bg">
              AI automation
            </span>{" "}
            for small and service-based businesses
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-lg text-ink-soft"
          >
            I build n8n and AI-agent systems that qualify leads, answer
            support tickets, and follow up on their own &mdash; so nothing
            sits in an inbox waiting on a person.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-7 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              See the automations
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-ink px-7 py-3 font-mono text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              Book a workflow audit
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mx-auto w-full max-w-90 lg:max-w-none"
          aria-hidden="true"
        >
          <AutomationGraphCanvas />
        </motion.div>
      </div>
    </section>
  );
}
