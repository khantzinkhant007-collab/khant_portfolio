import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

/* ---------- Scroll progress bar (top) ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-gradient-to-r from-yellow via-yellow-soft to-yellow shadow-[0_0_12px_hsl(48_100%_56%/0.7)]"
    />
  );
}

/* ---------- Cursor spotlight (desktop only) ---------- */
export function CursorSpotlight() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  const bg = useTransform(
    [sx, sy],
    ([lx, ly]: number[]) =>
      `radial-gradient(420px circle at ${lx}px ${ly}px, hsl(48 100% 56% / 0.12), transparent 60%)`
  );

  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block mix-blend-screen"
    />
  );
}

/* ---------- Aurora animated background ---------- */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div
        className="absolute -top-1/3 left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-yellow/10 blur-[140px]"
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-1/4 h-[55vmax] w-[55vmax] rounded-full bg-white/[0.04] blur-[140px]"
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 h-[45vmax] w-[45vmax] rounded-full bg-yellow/[0.06] blur-[120px]"
        animate={{ x: [0, 40, -60, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({
  children,
  className = "",
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- 3D Tilt card (mouse parallax) ---------- */
export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    setGlow({ x: px * 100, y: py * 100, on: true });
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setGlow((g) => ({ ...g, on: false }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glow.on ? 1 : 0,
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, hsl(48 100% 56% / 0.18), transparent 50%)`,
        }}
      />
    </motion.div>
  );
}

/* ---------- Marquee row ---------- */
export function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden py-2"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {row.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="glass rounded-full px-4 py-2 text-sm whitespace-nowrap hover:border-yellow/40 hover:text-yellow transition-colors"
          >
            {it}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
