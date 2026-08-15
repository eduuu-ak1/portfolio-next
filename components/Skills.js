"use client";

import { motion } from "framer-motion";
import SkillsCenterpiece from "./SkillsCenterpiece";

const ALL_SKILLS = [
  "React.js", "Node.js", "JavaScript", "HTML/CSS", "n8n",
  "Google Gemini", "Claude AI", "Godot Engine", "GDScript", "Docker",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="flex min-h-screen scroll-mt-24 flex-col items-center justify-center px-6 md:px-12 lg:px-20 py-24 text-center"
    >
      <p className="mb-2 font-mono text-sm uppercase tracking-widest text-ink-soft">
        My Skillset
      </p>
      <h2 className="mb-4 font-display text-4xl font-bold md:text-6xl">
        The Magic <span className="text-ink-soft">Behind</span>
      </h2>

      <div className="mx-auto h-[500px] w-[500px] max-w-full md:h-[600px] md:w-[600px]">
        <SkillsCenterpiece />
      </div>

      <p className="mb-6 mt-4 font-mono text-sm uppercase tracking-widest text-ink-soft">
        The Tools I Use
      </p>

      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3">
        {ALL_SKILLS.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-line bg-bg-alt px-4 py-2 font-mono text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-xl font-mono text-xs text-ink-soft">
        Also: Data Entry &amp; Document Management, Video Editing, Graphic
        Design, UI/UX Design
      </p>
    </motion.section>
  );
}