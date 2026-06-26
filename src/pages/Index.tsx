import { useEffect, useState, type ReactNode } from "react";
import {
  Github,
  Mail,
  MapPin,
  GraduationCap,
  Languages,
  Briefcase,
  ArrowUpRight,
  Copy,
  Check,
  Code2,
  Database,
  Wrench,
  Sparkles,
  BookOpen,
  Layers,
  ExternalLink,
} from "lucide-react";
import { TypingText } from "@/components/TypingText";
import { useReveal } from "@/hooks/use-reveal";
import { toast } from "sonner";
import {
  Aurora,
  CursorSpotlight,
  Magnetic,
  Marquee,
  ScrollProgress,
  TiltCard,
} from "@/components/FancyFx";
import { CuteRobot } from "@/components/CuteRobot";
import { motion } from "framer-motion";

/* ---------- Reusable Reveal Wrapper ---------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Navigation ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#goals", label: "Goals" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 animate-fade-in">
      <nav
        className={`glass-nav rounded-full px-4 sm:px-5 py-2.5 flex items-center gap-2 sm:gap-6 transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_32px_hsl(0_0%_0%/0.5)]" : ""
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-1 pr-2 group">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-yellow pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow" />
          </span>
          <span className="font-semibold text-sm tracking-tight">
            KZ<span className="text-yellow">.dev</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-yellow text-primary-foreground hover:shadow-[0_0_24px_hsl(48_100%_56%/0.5)] transition-all hover:-translate-y-0.5"
        >
          Hire Me
        </a>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-32 sm:pt-36 pb-20 overflow-hidden">
      {/* Floating background glass orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-24 -left-20 h-72 w-72 rounded-full bg-yellow/20 blur-[120px] float-slow" />
        <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-white/5 blur-[120px] float-slower" />
        <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-yellow/10 blur-[80px] float-slow" />
      </div>

      {/* Floating glass tech labels */}
      <FloatingLabels />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow pulse-dot" />
              Open to internships & part-time roles
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              Khant <span className="text-gradient-yellow">Zin</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
              IT Student in Japan / Full Stack Engineer in Progress
            </p>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-foreground/80 leading-relaxed">
              Building practical web apps with PHP, Laravel, JavaScript, React, MySQL, and Git.
            </p>

            <div className="mt-6 text-base sm:text-lg min-h-[2rem]">
              <span className="text-muted-foreground">Currently: </span>
              <TypingText
                words={[
                  "PHP / Laravel Learner",
                  "Web App Builder",
                  "Full Stack Engineer in Progress",
                  "AI-Assisted Development Learner",
                ]}
              />
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yellow text-primary-foreground font-medium yellow-glow-hover yellow-glow"
                >
                  View Projects <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass yellow-glow-hover font-medium"
                >
                  Contact Me
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/khantzinkhant007"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass yellow-glow-hover font-medium"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Code Card */}
          <div className="lg:col-span-5 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <CodeCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeCard() {
  return (
    <TiltCard className="relative" max={10}>
      <div className="absolute -inset-6 bg-yellow/20 blur-3xl rounded-full opacity-50 -z-10" />
      <div className="glass-strong rounded-3xl p-1 shadow-[0_30px_80px_hsl(0_0%_0%/0.6)] relative overflow-hidden">
        <div className="rounded-[1.4rem] bg-black/60 backdrop-blur-xl">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[11px] text-muted-foreground font-mono">khant.ts</span>
          </div>
          <pre className="px-5 py-5 text-[13px] sm:text-sm leading-relaxed font-mono overflow-x-auto">
            <code>
              <span className="text-yellow">const</span>{" "}
              <span className="text-white">khant</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-muted-foreground">{"{"}</span>
              {"\n  "}
              <span className="text-white/80">location</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-yellow/90">"Osaka, Japan"</span>
              <span className="text-muted-foreground">,</span>
              {"\n  "}
              <span className="text-white/80">goal</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-yellow/90">"Full Stack Engineer"</span>
              <span className="text-muted-foreground">,</span>
              {"\n  "}
              <span className="text-white/80">stack</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-muted-foreground">[</span>
              <span className="text-yellow/90">"PHP"</span>
              <span className="text-muted-foreground">, </span>
              <span className="text-yellow/90">"Laravel"</span>
              <span className="text-muted-foreground">, </span>
              <span className="text-yellow/90">"React"</span>
              <span className="text-muted-foreground">, </span>
              <span className="text-yellow/90">"MySQL"</span>
              <span className="text-muted-foreground">]</span>
              {"\n"}
              <span className="text-muted-foreground">{"};"}</span>
            </code>
          </pre>
        </div>
      </div>
    </TiltCard>
  );
}

function FloatingLabels() {
  const labels = [
    { name: "PHP", className: "top-[18%] left-[6%]", delay: "0s" },
    { name: "Laravel", className: "top-[8%] right-[20%]", delay: "1s" },
    { name: "React", className: "top-[60%] left-[3%]", delay: "2s" },
    { name: "MySQL", className: "bottom-[15%] right-[8%]", delay: "1.5s" },
    { name: "Git", className: "top-[45%] right-[4%]", delay: "0.5s" },
    { name: "AI Tools", className: "bottom-[8%] left-[14%]", delay: "2.5s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 -z-[5] hidden md:block">
      {labels.map((l) => (
        <span
          key={l.name}
          className={`absolute ${l.className} glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground/80 float-slow flex items-center gap-1.5`}
          style={{ animationDelay: l.delay }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
          {l.name}
        </span>
      ))}
    </div>
  );
}

/* ---------- Section header ---------- */
function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-12 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
            <span className="h-1 w-1 rounded-full bg-yellow" />
            {eyebrow}
          </div>
        )}
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          {title.split(" ").map((w, i, arr) =>
            i === arr.length - 1 ? (
              <span key={i} className="text-gradient-yellow">
                {" "}
                {w}
              </span>
            ) : (
              <span key={i}>{i === 0 ? w : ` ${w}`}</span>
            )
          )}
        </h2>
      </div>
    </Reveal>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { icon: MapPin, label: "Osaka, Japan" },
    { icon: GraduationCap, label: "IT Student" },
    { icon: Languages, label: "JLPT N2 Japanese" },
    { icon: Briefcase, label: "Open to Internship / Part-time" },
  ];
  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-5xl">
        <SectionTitle eyebrow="About" title="About Me" />
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-10 yellow-glow-hover">
            <p className="text-lg leading-relaxed text-foreground/85">
              I'm Khant Zin, an IT student based in Osaka, Japan. I'm learning web development
              through school projects and personal projects, mainly using PHP, Laravel,
              JavaScript, React, MySQL, and Git. I enjoy building things that actually work,
              fixing problems step by step, and improving through feedback. I'm currently
              looking for internship or part-time developer opportunities where I can grow
              through real team development and code review.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="glass rounded-2xl p-4 sm:p-5 yellow-glow-hover h-full flex flex-col gap-2">
                <s.icon className="h-5 w-5 text-yellow" />
                <span className="text-sm font-medium leading-snug">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    {
      icon: Code2,
      title: "Frontend",
      note: "used in personal projects",
      items: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      icon: Layers,
      title: "Backend",
      items: ["PHP", "Laravel", "REST API basics"],
    },
    {
      icon: Database,
      title: "Database",
      items: ["MySQL", "SQL basics"],
    },
    {
      icon: Wrench,
      title: "Tools",
      items: ["Git", "GitHub", "VS Code", "Postman"],
    },
    {
      icon: BookOpen,
      title: "Learning Now",
      items: ["TypeScript", "Docker", "AWS", "Linux / UNIX"],
    },
    {
      icon: Sparkles,
      title: "AI Tools",
      items: ["ChatGPT", "Codex", "Cursor"],
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container">
        <SectionTitle eyebrow="Skills" title="Tech Stack" />
        <Reveal>
          <div className="mb-10 space-y-2">
            <Marquee items={["PHP", "Laravel", "React", "TypeScript", "MySQL", "JavaScript", "Git", "Tailwind", "Node.js", "REST API", "Docker", "AWS"]} />
            <Marquee reverse items={["HTML", "CSS", "Blade", "Postman", "VS Code", "Linux", "Shell", "ChatGPT", "Cursor", "Codex", "GitHub", "SQL"]} />
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 80}>
              <div className="group glass rounded-3xl p-6 yellow-glow-hover h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl glass-yellow flex items-center justify-center">
                    <g.icon className="h-5 w-5 text-yellow" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{g.title}</h3>
                    {g.note && (
                      <p className="text-xs text-muted-foreground">{g.note}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item, i) => (
                    <span
                      key={item}
                      className="text-xs glass rounded-full px-3 py-1.5 transition-all duration-300 hover:border-yellow/40 hover:text-yellow"
                      style={{
                        animation: `fade-in 0.5s ease-out both`,
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured Project ---------- */
function FeaturedProject() {
  const features = [
    "Login and user authentication",
    "Saving goals and progress tracking",
    "Deposit and withdrawal records",
    "Active goal dashboard",
    "Pet mood system based on saving progress",
    "Receipt scanning / OCR concept",
    "Charts for saving and spending analysis",
  ];
  const stack = ["React", "PHP", "Laravel/PHP API", "MySQL", "JavaScript", "Git"];
  return (
    <section id="projects" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container">
        <SectionTitle eyebrow="Featured" title="Featured Project" />

        <Reveal>
          <div className="glass-strong rounded-3xl overflow-hidden relative">
            <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-yellow/15 blur-3xl pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-10 relative">
                <div className="inline-flex items-center gap-2 glass-yellow rounded-full px-3 py-1 text-xs text-yellow mb-4">
                  <Sparkles className="h-3 w-3" /> Personal Project
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  Pet Saver
                </h3>
                <p className="text-yellow text-sm font-medium mt-1">
                  Gamified Savings & Expense Tracker
                </p>
                <p className="mt-5 text-foreground/80 leading-relaxed">
                  Pet Saver is a personal web app project for managing saving goals and daily
                  expenses. The idea is simple: saving money becomes more motivating when a pet
                  character reacts to your progress. The project helped me practice frontend,
                  backend, database design, authentication, and API connection.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {stack.map((s) => (
                    <span key={s} className="text-xs glass rounded-full px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>

                <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-yellow text-primary-foreground yellow-glow-hover"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub Repo
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
                  >
                    Case Study
                  </a>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Replace placeholder links with real URLs when ready.
                </p>
              </div>

              {/* Mockup area */}
              <div className="relative min-h-[360px] lg:min-h-full p-6 sm:p-10 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5">
                <div className="glass rounded-2xl w-full aspect-[4/3] flex flex-col items-center justify-center text-center p-6 tilt-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="h-16 w-16 mx-auto rounded-2xl glass-yellow flex items-center justify-center mb-4">
                      <Sparkles className="h-7 w-7 text-yellow" />
                    </div>
                    <p className="text-sm font-medium">Add Pet Saver screenshots here</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drop product mockups, UI shots, or a short demo video.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Other Projects ---------- */
function OtherProjects() {
  const projects = [
    {
      title: "Laravel School Projects",
      desc: "CRUD web applications using Laravel, Blade, MySQL, validation, routing, and basic authentication concepts.",
      tags: ["Laravel", "Blade", "MySQL"],
    },
    {
      title: "PHP / MySQL Practice",
      desc: "Database-driven applications with SQL, form handling, CRUD operations, and backend logic.",
      tags: ["PHP", "MySQL", "SQL"],
    },
    {
      title: "Linux / Cisco Practice",
      desc: "Linux command line, shell basics, networking fundamentals, and server concepts learned through school tasks.",
      tags: ["Linux", "Shell", "Networking"],
    },
  ];
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container">
        <SectionTitle eyebrow="More" title="Other Projects" />
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="glass rounded-3xl p-6 h-full tilt-card yellow-glow-hover relative overflow-hidden">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] glass rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Goals / Timeline ---------- */
function Goals() {
  const steps = [
    {
      tag: "Now",
      text: "Improve PHP, Laravel, JavaScript, MySQL, Git, and portfolio projects.",
    },
    {
      tag: "Next",
      text: "Learn TypeScript, Docker, AWS, and team development workflow.",
    },
    {
      tag: "Internship",
      text: "Join a student-friendly web development internship or part-time developer role in Osaka or remote.",
    },
    {
      tag: "Future",
      text: "Become a full-stack engineer who can work across frontend, backend, database, and cloud infrastructure.",
    },
  ];
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="goals" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-4xl">
        <SectionTitle eyebrow="Roadmap" title="Career Goals" />

        <Reveal>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-14">
            My goal is to grow into a full-stack engineer who can build useful products and
            understand the whole development flow. I want to learn from real projects, code
            reviews, and team development, while continuing to improve my technical foundation.
          </p>
        </Reveal>

        <div ref={ref} className="relative pl-8 sm:pl-12">
          {/* Animated line */}
          <span
            className="absolute left-2 sm:left-4 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-yellow via-yellow/60 to-transparent"
            style={{
              transform: visible ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 1.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.tag} delay={i * 150}>
                <div className="relative">
                  {/* dot */}
                  <span className="absolute -left-[26px] sm:-left-[34px] top-5 h-3 w-3 rounded-full bg-yellow shadow-[0_0_16px_hsl(48_100%_56%/0.7)]" />
                  <div className="glass rounded-2xl p-5 sm:p-6 yellow-glow-hover">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-yellow font-medium">
                      {s.tag}
                    </div>
                    <p className="mt-1.5 text-foreground/85">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recruiter Profile ---------- */
function Recruiter() {
  const rows: Array<[string, string]> = [
    ["Name", "Khant Zin"],
    ["Location", "Osaka, Japan"],
    ["Japanese", "JLPT N2 level"],
    ["Status", "IT Student"],
    ["Looking for", "Internship / Part-time Web Developer Role"],
    ["Interested roles", "Web Engineer, PHP/Laravel Engineer, Full Stack Engineer, Frontend Engineer"],
    ["Strengths", "Fast learner, practical project experience, builder mindset, AI tool user, motivated to improve"],
    ["Availability", "After school / student-friendly schedule"],
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="container max-w-4xl">
        <SectionTitle eyebrow="For Recruiters" title="Profile for Recruiters" />
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-10 yellow-glow-hover relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-yellow/15 blur-3xl pointer-events-none" />
            <dl className="divide-y divide-white/5">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="sm:col-span-2 text-sm sm:text-base text-foreground/90">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                Resume PDF (placeholder)
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                Profile photo (placeholder)
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "khantzinkhant007@gmail.com";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-3xl text-center">
        <SectionTitle eyebrow="Get in Touch" title="Contact" />
        <Reveal>
          <p className="text-foreground/80 text-lg leading-relaxed">
            I'm open to internships, part-time developer roles, and collaboration opportunities.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 glass-strong rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-yellow/20 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Mail className="h-5 w-5 text-yellow" />
              <a
                href={`mailto:${email}`}
                className="text-base sm:text-lg font-medium hover:text-yellow transition-colors"
              >
                {email}
              </a>
              <button
                onClick={copy}
                className="ml-1 inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full glass yellow-glow-hover"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/khantzinkhant007"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                Wantedly (placeholder)
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                LinkedIn (placeholder)
              </a>
            </div>

            <div className="mt-10">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-yellow text-primary-foreground font-semibold yellow-glow-hover yellow-glow"
              >
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative py-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow/60 to-transparent shadow-[0_0_16px_hsl(48_100%_56%/0.5)]" />
      <div className="container text-center text-sm text-muted-foreground">
        <p>Designed for Khant Zin — Full Stack Engineer in Progress.</p>
        <p className="mt-1 text-[11px]">
          © {new Date().getFullYear()} KZ.dev
        </p>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
const Index = () => {
  return (
    <main className="relative">
      <ScrollProgress />
      <Aurora />
      <CursorSpotlight />
      <CuteRobot />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <OtherProjects />
      <Goals />
      <Recruiter />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
