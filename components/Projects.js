"use client";

import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";

const PROJECTS = [
  {
    title: "Turning a Video or PDF Into Study-Ready Notes",
    problem:
      "Long lecture videos and dense PDFs take real time to sit through before you get anything usable out of them.",
    bullets: [
      "Upload a video or PDF up to 200MB and Gemini reads or watches the whole thing",
      "Generates structured notes: headings by topic, bullet takeaways, definitions, and action items",
      "Built solo end-to-end with React, Node, and the Gemini API — live in production",
    ],
    tools: ["React", "Node.js / Express", "Google Gemini API", "Docker"],
    image: "/projects/notely.png",
    projectUrl: "https://notely-edu.vercel.app/",
  },
  {
    title: "Cutting Support Response Time From Hours to Seconds",
    problem:
      "Every inbound email and web inquiry needed a human to read it, decide what it was, and answer — even the easy ones.",
    bullets: [
      "Built an n8n pipeline that reads every Gmail and contact-form message and classifies it Simple or Complex with an AI agent",
      "Simple requests get an accurate reply within seconds, no human touch required",
      "Complex cases escalate straight to the owner with a structured intake already filled in",
    ],
    tools: ["n8n", "Gmail API", "OpenAI", "AI Agents"],
    image: "/projects/email-support-automation.png",
  },
  {
    title: "MOTIV8",
    problem: "Case study in progress — full write-up coming soon.",
    bullets: [
      "A React Native habit tracker, built with Expo",
      "Problem statement, results, and screenshots to follow",
    ],
    tools: ["React Native", "Expo"],
    comingSoon: true,
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

export default function Projects() {
  return (
    <section id="projects" className="w-full scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="wire-node mb-3 font-mono text-xs uppercase tracking-[0.2em] text-wire"
      >
        Selected work
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="max-w-2xl font-display text-3xl font-semibold md:text-5xl"
        style={{ textWrap: "balance" }}
      >
        Built to run without me.
      </motion.h2>

      <div className="mt-4">
        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.title}
            index={`0${i + 1} / 0${PROJECTS.length}`}
            {...project}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
