"use client";

import { useEffect, useRef } from "react";

export default function StarField({ count = 120 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width, height, stars, frameId;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.12 + Math.random() * 0.35,
      }));
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;

      stars.forEach((star) => {
        const twinkle = (Math.sin(t * star.speed + star.phase) + 1) / 2;
        const opacity = 0.15 + twinkle * 0.75;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 241, 245, ${opacity})`;
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242, 241, 245, 0.4)";
        ctx.fill();
      });
    }

    function start() {
      resize();
      initStars();
      if (prefersReducedMotion) {
        drawStatic();
      } else {
        frameId = requestAnimationFrame(draw);
      }
    }

    function handleResize() {
      resize();
      initStars();
      if (prefersReducedMotion) drawStatic();
    }

    window.addEventListener("resize", handleResize);
    start();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
      aria-hidden="true"
    />
  );
}