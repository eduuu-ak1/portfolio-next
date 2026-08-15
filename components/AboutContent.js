"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import RingedPlanet from "./RingedPlanet";
import PlanetScene from "./PlanetScene";
import Footer from "./Footer";

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
      {/* Intro: cursive "About me" background + "who i am" */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 py-20 text-center"
      >
        <h1 className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center font-hand text-[20vw] leading-none text-white opacity-[0.07] md:text-[16vw]">
          About me
        </h1>

        <div className="relative z-10">
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-white/40">
            Get to know more about
          </p>
          <p className="font-serif text-6xl italic text-ink md:text-7xl">
            who i am.
          </p>
        </div>
      </motion.section>

      {/* Section 2: Bio + layered photo + stats + resume + socials */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="grid min-h-screen grid-cols-1 items-center gap-14 border-t border-line px-6 md:px-12 lg:px-20 py-20 md:grid-cols-[3fr_2fr] md:py-28"
      >
        <div>
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            A Little About Me
          </p>
          <h2 className="mb-6 font-display text-4xl font-bold md:text-5xl">
            Nice to meet you.
            <br />
            I&apos;m <span className="font-serif italic font-normal text-ink-soft">Edu</span>
          </h2>

          <p className="mb-4 max-w-lg text-base text-ink-soft">
            I&apos;m a BSIT graduate of STI College General Santos City with a
            habit of picking up new tools and turning them into finished
            projects.
          </p>
          <p className="mb-8 max-w-lg text-base text-ink-soft">
            My path started in game development, moved through document and
            data work, and is now heading toward AI, automation, and web
            development. I care most about building things that actually
            work &mdash; and I&apos;m always down to learn whatever the next
            project needs.
          </p>

          {/* Stat callouts */}
          <div className="mb-8 grid grid-cols-3 gap-6 border-y border-line py-6">
            <div>
              <p className="font-display text-3xl font-bold text-accent">5</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                Projects Shipped
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-accent">Top 5</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                Capstone Ranking
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-accent">&apos;26</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
                BSIT Graduate
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              View Resume
            </a>

            <div className="flex gap-2">
              <a
                href="https://www.instagram.com/_godedu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                ig
              </a>
              <a
                href="https://www.facebook.com/edu.nitre.35"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                fb
              </a>
              <a
                href="https://www.linkedin.com/in/edu-demayo-nitre-314478360/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Layered, rotated photo card */}
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-0 -rotate-3 rounded-2xl border border-accent/40 bg-accent/5" />

          <div className="group relative aspect-[4/5] w-full rotate-2 overflow-hidden rounded-2xl border border-line bg-bg-alt shadow-2xl transition-transform duration-300 hover:rotate-0">
            <img
              src="/aboutme.png"
              alt="Edu Demayo Nitre"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src="/profile.png"
              alt="Edu Demayo Nitre"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rotate-[-4deg] rounded-full border border-line bg-bg px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft shadow-lg">
            General Santos City, PH
          </div>
        </div>
      </motion.section>

      {/* GitHub + Favorite Song cards */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="flex min-h-screen flex-col justify-center border-t border-line px-6 md:px-12 lg:px-20 py-20"
      >
        <p className="mb-2 text-center font-mono text-sm uppercase tracking-widest text-accent">
          More About Me
        </p>
        <h2 className="mb-10 text-center font-display text-4xl font-bold md:text-6xl">
          Beyond the <span className="font-serif italic font-normal text-ink-soft">code</span>
        </h2>

        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1fr_170px_1fr]">
          {/* GitHub card */}
          <div className="relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-line p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-bg-alt via-bg-alt to-bg" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:26px_26px]" />

            <div className="relative">
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase text-ink-soft backdrop-blur">
                On GitHub
              </span>
              <p className="mb-1 font-display text-2xl font-bold">
                Edu&apos;s GitHub
              </p>
              <p className="mb-4 max-w-sm text-sm text-ink-soft">
                Where the code lives &mdash; projects, experiments, and
                whatever I&apos;m currently learning.
              </p>
              <a
                href="https://github.com/eduuu-ak1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                View GitHub &rarr;
              </a>
            </div>
          </div>

          {/* Small planet, between the two cards */}
          <div className="hidden h-40 w-40 md:block">
            <PlanetScene />
          </div>

          {/* Favorite Song card */}
          <div className="relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-line p-6">
            <img
              src="/cinderella-poster.png"
              alt="Cinderella by Mac Miller and Ty Dolla $ign"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative">
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_theme(colors.green.400)]" />
                On Repeat
              </span>
              <p className="font-display text-2xl font-bold text-white">
                Cinderella
              </p>
              <p className="mb-4 text-sm text-white/70">
                Mac Miller, Ty Dolla $ign
              </p>
              <a
                href="https://open.spotify.com/search/Cinderella%20Mac%20Miller%20Ty%20Dolla%20Sign"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-full bg-white px-5 py-2.5 font-mono text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                Listen on Spotify &rarr;
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Closing CTA with shiny star */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative flex min-h-screen flex-col justify-center border-t border-line px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="pointer-events-none absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 opacity-80 md:h-72 md:w-72">
          <RingedPlanet />
        </div>

        <div className="relative max-w-lg">
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-ink-soft">
            Got something in mind?
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Let&apos;s make it{" "}
            <span className="font-serif italic font-normal text-accent">
              happen.
            </span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Get In Touch
          </Link>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}