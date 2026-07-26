import {
  Airpod01Icon,
  BatteryCharging02Icon,
  Cancel02Icon,
  ChartHistogramIcon,
  ComputerTerminal01Icon,
  CpuIcon,
  Download04Icon,
  GithubIcon,
  HistoryIcon,
  LaptopIcon,
  MusicNote01Icon,
  NewTwitterRectangleIcon,
  PlayCircleIcon,
  SmartPhone01Icon,
  Tick02Icon,
  Timer01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { useCheckout } from "#/components/buy-button";
import { Icon } from "#/components/icon";
import { Logo } from "#/components/logo";
import { ThemeToggle } from "#/components/theme-toggle";
import { Button } from "#/components/ui/button";

import {
  ALSO,
  CAPABILITIES,
  CHAPTERS,
  FAQS,
  LINKS,
  MOMENTS,
  SPECS,
  TESTIMONIALS,
} from "./landing-data";
import type { CapabilityIcon, Moment } from "./landing-data";

const PRICE = "$2.99";

function DownloadButton({
  size = "default",
  className,
  variant = "default",
  children,
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}) {
  return (
    <Button
      render={
        <a href={LINKS.releases} target="_blank" rel="noreferrer" aria-label="Download Battlify" />
      }
      nativeButton={false}
      size={size}
      variant={variant}
      className={className}
    >
      {children ?? "Download"}
      <Icon icon={Download04Icon} className="size-4" />
    </Button>
  );
}

function BuyButton({
  size = "default",
  className,
  variant = "default",
  children,
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}) {
  const { buy, loading } = useCheckout();
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={buy}
      disabled={loading}
      type="button"
    >
      {children ?? `Buy · ${PRICE}`}
    </Button>
  );
}

function Eyebrow({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "muted";
}) {
  const color = tone === "muted" ? "text-muted-foreground" : "text-primary";
  return (
    <p className={"text-[11px] font-semibold tracking-[0.16em] uppercase " + color}>{children}</p>
  );
}

/* ========================================================================== */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid h-16 max-w-3xl grid-cols-[1fr_auto_1fr] items-center px-6">
        <Link to="/" className="justify-self-start transition-opacity hover:opacity-80">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 justify-self-center text-sm text-muted-foreground sm:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link to="/changelog" className="transition-colors hover:text-foreground">
            Changelog
          </Link>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Community
          </a>
        </nav>
        <div className="flex items-center gap-1.5 justify-self-end">
          <ThemeToggle />
          <Button render={<Link to="/login" />} variant="outline" size="sm" nativeButton={false}>
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   1. HERO: lead with the tension, keep the app-window mockup as proof.
   ========================================================================== */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-8rem] left-1/2 h-[36rem] w-[48rem] -translate-x-1/2 rounded-full opacity-20 blur-[130px] dark:opacity-40"
        style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent)" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-12 text-center">
        <div className="animate-enter">
          <Eyebrow>Battery care &amp; lid-closed power for Mac</Eyebrow>
        </div>
        <h1
          className="animate-enter mx-auto mt-5 max-w-2xl font-display text-[2.5rem] leading-[1.03] font-bold tracking-[-0.03em] text-balance sm:text-[3.5rem]"
          style={{ "--enter-delay": "80ms" } as React.CSSProperties}
        >
          Close the lid. Nothing you care about stops.
        </h1>
        <p
          className="animate-enter mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-pretty text-muted-foreground sm:text-base"
          style={{ "--enter-delay": "160ms" } as React.CSSProperties}
        >
          A closed MacBook should not quietly drain in your bag, creep back to 100 percent
          overnight, or steal your AirPods. It also should not kill the build you left running.
          Battlify holds your battery at a healthy limit, cuts the phantom drain, and keeps your
          terminal jobs and agents alive with the lid shut, still reachable from your phone.
        </p>
        <div
          className="animate-enter mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ "--enter-delay": "240ms" } as React.CSSProperties}
        >
          <DownloadButton size="lg" className="h-11 rounded-2xl px-6 text-[15px]">
            Download
          </DownloadButton>
          <Button
            render={<a href="#demo" aria-label="Watch the Battlify tour" />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="h-11 rounded-2xl px-6 text-[15px]"
          >
            Watch the tour
            <Icon icon={PlayCircleIcon} className="size-4" />
          </Button>
        </div>
        <p
          className="animate-enter mt-4 text-[13px] text-muted-foreground"
          style={{ "--enter-delay": "320ms" } as React.CSSProperties}
        >
          No account required. Free for 30 days.
        </p>
      </div>

      <div
        className="animate-enter relative mx-auto max-w-3xl px-6 pb-20"
        style={{ "--enter-delay": "420ms" } as React.CSSProperties}
      >
        <DemoVideo />
      </div>
    </section>
  );
}

/* ==========================================================================
   Demo: the real app, recorded. Nothing loads until it is asked for, and the
   chapters let people jump straight to the part they came for.
   ========================================================================== */

function formatAt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function DemoVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [chapter, setChapter] = useState<number | null>(null);

  const play = (at?: number, index?: number) => {
    const el = video.current;
    if (!el) return;
    if (at !== undefined) el.currentTime = at;
    setChapter(index ?? null);
    void el.play();
  };

  return (
    <div id="demo" className="scroll-mt-20">
      <ScreenshotFrame>
        <div className="relative overflow-hidden rounded-[18px] bg-card shadow-window outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
          <video
            ref={video}
            className="block w-full"
            poster="/battlify-poster.jpg"
            preload="metadata"
            playsInline
            muted
            controls={started}
            onPlay={() => setStarted(true)}
            aria-label="Battlify walkthrough: charge limit, lid-closed behaviour, keep-awake, history"
          >
            <source src="/battlify-demo.mp4" type="video/mp4" />
          </video>

          {started ? null : (
            <button
              type="button"
              onClick={() => play()}
              className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/25 backdrop-blur-[1px] transition-[background-color,scale] hover:bg-black/15 active:scale-[0.96]"
              aria-label="Play the Battlify walkthrough"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-105">
                <Icon icon={PlayCircleIcon} className="size-8" />
              </span>
              <span className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-medium text-white">
                Three-minute tour · no sound
              </span>
            </button>
          )}
        </div>
      </ScreenshotFrame>

      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.at}
              type="button"
              onClick={() => play(c.at, i)}
              className={
                "flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] transition-[color,border-color,background-color,scale] active:scale-[0.96] " +
                (chapter === i
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground")
              }
            >
              <span className="font-medium tabular-nums">{formatAt(c.at)}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Capabilities: one card per part of the app, closed-lid story first.
   ========================================================================== */

const CAPABILITY_ICONS: Record<CapabilityIcon, IconSvgElement> = {
  lid: LaptopIcon,
  agents: ComputerTerminal01Icon,
  remote: SmartPhone01Icon,
  devices: Airpod01Icon,
  music: MusicNote01Icon,
  timer: Timer01Icon,
  history: HistoryIcon,
  details: ChartHistogramIcon,
};

function Capabilities() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="reveal max-w-xl">
          <Eyebrow>What it does</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            Everything a closed lid should just do.
          </h2>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            macOS treats a closed lid as an off switch for the things you want and a free pass for
            the things you do not. Battlify sorts that out, one section at a time.
          </p>
        </div>

        <div className="reveal mt-14 grid gap-x-10 gap-y-11 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div key={c.title}>
              <div className="flex size-9 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-soft">
                <Icon icon={CAPABILITY_ICONS[c.icon]} className="size-[18px]" />
              </div>
              <h3 className="mt-4 font-display text-[17px] font-semibold tracking-[-0.01em]">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-pretty text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-14 rounded-2xl border border-border bg-muted/30 px-5 py-5">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            And the smaller things
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {ALSO.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Blue-glow panel the app screenshots sit on, à la sql.studio. */
function ScreenshotFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 -top-8 bottom-0 rounded-[2rem] opacity-30 blur-2xl dark:opacity-50"
        style={{
          background: "radial-gradient(60% 60% at 50% 0%, var(--color-primary), transparent)",
        }}
      />
      <div className="relative rounded-[26px] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent p-2 dark:from-primary/30">
        {children}
      </div>
    </div>
  );
}

/* ==========================================================================
   2. THE PROBLEM: the emotional turn. A full, warm battery ages fastest,
   and heat and high charge multiply each other. Inline aging grid (SVG/CSS).
   ========================================================================== */

function Problem() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="reveal grid items-center gap-12 sm:grid-cols-[1fr_auto]">
        <div className="max-w-md">
          <Eyebrow tone="muted">The problem</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            A full, warm battery ages fastest.
          </h2>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            A lithium battery runs on two clocks at once. A cycle clock, worn by charging and
            discharging. And a calendar clock, chemistry that decays with time alone. A Mac left
            full and warm loses health without finishing a single cycle.
          </p>
          <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
            Two things do the real damage: a high charge level and heat. Alone, each is corrosive.
            Together they do not add up, they{" "}
            <span className="font-medium text-foreground">multiply</span>. Pinned at 100 percent
            while it runs warm is the worst place a battery can sit, and it is exactly where a
            laptop on a charger all day ends up.
          </p>
        </div>
        <AgingGrid />
      </div>

      <div className="reveal mt-20">
        <h3 className="max-w-md font-display text-2xl font-bold tracking-[-0.02em] text-balance">
          And a closed lid that is not really closed.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-pretty text-muted-foreground">
          The other half of the problem has nothing to do with chemistry. macOS decides for itself
          what a shut lid means, and it usually gets it backwards.
        </p>
        <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-3">
          {LID_GRIEFS.map((g) => (
            <div key={g.title}>
              <div className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
                <Icon icon={g.icon} className="size-4" />
              </div>
              <p className="mt-3 text-[14px] font-medium text-foreground">{g.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-pretty text-muted-foreground">
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LID_GRIEFS: Array<{ icon: IconSvgElement; title: string; body: string }> = [
  {
    icon: BatteryCharging02Icon,
    title: "Drains in your bag",
    body: "Wake-for-network, Power Nap and background chatter nibble away for hours. You open it later and lost fifteen percent doing nothing.",
  },
  {
    icon: Airpod01Icon,
    title: "Grabs your devices",
    body: "A closed Mac still holds Bluetooth, so your AirPods connect to the laptop in your bag instead of the phone in your hand.",
  },
  {
    icon: ComputerTerminal01Icon,
    title: "Kills your work",
    body: "Close the lid and the build stops, the agent stops, the music stops, and SSH goes dark. Sleep is all or nothing.",
  },
];

/** Monochrome heatmap: aging intensity across charge level (rows) and heat (cols). */
function AgingGrid() {
  const charges = [100, 90, 80, 60]; // top to bottom
  const temps = [20, 30, 40, 50]; // left to right
  const maxProduct = 100 * 50;
  return (
    <figure className="mx-auto w-full max-w-[260px]">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="grid grid-cols-[auto_1fr] gap-x-2">
          {/* Y label */}
          <div className="flex items-center">
            <span className="[transform:rotate(180deg)] text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase [writing-mode:vertical-rl]">
              Charge
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {charges.map((c) =>
              temps.map((t) => {
                const intensity = (c * t) / maxProduct; // 0..1
                const worst = c === 100 && t === 50;
                return (
                  <div
                    key={`${c}-${t}`}
                    className={
                      "relative aspect-square rounded-md " +
                      (worst ? "ring-2 ring-foreground/50" : "")
                    }
                    style={{
                      backgroundColor: "var(--foreground)",
                      opacity: 0.06 + intensity * 0.82,
                    }}
                  />
                );
              }),
            )}
          </div>
        </div>
        {/* X label */}
        <div className="mt-2 flex items-center justify-end">
          <span className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Heat
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-muted-foreground">
        Aging roughly <span className="font-medium text-foreground tabular-nums">doubles</span> for
        every 10&nbsp;°C. Darkest corner is 100 percent and hot.
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   3. THE FIX: Battlify does the two hard habits for you. The MOMENTS become
   sequenced, alternating scenes, each with its own micro-visual.
   ========================================================================== */

function Fix() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-8">
        <div className="reveal max-w-xl">
          <Eyebrow>The fix</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            Battlify does the hard parts for you.
          </h2>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            Staying off 100 percent, staying cool, and knowing what a closed lid is really doing are
            simple ideas and a real pain to do by hand. Battlify makes them automatic, then
            disappears into your menu bar.
          </p>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {MOMENTS.map((m, i) => (
            <Scene key={m.eye} moment={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Scene({ moment, index }: { moment: Moment; index: number }) {
  return (
    <div className="reveal">
      <div className="max-w-xl">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold text-primary tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" />
          <Eyebrow>{moment.eye}</Eyebrow>
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em] text-balance">
          {moment.title}
        </h3>
        <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{moment.body}</p>
        {moment.note ? (
          <p className="mt-4 rounded-xl border border-border bg-muted/40 px-3.5 py-2.5 text-[13px] leading-relaxed text-pretty text-muted-foreground">
            {moment.note}
          </p>
        ) : null}
      </div>
      <div className="mt-8">
        <Shot shot={moment.shot} />
      </div>
    </div>
  );
}

/** A real frame from the demo recording, framed like a screenshot. */
function Shot({ shot }: { shot: Moment["shot"] }) {
  return (
    <figure className={"relative " + (shot.h / shot.w > 1.4 ? "mx-auto max-w-[420px]" : "")}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-6 bottom-0 rounded-[2rem] opacity-25 blur-2xl dark:opacity-40"
        style={{
          background: "radial-gradient(60% 60% at 50% 0%, var(--color-primary), transparent)",
        }}
      />
      {/* Concentric: 20px outer radius over 6px of padding leaves 14px inside. */}
      <div className="relative rounded-[20px] bg-card p-1.5 shadow-window">
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.w}
          height={shot.h}
          loading="lazy"
          decoding="async"
          className="block w-full rounded-[14px] outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </div>
    </figure>
  );
}

/* ==========================================================================
   Showcase: a second window as proof, plus a compact spec strip.
   ========================================================================== */

function Showcase() {
  return (
    <section className="border-t border-border">
      <div className="reveal mx-auto max-w-3xl px-6 py-20">
        <div className="mx-auto mb-10 max-w-md text-center">
          <p className="leading-relaxed text-pretty text-muted-foreground">
            Everything lives in one small window and a menu bar icon you can read at a glance. No
            Dock clutter, no account, no fuss.
          </p>
        </div>
        <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {SPECS.map((s) => (
            <div key={s.n}>
              <dt className="font-display text-lg font-semibold tracking-[-0.01em]">{s.n}</dt>
              <dd className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. PROOF: testimonials, then compatibility, as reassurance.
   ========================================================================== */

function Proof() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="reveal max-w-xl">
          <Eyebrow>Loved by Mac owners</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            People simply stopped worrying about it.
          </h2>
        </div>
        <div className="reveal mt-10 gap-4 [column-fill:_balance] sm:columns-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.quote}
              className="mb-4 break-inside-avoid rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <blockquote className="text-[15px] leading-relaxed text-pretty text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
                <span className="font-medium text-foreground">{t.who}</span>
                <span aria-hidden>·</span>
                <span>{t.src}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Supported />
      </div>
    </section>
  );
}

function Supported() {
  const items: Array<{ icon: IconSvgElement; title: string; status: string; ok: boolean }> = [
    { icon: CpuIcon, title: "Apple Silicon", status: "Supported", ok: true },
    { icon: LaptopIcon, title: "macOS 14 to 26", status: "Supported", ok: true },
    { icon: Cancel02Icon, title: "Intel Macs", status: "Not supported", ok: false },
  ];
  return (
    <div className="reveal mt-16">
      <h3 className="font-display text-xl font-bold tracking-[-0.02em]">
        Will it run on your Mac?
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground">
        Battlify is built for modern Apple Silicon MacBooks and supports both of Apple&apos;s
        charging schemes: the older CH0B/CH0C keys and the newer CHTE on macOS 26
        &ldquo;Tahoe.&rdquo;
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div
              className={
                "flex size-11 items-center justify-center rounded-xl " +
                (it.ok ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")
              }
            >
              <Icon icon={it.icon} className="size-5" />
            </div>
            <h4 className="mt-3 text-sm font-medium">{it.title}</h4>
            <p
              className={
                "mt-1 inline-flex items-center gap-1 text-xs font-medium " +
                (it.ok ? "text-primary" : "text-muted-foreground")
              }
            >
              {it.ok ? <Icon icon={Tick02Icon} className="size-3.5" /> : null}
              {it.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   5. THE MATH: pricing reframed around value. $199 battery vs $2.99.
   ========================================================================== */

function Pricing() {
  const trialFeatures = ["Every feature unlocked", "No account needed", "Runs for 30 days"];
  const licenseFeatures = [
    "Everything in the trial",
    "Yours forever, no subscription",
    "Free updates for life",
    "Locked to one Mac (movable)",
  ];
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div id="pricing" className="reveal max-w-xl scroll-mt-20">
          <Eyebrow>The math</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            A new battery is about{" "}
            <span className="text-muted-foreground tabular-nums line-through decoration-2">
              $199
            </span>
            . Battlify is <span className="tabular-nums">{PRICE}</span>.
          </h2>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            Apple rates a modern MacBook battery for around{" "}
            <span className="font-medium text-foreground tabular-nums">1,000</span> cycles. How you
            treat it in between decides whether it gets there. Battlify is a one-time {PRICE}, free
            to try for 30 days, so the only thing you risk is a worn out battery.
          </p>
        </div>

        <div className="reveal mt-10 grid items-start gap-4 sm:grid-cols-2">
          {/* Free trial */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-medium">Free trial</h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-bold tracking-[-0.02em] tabular-nums">
                $0
              </span>
              <span className="text-sm text-muted-foreground">for 30 days</span>
            </div>
            <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              What&apos;s included
            </p>
            <ul className="mt-3 space-y-2.5">
              {trialFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Icon icon={Tick02Icon} className="size-4 text-muted-foreground" />
                  {f}
                </li>
              ))}
            </ul>
            <DownloadButton size="lg" variant="outline" className="mt-8 h-11 w-full rounded-2xl">
              Download
            </DownloadButton>
          </div>

          {/* License */}
          <div className="relative flex flex-col rounded-2xl border border-primary/40 bg-card p-6 shadow-elevated ring-1 ring-primary/15">
            <h3 className="font-medium">License · Single Mac</h3>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-bold tracking-[-0.02em] tabular-nums">
                {PRICE}
              </span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
              Pay once, keep it forever. A replacement battery at the Apple Store runs about{" "}
              <span className="tabular-nums">$199</span>. This is{" "}
              <span className="tabular-nums">{PRICE}</span>.
            </p>
            <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              What&apos;s included
            </p>
            <ul className="mt-3 space-y-2.5">
              {licenseFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Icon icon={Tick02Icon} className="size-4 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <BuyButton size="lg" className="mt-8 h-11 w-full rounded-2xl">
              Buy Battlify · {PRICE}
            </BuyButton>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Secure checkout via Dodo Payments · applicable taxes handled at checkout.
        </p>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. FAQ (feeds JSON-LD, keep the data contract) + closing CTA.
   ========================================================================== */

function Faq() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="reveal text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mx-auto mt-3 max-w-md font-display text-3xl font-bold tracking-[-0.025em] text-balance sm:text-[2.5rem] sm:leading-[1.05]">
            Questions, answered.
          </h2>
        </div>
        <dl className="reveal mt-10 divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
          {FAQS.map((item) => (
            <div key={item.q} className="p-6">
              <dt className="font-medium">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10rem] left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full opacity-20 blur-[130px] dark:opacity-40"
        style={{ background: "radial-gradient(closest-side, var(--color-primary), transparent)" }}
      />
      <div className="reveal relative mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-bold tracking-[-0.03em] text-balance sm:text-[2.75rem] sm:leading-[1.05]">
          Give your battery its years back.
        </h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-pretty text-muted-foreground">
          Set your limit once and forget it. Battlify keeps the promise in the background, awake or
          asleep, cool or warm.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <DownloadButton size="lg" className="h-11 rounded-2xl px-6 text-[15px]">
            Download
          </DownloadButton>
          <BuyButton size="lg" variant="outline" className="h-11 rounded-2xl px-6 text-[15px]">
            Buy · {PRICE}
          </BuyButton>
        </div>
        <p className="mt-6 text-[13px] text-muted-foreground">
          Free for 30 days. Built by Nischal, a solo developer who loves small, native Mac software
          that just works.
        </p>
      </div>
    </section>
  );
}

/* ========================================================================== */

function Footer() {
  const cols: Array<{
    title: string;
    links: Array<{ label: string; href: string; external?: boolean }>;
  }> = [
    {
      title: "Product",
      links: [
        { label: "Pricing", href: "#pricing" },
        { label: "Blog", href: "/blog" },
        { label: "Download", href: LINKS.releases, external: true },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "GitHub", href: LINKS.github, external: true },
        { label: "Report an issue", href: LINKS.feedback, external: true },
      ],
    },
  ];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-3xl gap-10 px-6 py-14 sm:grid-cols-[1fr_auto_auto_auto]">
        <div>
          <Logo />
        </div>
        {cols.map((c) => (
          <div key={c.title} className="sm:min-w-28">
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="sm:min-w-28">
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/legal/privacy" className="transition-colors hover:text-foreground">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/legal/terms" className="transition-colors hover:text-foreground">
                Terms of service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Battlify · built by broisnischal</p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/broisnischal"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-colors hover:text-foreground"
            >
              <Icon icon={NewTwitterRectangleIcon} className="size-4" />
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <Icon icon={GithubIcon} className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================================== */

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Capabilities />
        <Fix />
        <Showcase />
        <Proof />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
