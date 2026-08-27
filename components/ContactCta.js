"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactCta() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="wire-rule px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-ink-soft">
            <span className="signal-dot" />
            Available for contract work
          </p>
          <h2 className="max-w-lg font-display text-3xl font-semibold md:text-4xl" style={{ textWrap: "balance" }}>
            Got a process that&apos;s still done by hand?
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">
            Tell me what&apos;s eating your team&apos;s time &mdash; I&apos;ll
            tell you honestly whether it&apos;s worth automating.
          </p>
        </div>

        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-accent px-7 py-3.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          Let&apos;s automate it &rarr;
        </Link>
      </div>
    </motion.section>
  );
}
