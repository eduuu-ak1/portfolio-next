"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Bento() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="flex min-h-screen flex-col justify-center px-6 md:px-12 lg:px-20 py-16"
    >
      <div className="mb-8 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft">
          <span aria-hidden="true">📍</span> Based in General Santos City, PH
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-ink-soft">
          Web Dev &amp; Automation
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.8fr_1.4fr_1fr] md:items-stretch">
        {/* Profile card */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-bg-alt p-7">
          <div>
            <p className="font-display text-xl font-bold">
              Edu <em className="italic text-accent">Nitre</em>
            </p>
            <p className="mt-1 font-mono text-xs text-ink-soft">
              General Santos City, PH
            </p>
          </div>

          <div className="cube-scene my-8 flex justify-center">
            <div className="cube">
              <div className="cube-face cube-face-front" />
              <div className="cube-face cube-face-back" />
              <div className="cube-face cube-face-right" />
              <div className="cube-face cube-face-left" />
              <div className="cube-face cube-face-top" />
              <div className="cube-face cube-face-bottom" />
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="https://www.linkedin.com/in/edu-demayo-nitre-314478360/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              in
            </a>
            <a
              href="https://www.facebook.com/edu.nitre.35"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              fb
            </a>
            <a
              href="https://www.instagram.com/_godedu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              ig
            </a>
          </div>
        </div>

        {/* Philosophy card */}
        <div className="rounded-2xl border border-line bg-bg-alt p-7">
          <div className="mb-5 flex items-center justify-between">
            <span className="font-mono text-sm uppercase tracking-widest text-ink-soft">
              Detail-driven builds
            </span>
            <span className="font-mono text-sm uppercase tracking-widest text-ink-soft opacity-60">
              Philosophy
            </span>
          </div>

          <h3 className="mb-5 font-display text-2xl font-bold md:text-3xl">
            Code <em className="italic text-accent">you can trust.</em>
          </h3>

          <div className="mb-4 flex flex-wrap gap-2">
            {["Automation", "Design", "Reliability", "Craft"].map((pill, i) => (
              <span
                key={pill}
                className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
                  i === 2
                    ? "border-accent text-accent"
                    : "border-line text-ink-soft"
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          <p className="max-w-md text-base text-ink-soft">
            I care about the small stuff &mdash; clean logic, clear UI states,
            and things that don&apos;t break when someone actually uses them.
          </p>
        </div>

        {/* CTA card */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-bg-alt p-7">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_theme(colors.green.400)]" />
            Available
          </span>

          <h3 className="my-6 font-display text-2xl font-bold md:text-3xl">
            Let&apos;s build
            <br />
            <em className="italic text-accent">something real.</em>
          </h3>

          <a
            href="#contact"
            className="w-fit rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Connect Now &rarr;
          </a>
        </div>
      </div>
    </motion.section>
  );
}