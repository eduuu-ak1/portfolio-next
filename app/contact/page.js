"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/Footer";

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
      <section className="flex min-h-[70vh] flex-col justify-center px-6 md:px-12 lg:px-20 py-32">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
          <p className="wire-node mb-4 font-mono text-xs uppercase tracking-[0.2em] text-wire">
            Get in touch
          </p>
          <h1
            className="font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
            style={{ textWrap: "balance" }}
          >
            What&apos;s still being done by hand?
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Tell me what it is and where it slows things down &mdash; I&apos;ll
            reply with whether it&apos;s worth automating and what that would
            take.
          </p>
        </motion.div>
      </section>

      <section className="wire-rule flex flex-col items-center px-6 md:px-12 lg:px-20 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mx-auto w-full max-w-lg"
        >
          <form onSubmit={handleSubmit} noValidate>
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
                className={`w-full rounded-lg border bg-bg-alt px-4 py-3 text-ink placeholder-ink-faint transition-colors focus:border-accent focus:outline-none ${fieldErrors.name ? "border-ink" : "border-line"}`}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs font-semibold text-ink">{fieldErrors.name}</p>
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
                className={`w-full rounded-lg border bg-bg-alt px-4 py-3 text-ink placeholder-ink-faint transition-colors focus:border-accent focus:outline-none ${fieldErrors.email ? "border-ink" : "border-line"}`}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs font-semibold text-ink">{fieldErrors.email}</p>
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
                className={`w-full resize-none rounded-lg border bg-bg-alt px-4 py-3 text-ink placeholder-ink-faint transition-colors focus:border-accent focus:outline-none ${fieldErrors.message ? "border-ink" : "border-line"}`}
              />
              {fieldErrors.message && (
                <p className="mt-1.5 text-xs font-semibold text-ink">{fieldErrors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-accent px-6 py-3.5 font-mono text-sm font-semibold text-bg transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink"
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
                  className="mt-4 text-center text-sm font-semibold text-ink"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-10 flex justify-center gap-4 font-mono text-xs uppercase tracking-wide text-ink-soft">
            <a href="mailto:edunitre24@gmail.com" className="hover:text-accent">Email</a>
            <span className="text-line">/</span>
            <a href="https://www.linkedin.com/in/edu-demayo-nitre-314478360/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
            <span className="text-line">/</span>
            <a href="https://github.com/eduuu-ak1" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
