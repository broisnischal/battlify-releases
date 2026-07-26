import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";

import { LINKS } from "#/components/landing/landing-data";
import { Logo } from "#/components/logo";
import { changelogQueryOptions } from "#/lib/changelog/queries";
import type { Block, Release, Span } from "#/lib/changelog/types";
import { seo } from "#/lib/seo";

export const Route = createFileRoute("/changelog")({
  loader: ({ context }) => context.queryClient.ensureQueryData(changelogQueryOptions()),
  head: () => ({
    ...seo({
      title: "Changelog",
      description:
        "What's new in Battlify. Every release is included with your license, so you can update whenever you like.",
      path: "/changelog",
    }),
  }),
  component: ChangelogPage,
});

type Change = { label: string; body: string };

/** Forward-looking, not commitments. Edit freely as the real roadmap firms up. */
const ROADMAP: Change[] = [
  {
    label: "Scheduled charge limits",
    body: "Automate your ceiling by time of day, so it can ease up overnight and tighten during the workday without you touching it.",
  },
  {
    label: "Deeper health insights",
    body: "Richer trends in History: cycle counts, capacity over time, and how much high-charge time you've avoided.",
  },
  {
    label: "Localization",
    body: "Battlify in more languages, starting with the most-requested from the community.",
  },
];

function Spans({ spans }: { spans: Span[] }) {
  return (
    <>
      {spans.map((s, i) => {
        const key = `${i}-${s.v}`;
        if (s.t === "bold") {
          return (
            <strong key={key} className="font-semibold text-foreground">
              {s.v}
            </strong>
          );
        }
        if (s.t === "code") {
          return (
            <code key={key} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
              {s.v}
            </code>
          );
        }
        if (s.t === "link") {
          return (
            <a
              key={key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 transition-colors hover:text-primary"
            >
              {s.v}
            </a>
          );
        }
        return <span key={key}>{s.v}</span>;
      })}
    </>
  );
}

/** Renders parsed release notes, grouping runs of bullets into one list. */
function Notes({ blocks }: { blocks: Block[] }) {
  const out: React.ReactElement[] = [];
  let bullets: Block[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    out.push(
      <ul key={`bullets-${out.length}`} className="mt-3 space-y-3">
        {items.map((b, i) => (
          <li key={`${i}-${b.spans[0]?.v ?? ""}`} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden />
            <span className="text-muted-foreground">
              <Spans spans={b.spans} />
            </span>
          </li>
        ))}
      </ul>,
    );
  };

  for (const block of blocks) {
    if (block.t === "bullet") {
      bullets.push(block);
      continue;
    }
    flushBullets();

    if (block.t === "heading") {
      out.push(
        <h3
          key={`h-${out.length}`}
          className="mt-5 text-xs font-semibold tracking-[0.12em] text-primary uppercase"
        >
          <Spans spans={block.spans} />
        </h3>,
      );
    } else {
      out.push(
        <p key={`p-${out.length}`} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <Spans spans={block.spans} />
        </p>,
      );
    }
  }
  flushBullets();

  return <>{out}</>;
}

function ReleaseItem({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <li className="relative pb-12 pl-8 last:pb-0">
      <span
        className={
          latest
            ? "absolute top-1 -left-[7px] size-3.5 rounded-full bg-primary ring-4 ring-primary/20"
            : "absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-muted-foreground/40"
        }
        aria-hidden
      />

      <div className="flex items-center gap-2.5">
        <a
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-display text-xl font-bold tracking-tight transition-colors hover:text-primary"
        >
          v{release.version}
          <ArrowUpRightIcon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </a>
        {latest ? (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase">
            Latest
          </span>
        ) : null}
        {release.prerelease ? (
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Pre-release
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-xs text-muted-foreground">{release.date}</p>

      {release.blocks.length ? (
        <div className="mt-3">
          <Notes blocks={release.blocks} />
        </div>
      ) : (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          No notes for this release.
        </p>
      )}
    </li>
  );
}

function ChangelogPage() {
  const { data } = useSuspenseQuery(changelogQueryOptions());
  const latestVersion = data.releases.find((r) => !r.prerelease)?.version;

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link to="/">
            <Logo />
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to Battlify
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">Changelog</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
          What&apos;s new in Battlify
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Every release, straight from the source. Update whenever you like, every version is
          included with your license, forever.
        </p>

        <a
          href={LINKS.releases}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <DownloadIcon className="size-4" />
          Get the latest version
        </a>

        {data.stale ? (
          <p className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Live release notes are unavailable right now, so this is the last known snapshot. See{" "}
            <a
              href={LINKS.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              all releases on GitHub
            </a>
            .
          </p>
        ) : null}

        <ol className="relative mt-14 ml-2 border-l border-border">
          {data.releases.map((r) => (
            <ReleaseItem key={r.version} release={r} latest={r.version === latestVersion} />
          ))}

          <li className="relative pl-8">
            <span
              className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-muted-foreground/50 bg-background"
              aria-hidden
            />
            <h2 className="font-display text-xl font-bold tracking-tight text-muted-foreground">
              Planned next
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Roadmap, subject to change</p>
            <ul className="mt-4 space-y-3">
              {ROADMAP.map((c) => (
                <li key={c.label} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full border border-muted-foreground/50"
                    aria-hidden
                  />
                  <span>
                    <span className="font-semibold text-foreground">{c.label}</span>{" "}
                    <span className="text-muted-foreground">{c.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Battlify · built by broisnischal</p>
          <div className="flex items-center gap-5">
            <Link to="/legal/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/legal/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
