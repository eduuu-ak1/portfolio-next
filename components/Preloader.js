"use client";

import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 900;
const MAX_DISPLAY_MS = 2500;
const FADE_MS = 500;

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const safetyTimeout = new Promise((resolve) => setTimeout(resolve, MAX_DISPLAY_MS));

    Promise.race([fontsReady, safetyTimeout]).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setLeaving(true);
        setTimeout(() => setVisible(false), FADE_MS);
      }, remaining);
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-bg transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="sr-only">Loading</span>
      <p aria-hidden="true" className="font-display text-2xl font-semibold tracking-tight text-ink">
        Edu<span className="animate-pulse">_</span>
      </p>
      <div aria-hidden="true" className="mt-6 h-px w-24 overflow-hidden bg-line">
        <div className="h-full w-full origin-left scale-x-0 bg-ink animate-[preloader-fill_0.9s_ease-out_forwards]" />
      </div>
    </div>
  );
}
