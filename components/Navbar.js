"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/about", label: "About", key: "about" },
  { href: "/#projects", label: "Projects", key: "projects" },
  { href: "/#skills", label: "Skills", key: "skills" },
];

const NAVBAR_OFFSET = -96;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const pathname = usePathname();

  // Keep active state in sync with the current route for page-based links
  useEffect(() => {
    if (pathname === "/about") {
      setActiveKey("about");
    } else if (pathname === "/contact") {
      setActiveKey("contact");
    } else if (pathname === "/") {
      setActiveKey((prev) => (prev === "about" || prev === "contact" ? "home" : prev));
    }
  }, [pathname]);

  // Track which homepage section is in view
  useEffect(() => {
    if (pathname !== "/") return undefined;

    const sectionKeys = ["hero", "projects", "skills"];
    const elements = sectionKeys
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((s) => s.el);

    if (elements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.id === "hero" ? "home" : entry.target.id;
            setActiveKey(key);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  function scrollToTop() {
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function scrollToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(target, { offset: NAVBAR_OFFSET, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleNavClick(e, href) {
    const [path, hash] = href.split("#");
    const targetPath = path || "/";

    setOpen(false);

    if (hash) {
      // Anchor link (Projects / Skills)
      if (pathname === targetPath) {
        // Already on the homepage: scroll directly, never jump to top first
        e.preventDefault();
        scrollToHash(`#${hash}`);
      }
      // If on a different page, let Link navigate normally to "/#hash"
      return;
    }

    // Plain page link (Home / About)
    if (pathname === targetPath) {
      e.preventDefault();
      scrollToTop();
    }
    // Otherwise let Link navigate normally
  }

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20">
      <Link
        href="/"
        onClick={(e) => handleNavClick(e, "/")}
        className="font-mono text-sm font-bold tracking-tight text-ink"
      >
        Edu Nitre
      </Link>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-1 rounded-full border border-line bg-bg-alt/70 p-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`rounded-full px-4 py-2 font-mono text-sm transition-colors ${
                activeKey === link.key
                  ? "bg-ink/10 text-ink"
                  : "text-ink-soft hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          onClick={(e) => handleNavClick(e, "/contact")}
          className="rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          Send a Message
        </Link>

        <ThemeToggle />
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button type="button" aria-label="Toggle menu" className="flex flex-col gap-1.5" onClick={() => setOpen((v) => !v)}>
          <span className="h-0.5 w-6 bg-ink" />
          <span className="h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-line bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-mono text-sm ${activeKey === link.key ? "text-accent" : "text-ink-soft"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={(e) => handleNavClick(e, "/contact")} className="font-mono text-sm text-accent">
                Send a Message
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}