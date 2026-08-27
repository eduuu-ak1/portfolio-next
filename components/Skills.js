"use client";

import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    label: "Automation",
    note: "The layer that replaces the manual work",
    skills: ["n8n", "Webhook APIs & Integrations", "Workflow Design", "Cal.com / CRM Automation"],
  },
  {
    label: "AI Integration",
    note: "What actually reads, decides, and replies",
    skills: ["Google Gemini API", "Anthropic API", "AI Agents", "OpenAI"],
  },
  {
    label: "Full-Stack Delivery",
    note: "For the dashboard or UI wrapped around it",
    skills: ["React / Next.js", "Node.js / Express"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Skills() {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="wire-rule scroll-mt-24 px-6 py-24 md:px-12 lg:px-20"
    >
      <p className="wire-node mb-3 font-mono text-xs uppercase tracking-[0.2em] text-wire">
        What I bring
      </p>
      <h2 className="max-w-xl font-display text-3xl font-semibold md:text-5xl" style={{ textWrap: "balance" }}>
        The stack behind it.
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3"
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div
            key={group.label}
            variants={fadeUp}
            className="flex flex-col gap-6 bg-bg-alt p-8"
          >
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
                {group.label}
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">{group.note}</p>
            </div>

            <ul className="flex flex-col gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-sm text-ink border-t border-line pt-3 first:border-t-0 first:pt-0"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
