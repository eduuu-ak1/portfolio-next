"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactOrb from "../../components/ContactOrb";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function ContactPage() {
  const formSectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function scrollToForm() {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((errs) => ({ ...errs, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New message from ${form.name} via portfolio`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = await res.json();

      if (data.success === true) {
        setForm({ name: "", email: "", message: "" });
        setFieldErrors({});
        setStatus("success");
      } else {
        console.error("Web3Forms submission failed:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms network error:", err);
      setStatus("error");
    }
  }

  return (
    <main>
      {/* SECTION A: Hero intro */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 py-24">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center md:text-left"
          >
            <h1 className="mb-3 font-display text-4xl font-bold md:text-6xl">
              Have a project in mind?
            </h1>
            <p className="mb-10 font-serif text-3xl italic text-ink-soft md:text-4xl">
              Let&apos;s talk about it.
            </p>

            <motion.button
              type="button"
              onClick={scrollToForm}
              aria-label="Scroll to contact form"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-bg shadow-lg transition-transform hover:scale-110 md:mx-0"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.button>
          </motion.div>

          <div className="mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
            <ContactOrb />
          </div>
        </div>
      </section>

      {/* SECTION B: Contact form */}
      <section
        ref={formSectionRef}
        className="flex min-h-screen flex-col items-center justify-center border-t border-line px-6 md:px-12 lg:px-20 py-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto w-full max-w-lg text-center"
        >
          <h2 className="mb-3 font-display text-4xl font-bold text-white">
            Send me a message
          </h2>
          <p className="mb-10 text-white/50">
            Have a question or want to work together? Drop me a message!
          </p>

          <form onSubmit={handleSubmit} className="text-left" noValidate>
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink-soft">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-accent focus:outline-none"
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink-soft">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-accent focus:outline-none"
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-wide text-ink-soft">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-white/30 transition-colors focus:border-accent focus:outline-none"
              />
              {fieldErrors.message && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-white px-6 py-3.5 font-mono text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-green-400"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-4 text-center text-sm text-red-400/80"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-10 flex justify-center gap-2">
            <a
              href="https://www.linkedin.com/in/edu-demayo-nitre-314478360/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              in
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
              href="https://www.instagram.com/_godedu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-xs text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              ig
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION C: Closing */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="relative border-t border-line px-6 md:px-12 lg:px-20 py-24"
      >
        <div className="relative mb-16 flex items-center gap-4">
          <img
            src="/profile.png"
            alt="Edu Demayo Nitre"
            className="h-14 w-14 rounded-full border border-line object-cover"
          />
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Let&apos;s create
            <br />
            <span className="font-serif italic font-normal text-ink-soft">
              something real.
            </span>
          </h2>

          <div className="pointer-events-none absolute -right-4 -top-16 hidden h-40 w-40 opacity-70 md:block">
            <ContactOrb scale={0.75} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-bg-alt/60 p-8 backdrop-blur-md md:flex md:items-start md:justify-between md:gap-10">
          <div className="mb-10 max-w-sm md:mb-0">
            <p className="font-serif text-3xl italic text-ink">Edu</p>
            <p className="mt-3 text-sm text-ink-soft">
              Building things that work, one project at a time &mdash;
              automations, web apps, and games, made to actually be useful.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
                General
              </p>
              <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
                <li><a href="/" className="hover:text-accent">Home</a></li>
                <li><a href="/#projects" className="hover:text-accent">Projects</a></li>
                <li><a href="/#skills" className="hover:text-accent">Skills</a></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
                About
              </p>
              <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
                <li><a href="/about" className="hover:text-accent">About Me</a></li>
                <li><a href="/contact" className="hover:text-accent">Contact</a></li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
                Legal
              </p>
              <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
                <li><span className="text-ink-soft/60">Terms &amp; Conditions</span></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-xs text-ink-soft">
          &copy; 2026 Edu Demayo Nitre. Built from scratch.
        </p>
      </motion.section>
    </main>
  );
}