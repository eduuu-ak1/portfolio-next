"use client";

import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";

const PROJECTS = [
  {
    title: "Notely",
    description:
      "Upload a video or PDF (up to 200MB), and Gemini AI reads or watches it, then generates structured notes: headings by topic, bullet takeaways, definitions, warnings/tips, action items, and a summary.",
    techStack: ["React + Vite", "Node.js / Express", "Google Gemini API", "Docker"],
    images: ["/projects/notely.png"],
    projectUrl: "https://notely-edu.vercel.app/",
  },
  {
    title: "Tower of Knowledge",
    description:
      "A 2D platformer built in Godot Engine that teaches ICT fundamentals through hands-on, level-based challenges. Built end-to-end solo: mechanics, level design, UI, and content. A Top 5 Capstone Project.",
    techStack: ["Godot Engine", "GDScript", "2D Game Design"],
    images: ["/projects/tower-of-knowledge.gif"],
  },
  {
    title: "Lead Qualification & Booking Automation",
    description:
      "An n8n workflow that captures incoming leads, qualifies them automatically, and books them directly into a calendar via Cal.com, removing manual back-and-forth from the intake process.",
    techStack: ["n8n", "Webhook APIs", "CRM Automation"],
    images: ["/projects/lead-qualification-automation.png"],
  },
  {
    title: "AI Customer Support Automation",
    description:
      "Monitors incoming email and contact form submissions, uses AI to classify inquiries as Simple or Complex, auto-replies to simple ones, and escalates complex cases to the business owner with a structured intake form.",
    techStack: ["n8n", "Gmail", "OpenAI", "AI Agents"],
    images: ["/projects/email-support-automation.png"],
  },
  {
    title: "Follow-Up Sequence Automation",
    description:
      "An automated follow-up messaging sequence that keeps leads and clients engaged after first contact, triggered and tracked without manual intervention.",
    techStack: ["n8n", "Workflow Automation", "Google Sheets"],
    images: ["/projects/followup-automation.png"],
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
        className="mb-2 font-mono text-sm uppercase tracking-widest text-accent"
      >
        &gt; Featured Work
      </motion.p>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mb-4 font-display text-4xl font-bold md:text-6xl"
      >
        Projects
      </motion.h2>

      <div>
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.title} {...project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}