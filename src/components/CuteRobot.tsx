import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Cute glass robot pinned to the bottom-left.
 * - Eyes track the cursor.
 * - Whole body tilts subtly toward the cursor.
 * - Antenna pulses; idle blink.
 * - On hover: waves and shows a little speech bubble.
 */
export function CuteRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pointer in viewport coords
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Robot center (updated on resize/scroll)
  const [center, setCenter] = useState({ x: 0, y: 0 });

  // Eye offsets driven by pointer
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const sEyeX = useSpring(eyeX, { stiffness: 220, damping: 22, mass: 0.4 });
  const sEyeY = useSpring(eyeY, { stiffness: 220, damping: 22, mass: 0.4 });

  // Whole-body tilt
  const tiltY = useTransform(sEyeX, (v) => v * 4); // rotateY
  const tiltX = useTransform(sEyeY, (v) => -v * 3); // rotateX

  const [hover, setHover] = useState(false);
  const [blink, setBlink] = useState(false);

  // Track pointer
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      px.set(e.clientX);
      py.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [px, py]);

  // Track robot center
  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  // Map pointer -> eye offset (-1..1)
  useEffect(() => {
    const unsub = px.on("change", (v) => {
      const dx = v - center.x;
      eyeX.set(Math.max(-1, Math.min(1, dx / 320)));
    });
    const unsub2 = py.on("change", (v) => {
      const dy = v - center.y;
      eyeY.set(Math.max(-1, Math.min(1, dy / 260)));
    });
    return () => {
      unsub();
      unsub2();
    };
  }, [center, px, py, eyeX, eyeY]);

  // Idle blink
  useEffect(() => {
    let timeout: number;
    const loop = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
      timeout = window.setTimeout(loop, 2600 + Math.random() * 2200);
    };
    timeout = window.setTimeout(loop, 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  // Eye pupil translate values
  const pupilX = useTransform(sEyeX, (v) => v * 4);
  const pupilY = useTransform(sEyeY, (v) => v * 3);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto fixed left-4 sm:left-6 bottom-4 sm:bottom-6 z-[70] hidden md:block select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-hidden
    >
      {/* Speech bubble */}
      <motion.div
        initial={false}
        animate={{
          opacity: hover ? 1 : 0,
          y: hover ? 0 : 8,
          scale: hover ? 1 : 0.92,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap glass-strong rounded-full px-3 py-1.5 text-[11px] font-medium text-foreground/90"
      >
        こんにちは、案内ボットです
      </motion.div>

      {/* Glow */}
      <div className="absolute inset-0 -z-10 blur-2xl bg-yellow/30 rounded-full opacity-60" />

      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 600,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <svg
          width="92"
          height="110"
          viewBox="0 0 92 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_8px_24px_hsl(0_0%_0%/0.6)]"
        >
          {/* Antenna */}
          <line x1="46" y1="6" x2="46" y2="18" stroke="hsl(0 0% 100%)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="5" r="3.5" fill="hsl(0 0% 100%)">
            <animate attributeName="r" values="3;4.2;3" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="1.6s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <rect
            x="14"
            y="18"
            width="64"
            height="52"
            rx="16"
            fill="hsl(0 0% 100% / 0.08)"
            stroke="hsl(0 0% 100% / 0.22)"
            strokeWidth="1"
          />
          {/* Head highlight */}
          <rect x="14" y="18" width="64" height="22" rx="16" fill="hsl(0 0% 100% / 0.06)" />

          {/* Cheek lights */}
          <circle cx="20" cy="50" r="2" fill="hsl(0 0% 100%)" opacity="0.85" />
          <circle cx="72" cy="50" r="2" fill="hsl(0 0% 100%)" opacity="0.85" />

          {/* Eyes - glass sockets */}
          <g>
            <circle cx="33" cy="42" r="9" fill="hsl(0 0% 0% / 0.55)" stroke="hsl(0 0% 100% / 0.18)" />
            <circle cx="59" cy="42" r="9" fill="hsl(0 0% 0% / 0.55)" stroke="hsl(0 0% 100% / 0.18)" />
          </g>

          {/* Pupils (translate via framer-motion) */}
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx="33" cy="42" r={blink ? 0.4 : 3.6} fill="hsl(0 0% 100%)">
              {!blink && (
                <animate attributeName="opacity" values="1;0.85;1" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="59" cy="42" r={blink ? 0.4 : 3.6} fill="hsl(0 0% 100%)" />
            {/* Sparkle */}
            <circle cx="34.5" cy="40.5" r="1" fill="white" opacity="0.9" />
            <circle cx="60.5" cy="40.5" r="1" fill="white" opacity="0.9" />
          </motion.g>

          {/* Eyelids when blinking */}
          {blink && (
            <>
              <rect x="24" y="40" width="18" height="6" rx="3" fill="hsl(0 0% 100% / 0.18)" />
              <rect x="50" y="40" width="18" height="6" rx="3" fill="hsl(0 0% 100% / 0.18)" />
            </>
          )}

          {/* Mouth */}
          <motion.path
            d={hover ? "M36 60 Q46 68 56 60" : "M38 60 Q46 64 54 60"}
            stroke="hsl(0 0% 100%)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={false}
            animate={{ pathLength: 1 }}
          />

          {/* Neck */}
          <rect x="40" y="70" width="12" height="6" rx="2" fill="hsl(0 0% 100% / 0.12)" />

          {/* Body */}
          <rect
            x="20"
            y="76"
            width="52"
            height="28"
            rx="12"
            fill="hsl(0 0% 100% / 0.08)"
            stroke="hsl(0 0% 100% / 0.2)"
          />
          <circle cx="46" cy="90" r="4" fill="hsl(0 0% 100%)" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Left arm (static) */}
          <rect x="10" y="80" width="8" height="18" rx="4" fill="hsl(0 0% 100% / 0.1)" stroke="hsl(0 0% 100% / 0.2)" />

          {/* Right arm (waves on hover) */}
          <motion.g
            style={{ originX: "74px", originY: "82px" }}
            animate={
              hover
                ? { rotate: [0, -35, 10, -35, 0] }
                : { rotate: 0 }
            }
            transition={
              hover
                ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            <rect
              x="74"
              y="80"
              width="8"
              height="18"
              rx="4"
              fill="hsl(0 0% 100% / 0.1)"
              stroke="hsl(0 0% 100% / 0.2)"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
