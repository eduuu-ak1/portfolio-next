"use client";

import { useEffect, useState } from "react";

const MIN_DISPLAY_MS = 900;
const MAX_DISPLAY_MS = 2500;
const FADE_MS = 500;
const PIPELINE_CYCLE_S = 1.4;
const NODE_COUNT = 4;
const STEP_DELAY_S = PIPELINE_CYCLE_S / (NODE_COUNT + 1);

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
      <div aria-hidden="true" className="mt-7 flex items-center">
        {Array.from({ length: NODE_COUNT }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span
              className="h-2 w-2 rounded-full bg-line animate-[preloader-node_1.4s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * STEP_DELAY_S}s` }}
            />
            {i < NODE_COUNT - 1 && (
              <span
                className="h-px w-6 bg-line animate-[preloader-line_1.4s_ease-in-out_infinite]"
                style={{ animationDelay: `${(i + 0.5) * STEP_DELAY_S}s` }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
