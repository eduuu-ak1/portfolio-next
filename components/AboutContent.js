"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "./Footer";
import FavoriteSong from "./FavoriteSong";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutContent() {
  return (
    <main>
      {/* Intro */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex min-h-[55vh] flex-col justify-center px-6 md:px-12 lg:px-20 py-28"
      >
        <p className="wire-node mb-4 font-mono text-xs uppercase tracking-[0.2em] text-wire">
          About
        </p>
        <h1
          className="max-w-2xl font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
          style={{ textWrap: "balance" }}
        >
          The engineer behind the automations.
        </h1>
      </motion.section>

      {/* Bio + photo + stats + resume */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="wire-rule grid grid-cols-1 items-center gap-14 px-6 md:px-12 lg:px-20 py-20 md:grid-cols-[3fr_2fr] md:py-28"
      >
        <div>
          <p className="mb-4 max-w-lg text-lg text-ink-soft">
            I&apos;m a BSIT graduate who builds AI-driven automation systems
            and the full-stack apps around them, for small and service-based
            businesses.
          </p>
          <p className="mb-8 max-w-lg text-base text-ink-soft">
            Most of my work lives in n8n and the Gemini and Anthropic APIs
            &mdash; replacing manual lead intake, support triage, and
            follow-up with systems that run themselves. When there&apos;s a
            dashboard or UI needed around it, I build that too, in React and
            Node.
          </p>

          <div className="mb-8 grid grid-cols-3 gap-6 border-y border-line py-6">
            <div>
              <p className="font-display text-3xl font-semibold text-accent">3</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                Automations Shipped
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-accent">2</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                AI Providers Integrated
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-accent">&apos;26</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                BSIT Graduate
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              View Resume
            </a>
            <a
              href="https://github.com/eduuu-ak1"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 font-mono text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              View GitHub
            </a>
          </div>
        </div>

        {/* Layered, rotated photo card */}
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-0 -rotate-3 rounded-2xl border border-accent/40 bg-accent/5" />

          <div className="group relative aspect-4/5 w-full rotate-2 overflow-hidden rounded-2xl border border-line bg-bg-alt shadow-2xl transition-transform duration-300 hover:rotate-0">
            <Image
              src="/aboutme.png"
              alt="Edu Nitre"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <Image
              src="/profile.png"
              alt="Edu Nitre"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rotate-[-4deg] rounded-full border border-line bg-bg px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft shadow-lg">
            General Santos City, PH
          </div>
        </div>
      </motion.section>

      {/* Off the clock */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="wire-rule flex flex-col px-6 md:px-12 lg:px-20 py-20"
      >
        <p className="wire-node mb-3 font-mono text-xs uppercase tracking-[0.2em] text-wire">
          Off the clock
        </p>
        <h2 className="mb-8 max-w-lg font-display text-3xl font-semibold" style={{ textWrap: "balance" }}>
          What&apos;s on repeat while I build.
        </h2>
        <FavoriteSong />
      </motion.section>

      {/* Closing CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="wire-rule flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Got something in mind?
        </p>
        <h2 className="max-w-lg font-display text-3xl font-semibold md:text-5xl" style={{ textWrap: "balance" }}>
          Let&apos;s make it <span className="text-accent">happen.</span>
        </h2>
        <Link
          href="/contact"
          className="mt-8 inline-block w-fit rounded-full bg-accent px-7 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          Get In Touch
        </Link>
      </motion.section>

      <Footer />
    </main>
  );
}
