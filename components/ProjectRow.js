"use client";

import { motion } from "framer-motion";

export default function ProjectRow({
  index,
  title,
  problem,
  bullets,
  tools,
  image,
  projectUrl,
  comingSoon = false,
  mobile = false,
  imageAspect = "aspect-9/19.5",
  reverse = false,
}) {
  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
    },
  };

  return (
    <div className="wire-rule py-20 md:py-28">
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint">
        {index}
      </p>

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.15fr] md:gap-16">
        {/* Text column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={textVariants}
          className={reverse ? "md:order-2" : "md:order-1"}
        >
          <h3 className="mb-4 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl" style={{ textWrap: "balance" }}>
            {title}
          </h3>
          <p className="mb-6 max-w-md text-ink-soft">{problem}</p>

          <ul className="mb-7 flex flex-col gap-2.5">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-sm text-ink-soft">
                <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-wire" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line bg-bg-alt px-3 py-1 font-mono text-xs text-ink-soft"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
          className={`relative ${reverse ? "md:order-1" : "md:order-2"}`}
        >
          {mobile ? (
            <div className="mx-auto w-full max-w-55 overflow-hidden rounded-[2.25rem] border-[6px] border-line bg-bg-alt shadow-2xl">
              <div className={`relative ${imageAspect} w-full`}>
                <span className="absolute left-1/2 top-2 z-10 h-1.5 w-14 -translate-x-1/2 rounded-full bg-line" />
                {comingSoon ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
                    <span className="h-2 w-2 rounded-full bg-wire" />
                    <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                      Screenshot coming soon
                    </p>
                  </div>
                ) : (
                  <img
                    src={image}
                    alt={`${title} — screenshot`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          ) : comingSoon ? (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-bg-alt text-center">
              <span className="h-2 w-2 rounded-full bg-wire" />
              <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                Screenshot coming soon
              </p>
            </div>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg-alt shadow-2xl">
              <img
                src={image}
                alt={`${title} — screenshot`}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-wire transition-colors hover:text-accent"
            >
              View workflow
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
