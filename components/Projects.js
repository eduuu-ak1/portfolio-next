"use client";

import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";

const PROJECTS = [
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
    title: "Turning Cold Leads Into Booked Calls, Unattended",
    problem:
      "Leads were qualified by hand and booked over email back-and-forth — the slower that took, the more leads went cold.",
    bullets: [
      "n8n workflow captures every incoming lead the moment it arrives and runs it through automated qualification rules",
      "Qualified leads book straight into the calendar through Cal.com, no scheduling emails",
      "Cuts a multi-step manual intake process down to one pipeline that runs itself",
    ],
    tools: ["n8n", "Webhook APIs", "Cal.com", "CRM Automation"],
    image: "/projects/lead-qualification-automation.png",
  },
  {
    title: "Keeping Leads Warm When Nobody's Watching the Pipeline",
    problem:
      "Follow-up only happened if someone remembered to send it — most leads never got a second touch.",
    bullets: [
      "Built a multi-step follow-up sequence that triggers automatically on first contact",
      "Tracks every lead's timing and engagement in Google Sheets, no spreadsheet upkeep required",
      "Runs on schedule with zero manual intervention, so no lead goes quiet by accident",
    ],
    tools: ["n8n", "Google Sheets", "Workflow Automation"],
    image: "/projects/followup-automation.png",
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
        Selected automation work
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
