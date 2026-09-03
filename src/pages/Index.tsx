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
  QrCode,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { TypingText } from "@/components/TypingText";
import { useReveal } from "@/hooks/use-reveal";
import { toast } from "sonner";
import {
  Aurora,
  Magnetic,
  Marquee,
  ScrollProgress,
} from "@/components/FancyFx";
import { CuteRobot } from "@/components/CuteRobot";
import petSaverScreenshot from "@/assets/pet-saver-screenshot.png";
import profilePhotoUrl from "@/assets/profile-photo-optimized.jpg";

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
    { href: "#about", label: "自己紹介" },
    { href: "#skills", label: "スキル" },
    { href: "#projects", label: "制作物" },
    { href: "#goals", label: "目標" },
    { href: "#contact", label: "連絡" },
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
            ポート<span className="text-yellow">フォリオ</span>
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
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-yellow text-primary-foreground hover:shadow-[0_0_24px_hsl(0_0%_100%/0.35)] transition-all hover:-translate-y-0.5"
        >
          採用相談
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
              インターン・アルバイト応募中
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
              カン <span className="text-gradient-yellow">ゼイン</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
              日本のアイティー学生 / フルスタックエンジニアを目指しています
            </p>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-foreground/80 leading-relaxed">
              ピーエイチピー、ララベル、ジャバスクリプト、リアクト、マイエスキューエル、ギットを使って、実用的なウェブアプリを制作しています。
            </p>

            <div className="mt-6 text-base sm:text-lg min-h-[2rem]">
              <span className="text-muted-foreground">現在: </span>
              <TypingText
                words={[
                  "ピーエイチピー / ララベルを学習中",
                  "ウェブアプリ制作中",
                  "フルスタックエンジニアを目指しています",
                  "AIを活用した開発を学習中",
                ]}
              />
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-yellow text-primary-foreground font-medium yellow-glow-hover yellow-glow"
                >
                  制作物を見る <ArrowUpRight className="h-4 w-4" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass yellow-glow-hover font-medium"
                >
                  連絡する
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/khantzinkhant007-collab"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass yellow-glow-hover font-medium"
                >
                  <Github className="h-4 w-4" /> ギットハブ
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Profile Photo */}
          <div className="lg:col-span-5 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <ProfilePhoto />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfilePhoto() {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="absolute -inset-6 bg-yellow/20 blur-3xl rounded-full opacity-50 -z-10" />
      <div className="glass-strong rounded-[2rem] p-3 shadow-[0_30px_80px_hsl(0_0%_0%/0.6)]">
        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-black/60">
          {photoLoaded ? (
            <img
              src={profilePhotoUrl}
              alt="カンゼインのプロフィール写真"
              className="h-full w-full object-cover"
              onError={() => setPhotoLoaded(false)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
              <p className="text-lg font-semibold">写真を追加</p>
              <p className="mt-2 text-sm text-muted-foreground">
                写真ファイルを追加すると、ここに角丸で表示されます。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FloatingLabels() {
  const labels = [
    { name: "ピーエイチピー", className: "top-[18%] left-[6%]", delay: "0s" },
    { name: "ララベル", className: "top-[8%] right-[20%]", delay: "1s" },
    { name: "リアクト", className: "top-[60%] left-[3%]", delay: "2s" },
    { name: "マイエスキューエル", className: "bottom-[15%] right-[8%]", delay: "1.5s" },
    { name: "ギット", className: "top-[45%] right-[4%]", delay: "0.5s" },
    { name: "AIツール", className: "bottom-[8%] left-[14%]", delay: "2.5s" },
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
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gradient-yellow">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { icon: MapPin, label: "大阪、日本" },
    { icon: GraduationCap, label: "アイティー学生" },
    { icon: Languages, label: "日本語 JLPT N2レベル" },
    { icon: Briefcase, label: "インターン・アルバイト希望" },
  ];
  return (
    <section id="about" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-5xl">
        <SectionTitle eyebrow="自己紹介" title="自己紹介" />
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-10 yellow-glow-hover">
            <p className="text-lg leading-relaxed text-foreground/85">
              カンゼインです。大阪のECCコンピューター専門学校にIT開発研究コースの学生です。学校課題と個人制作を通して、
              PHP、LARAVEL、JS、MySQL、JAVAを中心にIT開発を学習しています。
              実際に動くものを作ること、問題を一つずつ直すこと、フィードバックから改善することが好きです。
              現在は、実務のチーム開発やコードレビューを通して成長できるインターン・アルバイトの機会を探しています。
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
      title: "フロントエンド",
      note: "個人制作で使用",
      items: ["エイチティーエムエル", "シーエスエス", "ジャバスクリプト", "リアクト"],
    },
    {
      icon: Layers,
      title: "バックエンド",
      items: ["PHP", "LARAVEL", "レストエーピーアイ基礎"],
    },
    {
      icon: Database,
      title: "データベース",
      items: ["MYSQL"],
    },
    {
      icon: Wrench,
      title: "ツール",
      items: ["Git", "GitHub"],
    },
    {
      icon: BookOpen,
      title: "現在学習中",
      items: ["エーダブリューエス", "リナックス / ユニックス"],
    },
    {
      icon: Sparkles,
      title: "AIツール",
      items: ["ChatGPT", "Codex", "Gemini"],
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container">
        <SectionTitle eyebrow="スキル" title="技術スタック" />
        <Reveal>
          <div className="mb-10 space-y-2">
            <Marquee items={["ピーエイチピー", "ララベル", "リアクト", "タイプスクリプト", "マイエスキューエル", "ジャバスクリプト", "ギット", "テイルウィンド", "ノード", "レストエーピーアイ", "ドッカー", "エーダブリューエス"]} />
            <Marquee reverse items={["エイチティーエムエル", "シーエスエス", "ブレード", "ポストマン", "ブイエスコード", "リナックス", "シェル", "チャットジーピーティー", "カーソル", "コーデックス", "ギットハブ", "エスキューエル"]} />
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
  const petSaverFeatures = [
    "ログインとユーザー認証",
    "貯金目標と進捗管理",
    "入金・出金記録",
    "進行中の目標ダッシュボード",
    "貯金進捗に合わせたペットの気分システム",
    "レシート読み取り / OCRの構想",
    "貯金と支出分析のチャート",
  ];
  const petSaverStack = ["リアクト", "ピーエイチピー", "ララベル / ピーエイチピーエーピーアイ", "マイエスキューエル", "ジャバスクリプト", "ギット"];
  const scanSendFeatures = [
    "写真・動画のアップロード",
    "ファイルごとの固有QRコード",
    "有効期限付きダウンロードリンク",
    "推測されにくいユニークトークン",
    "Laravelによる非公開ファイル配信",
    "モバイル対応PWA",
    "Vercel / Railwayの分離構成",
  ];
  const scanSendStack = ["PWA", "ララベル", "マイエスキューエル", "Vercel", "Railway", "非公開ストレージ"];
  return (
    <section id="projects" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container">
        <SectionTitle eyebrow="注目" title="代表制作" />

        <Reveal>
          <div className="glass-strong rounded-3xl overflow-hidden relative">
            <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-yellow/15 blur-3xl pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-10 relative">
                <div className="inline-flex items-center gap-2 glass-yellow rounded-full px-3 py-1 text-xs text-yellow mb-4">
                  <Sparkles className="h-3 w-3" /> 個人制作
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  ペットセーバー
                </h3>
                <p className="text-yellow text-sm font-medium mt-1">
                  ゲーム感覚の貯金・支出管理アプリ
                </p>
                <p className="mt-5 text-foreground/80 leading-relaxed">
                  ペットセーバーは、貯金目標と日々の支出を管理するための個人制作ウェブアプリです。
                  ペットキャラクターが貯金の進捗に反応することで、貯金を楽しく続けられるようにすることを目指しました。
                  この制作を通して、フロントエンド、バックエンド、データベース設計、認証、API連携を練習しました。
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {petSaverStack.map((s) => (
                    <span key={s} className="text-xs glass rounded-full px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>

                <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {petSaverFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="https://github.com/Jack13-Han/pet_saver"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-yellow text-primary-foreground yellow-glow-hover"
                  >
                    <Github className="h-3.5 w-3.5" /> ギットハブリポジトリ
                  </a>
                  <a
                    href="https://petsaver.infy.click/"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> デモ
                  </a>
                  {/* <a
                    href=""
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
                  >
                    制作メモ
                  </a> */}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  準備できたら、仮リンクを実際のURLに差し替えます。
                </p>
              </div>
              {/* Mockup area */}
              <div className="relative min-h-[360px] lg:min-h-full p-6 sm:p-10 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5">
                <div className="glass rounded-2xl w-full tilt-card relative overflow-hidden shadow-[0_25px_80px_hsl(0_0%_0%/0.28)]">
                  <img
                    src={petSaverScreenshot}
                    alt="Pet Saver dashboard screenshot"
                    className="block w-full h-auto"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-8">
          <div className="glass-strong rounded-3xl overflow-hidden relative">
            <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-yellow/15 blur-3xl pointer-events-none" />
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 sm:p-10 relative">
                <div className="inline-flex items-center gap-2 glass-yellow rounded-full px-3 py-1 text-xs text-yellow mb-4">
                  <Sparkles className="h-3 w-3" /> フルスタック制作
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                  ScanSend
                </h3>
                <p className="text-yellow text-sm font-medium mt-1">
                  写真・動画を安全に共有するQRファイル共有PWA
                </p>
                <p className="mt-5 text-foreground/80 leading-relaxed">
                  ScanSendは、写真や動画をアップロードすると、ファイルごとに専用のQRコードと
                  有効期限付きダウンロードリンクを発行するウェブ/PWAです。受け取る側はQRコードを
                  スキャンしてファイルをダウンロードできます。フロントエンドはVercel、Laravel API・
                  MySQL・非公開ファイルストレージはRailwayで運用しています。
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {scanSendStack.map((s) => (
                    <span key={s} className="text-xs glass rounded-full px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>

                <ul className="mt-7 grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {scanSendFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="https://github.com/khantzinkhant007-collab/QR-CODE-sharer.git"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-yellow text-primary-foreground yellow-glow-hover"
                  >
                    <Github className="h-3.5 w-3.5" /> ギットハブリポジトリ
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 mt-8">
                  <a
                    href="https://qr-code-sharer.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-yellow text-primary-foreground yellow-glow-hover"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> ライブアプリ
                  </a>
                </div>
                {/* <p className="mt-3 text-[11px] text-muted-foreground break-all">
                  ダウンロードURL: scansend-api-production.up.railway.app/d/&#123;unique-token&#125;
                </p> */}
              </div>

              <div className="relative min-h-[420px] lg:min-h-full p-6 sm:p-10 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5">
                <div className="glass rounded-[2rem] w-full max-w-md tilt-card relative overflow-hidden shadow-[0_25px_80px_hsl(0_0%_0%/0.28)]">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-yellow text-primary-foreground">
                        <QrCode className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-none">ScanSend</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">PRIVATE FILE SHARING</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] text-foreground/70">
                      <ShieldCheck className="h-3.5 w-3.5 text-yellow" aria-hidden="true" /> 非公開
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="rounded-2xl border border-dashed border-yellow/35 bg-yellow/[0.04] px-5 py-7 text-center">
                      <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl glass-yellow text-yellow">
                        <Upload className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className="mt-3 text-sm font-medium">写真または動画をアップロード</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">ファイルごとに安全なリンクを作成</p>
                    </div>

                    <div className="mt-4 grid grid-cols-[1fr_auto] gap-3 items-stretch">
                      <div className="rounded-2xl bg-black/20 p-4 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Download link</p>
                        <p className="mt-2 truncate text-xs text-foreground/80">/d/8f7a2c...</p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow pulse-dot" />
                          有効期限付き
                        </div>
                      </div>
                      <div className="grid place-items-center rounded-2xl bg-white p-3 text-black">
                        <QrCode className="h-16 w-16 sm:h-20 sm:w-20" aria-label="ダウンロード用QRコードのイメージ" />
                      </div>
                    </div>
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
      title: "ララベル学校課題",
      desc: "ララベル、ブレード、マイエスキューエル、バリデーション、ルーティング、基本的な認証の考え方を使った登録・表示・更新・削除アプリです。",
      tags: ["ララベル", "ブレード", "マイエスキューエル"],
    },
    {
      title: "ピーエイチピー / マイエスキューエル練習",
      desc: "エスキューエル、フォーム処理、登録・表示・更新・削除の操作、バックエンドロジックを使ったデータベース連携アプリです。",
      tags: ["ピーエイチピー", "マイエスキューエル", "エスキューエル"],
    },
    {
      title: "リナックス / シスコ練習",
      desc: "学校課題を通して、リナックスコマンド、シェル基礎、ネットワーク基礎、サーバーの考え方を学びました。",
      tags: ["リナックス", "シェル", "ネットワーク"],
    },
  ];
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container">
        <SectionTitle eyebrow="その他" title="その他の制作" />
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
      tag: "現在",
      text: "ピーエイチピー、ララベル、ジャバスクリプト、マイエスキューエル、ギット、ポートフォリオ制作をさらに改善しています。",
    },
    {
      tag: "次",
      text: "タイプスクリプト、ドッカー、エーダブリューエス、チーム開発の流れを学習します。",
    },
    {
      tag: "インターン",
      text: "大阪またはリモートで、学生でも参加しやすいウェブ開発インターン・アルバイトに挑戦したいです。",
    },
    {
      tag: "将来",
      text: "フロントエンド、バックエンド、データベース、クラウドまで理解できるフルスタックエンジニアを目指します。",
    },
  ];
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="goals" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-4xl">
        <SectionTitle eyebrow="ロードマップ" title="キャリア目標" />

        <Reveal>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-14">
            目標は、役に立つプロダクトを作り、開発全体の流れを理解できるフルスタックエンジニアになることです。
            実際のプロジェクト、コードレビュー、チーム開発から学びながら、技術の基礎を継続して伸ばしていきます。
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
                  <span className="absolute -left-[26px] sm:-left-[34px] top-5 h-3 w-3 rounded-full bg-yellow shadow-[0_0_16px_hsl(0_0%_100%/0.45)]" />
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
    ["名前", "カンゼイン"],
    ["所在地", "大阪、日本"],
    ["日本語", "JLPT N2レベル"],
    ["現在", "アイティー学生"],
    ["希望", "インターン / アルバイト ウェブ開発職"],
    ["興味のある職種", "ウェブエンジニア、ピーエイチピー / ララベルエンジニア、フルスタックエンジニア、フロントエンドエンジニア"],
    ["強み", "学習が早い、実践的な制作経験、作る姿勢、AIツール活用、改善意欲"],
    ["勤務可能時間", "放課後 / 学生に合うスケジュール"],
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="container max-w-4xl">
        <SectionTitle eyebrow="採用担当者向け" title="採用向けプロフィール" />
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
                履歴書PDF（準備中）
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                プロフィール写真（準備中）
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
      toast.success("メールアドレスをコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("コピーできませんでした");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 scroll-mt-nav">
      <div className="container max-w-3xl text-center">
        <SectionTitle eyebrow="お問い合わせ" title="連絡先" />
        <Reveal>
          <p className="text-foreground/80 text-lg leading-relaxed">
            インターン、アルバイト開発職、共同制作の機会を探しています。
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
                    <Check className="h-3 w-3" /> コピー済み
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> コピー
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/khantzinkhant007-collab"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                <Github className="h-4 w-4" /> ギットハブ
              </a>
              <a
                href="https://www.wantedly.com/id/khant_zin007"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                ウォンテッドリー
              </a>
              {/* <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full glass yellow-glow-hover"
              >
                リンクトイン（準備中）
              </a> */}
            </div>

            <div className="mt-10">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-yellow text-primary-foreground font-semibold yellow-glow-hover yellow-glow"
              >
                相談する <ArrowUpRight className="h-4 w-4" />
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
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow/60 to-transparent shadow-[0_0_16px_hsl(0_0%_100%/0.35)]" />
      <div className="container text-center text-sm text-muted-foreground">
        <p>カント ジンのために制作 / フルスタックエンジニアを目指しています。</p>
        <p className="mt-1 text-[11px]">
          © {new Date().getFullYear()} ポートフォリオ
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
