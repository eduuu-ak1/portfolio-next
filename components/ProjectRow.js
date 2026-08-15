"use client";

import { useId } from "react";
import { motion } from "framer-motion";

export default function ProjectRow({
  title,
  description,
  techStack,
  images,
  projectUrl,
  reverse = false,
}) {
  const pathId = useId();
  const frontImage = images?.[0];
  const backImage = images?.[1] || images?.[0];

  const textVariants = {
    hidden: { opacity: 0, x: reverse ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 },
    },
  };

  return (
    <div className="border-t border-white/5 py-24 md:py-32">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        {/* Text column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={textVariants}
          className={reverse ? "md:order-2" : "md:order-1"}
        >
          <h3 className="mb-4 font-serif text-4xl italic text-ink">
            {title}
          </h3>
          <p className="mb-6 max-w-md text-white/60">{description}</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-ink-soft"
              >
                {tech}
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
          <div className="relative aspect-video w-full">
            {/* Back card */}
            {backImage && (
              <img
                src={backImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full -translate-x-8 -translate-y-4 rounded-2xl border border-white/10 object-cover opacity-50 shadow-xl"
              />
            )}

            {/* Front card */}
            <img
              src={frontImage}
              alt={title}
              className="absolute inset-0 h-full w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
            />

            {/* Rotating "visit project" button */}
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title}`}
                className="absolute -right-6 -top-6 h-28 w-28 md:h-32 md:w-32"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                      <path
                        id={pathId}
                        d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                        fill="none"
                      />
                    </defs>
                    <text
                      fontSize="7.5"
                      className="fill-ink font-mono uppercase tracking-wider"
                    >
                      <textPath href={`#${pathId}`}>
                        Visit Project &bull; Visit Project &bull;{" "}
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-accent text-bg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}