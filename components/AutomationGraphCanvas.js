"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import AutomationGraphFallback from "./AutomationGraphFallback";

const AutomationGraph = dynamic(() => import("./AutomationGraph"), {
  ssr: false,
  loading: AutomationGraphFallback,
});

export default function AutomationGraphCanvas() {
  const containerRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="aspect-square w-full max-w-110">
      {hasEntered ? <AutomationGraph active={inView} /> : <AutomationGraphFallback />}
    </div>
  );
}
