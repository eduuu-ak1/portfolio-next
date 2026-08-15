"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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

      if (data.success) {
        setForm({ name: "", email: "", message: "" });
        setFieldErrors({});
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
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
  );
}