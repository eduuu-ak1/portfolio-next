"use client";

import { useEffect, useMemo, useState } from "react";

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => {
    const isBright = Math.random() < 0.15; // ~15% brighter stars
    const isBlueTint = Math.random() < 0.12; // rare faint blue tint

    return {
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: isBright ? 2 + Math.random() * 1 : 1 + Math.random() * 1,
      baseOpacity: isBright ? 0.7 + Math.random() * 0.3 : 0.3 + Math.random() * 0.2,
      duration: 2 + Math.random() * 3, // 2s - 5s
      delay: Math.random() * 5,
      isBright,
      color: isBlueTint ? "#cfe3ea" : "#ffffff",
    };
  });
}

export default function Starfield() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);

    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stars = useMemo(() => {
    const count = isMobile ? 90 : 170;
    return generateStars(count);
  }, [isMobile]);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-bg"
      aria-hidden="true"
    >
      <div className="starfield-layer absolute inset-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star-dot"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              "--star-min-opacity": star.baseOpacity * 0.5,
              "--star-max-opacity": star.baseOpacity,
              boxShadow: star.isBright
                ? `0 0 4px 1px rgba(255, 255, 255, 0.6)`
                : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}