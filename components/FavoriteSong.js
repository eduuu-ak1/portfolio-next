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

export default function FavoriteSong() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="mx-auto max-w-7xl border-t border-line px-6 py-20"
    >
      <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent">
        Off the Clock
      </p>
      <h2 className="mb-10 font-display text-4xl font-bold md:text-6xl">
        On <span className="font-serif italic font-normal text-ink-soft">repeat</span> lately
      </h2>

      <div className="overflow-hidden rounded-2xl border border-line bg-bg-alt md:flex">
        <div className="relative aspect-square w-full md:w-56">
          <img
            src="/cinderella-poster.png"
            alt="Cinderella by Mac Miller and Ty Dolla $ign"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center p-7">
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_theme(colors.green.400)]" />
            Favorite Song
          </span>

          <h3 className="mb-1 font-display text-2xl font-bold">Cinderella</h3>
          <p className="mb-5 text-sm text-ink-soft">
            Mac Miller, Ty Dolla $ign
          </p>

          <a
            href="https://open.spotify.com/search/Cinderella%20Mac%20Miller%20Ty%20Dolla%20Sign"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Listen on Spotify &rarr;
          </a>
        </div>
      </div>
    </motion.section>
  );
}