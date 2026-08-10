"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { HeroOrb } from "@/components/hero/HeroOrb";

type HeroCanvasProps = {
  className?: string;
};

/**
 * Hero-only WebGL canvas. Pauses when off-screen or when reduced motion / mobile.
 * Decorative only — aria-hidden on the host.
 */
export function HeroCanvas({ className }: HeroCanvasProps) {
  const host = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [allow3d, setAllow3d] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setAllow3d(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = allow3d && inView;

  if (reduce || !allow3d) {
    return (
      <div
        ref={host}
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(196,212,204,0.12), transparent 65%)",
        }}
      />
    );
  }

  return (
    <div ref={host} className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        frameloop={running ? "always" : "never"}
        style={{ width: "100%", height: "100%", display: "block" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <HeroOrb active={running} />
        </Suspense>
      </Canvas>
    </div>
  );
}
