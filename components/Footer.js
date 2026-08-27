import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="w-full px-6 md:px-12 lg:px-20 py-14 md:flex md:items-start md:justify-between md:gap-10">
        <div className="mb-10 max-w-sm md:mb-0">
          <p className="font-display text-xl font-semibold text-ink">Edu Nitre</p>
          <p className="mt-3 text-base text-ink-soft">
            AI automation and full-stack systems for small and service-based
            businesses &mdash; built to run without you watching them.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-ink-soft">
              Navigate
            </p>
            <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="/#projects" className="hover:text-accent">Projects</Link></li>
              <li><Link href="/#skills" className="hover:text-accent">Skills</Link></li>
              <li><Link href="/about" className="hover:text-accent">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-ink-soft">
              Connect
            </p>
            <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
              <li><a href="mailto:edunitre24@gmail.com" className="hover:text-accent">Email</a></li>
              <li><Link href="/contact" className="hover:text-accent">Send a Message</Link></li>
              <li><a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Resume</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-widest text-ink-soft">
              Elsewhere
            </p>
            <ul className="flex flex-col gap-2 font-mono text-sm text-ink-soft">
              <li><a href="https://www.linkedin.com/in/edu-demayo-nitre-314478360/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a></li>
              <li><a href="https://github.com/eduuu-ak1" target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="border-t border-line px-6 md:px-12 lg:px-20 py-5 text-center font-mono text-xs text-ink-soft">
        &copy; 2026 Edu Nitre. Built from scratch.
      </p>
    </footer>
  );
}
