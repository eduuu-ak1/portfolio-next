"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function handleNavClick(e, href) {
    // Strip any hash to compare just the page path
    const targetPath = href.split("#")[0] || "/";

    if (targetPath === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setOpen(false);
    } else {
      setOpen(false);
    }
  }

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 md:px-12 lg:px-20">
      <Link
        href="/"
        onClick={(e) => handleNavClick(e, "/")}
        className="font-mono text-sm font-bold tracking-tight text-ink"
      >
        Edu Demayo Nitre
      </Link>

      <div className="hidden items-center gap-3 md:flex">
        <div className="flex items-center gap-1 rounded-full border border-line bg-bg-alt/70 p-1.5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-full px-4 py-2 font-mono text-sm text-ink-soft transition-colors hover:bg-white/5 hover:text-ink"
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
      </div>

      <button type="button" aria-label="Toggle menu" className="flex flex-col gap-1.5 md:hidden" onClick={() => setOpen((v) => !v)}>
        <span className="h-0.5 w-6 bg-ink" />
        <span className="h-0.5 w-6 bg-ink" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-t border-line bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-mono text-sm text-ink-soft" onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="font-mono text-sm text-accent" onClick={(e) => handleNavClick(e, "/contact")}>
                Send a Message
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}