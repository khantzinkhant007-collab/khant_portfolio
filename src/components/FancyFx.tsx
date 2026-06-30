import { useEffect, useRef, type ReactNode } from "react";

/* ---------- Scroll progress bar (top) ---------- */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" />;
}

/* ---------- Cursor spotlight (desktop only) ---------- */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = ref.current;
    if (!spot) return;

    let frame = 0;
    let x = -500;
    let y = -500;

    const update = () => {
      frame = 0;
      spot.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`;
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-spotlight" />;
}

/* ---------- Aurora animated background ---------- */
export function Aurora() {
  return (
    <div aria-hidden className="aurora-bg" />
  );
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`inline-block ${className}`}>{children}</div>;
}

/* ---------- 3D Tilt card (mouse parallax) ---------- */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
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
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {row.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="glass rounded-full px-4 py-2 text-sm whitespace-nowrap hover:border-yellow/40 hover:text-yellow transition-colors"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
