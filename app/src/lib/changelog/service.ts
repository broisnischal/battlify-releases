import "@tanstack/react-start/server-only";
import { env as workerEnv } from "cloudflare:workers";

import { formatReleaseDate } from "./date";
import { FALLBACK_RELEASES } from "./fallback";
import type { Block, Changelog, Release, Span } from "./types";

const REPO = "broisnischal/battlify";
const API = `https://api.github.com/repos/${REPO}/releases?per_page=50`;
/** How long a successful GitHub response is reused, in ms. */
const TTL = 15 * 60 * 1000;
/** Seconds Cloudflare's edge cache holds the GitHub response. */
const EDGE_TTL = 900;

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
  draft: boolean;
  prerelease: boolean;
}

/** Links, bold, inline code, and bare URLs — the whole of GitHub's release-note vocabulary in practice. */
const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|(https?:\/\/[^\s)]+)/g;

/** Long GitHub URLs read as noise in a timeline; show what they point at instead. */
function shortenUrl(url: string) {
  const ref = /\/(?:pull|issues)\/(\d+)$/.exec(url);
  if (ref) return `#${ref[1]}`;
  const compare = /\/compare\/(.+)$/.exec(url);
  if (compare) return compare[1];
  return url.replace(/^https?:\/\/(?:www\.)?/, "");
}

function parseSpans(line: string): Span[] {
  const spans: Span[] = [];
  let cursor = 0;

  for (const m of line.matchAll(INLINE)) {
    const at = m.index;
    if (at > cursor) spans.push({ t: "text", v: line.slice(cursor, at) });

    if (m[1] !== undefined) spans.push({ t: "link", v: m[1], href: m[2] });
    else if (m[3] !== undefined) spans.push({ t: "bold", v: m[3] });
    else if (m[4] !== undefined) spans.push({ t: "code", v: m[4] });
    else spans.push({ t: "link", v: shortenUrl(m[5]), href: m[5] });

    cursor = at + m[0].length;
  }

  if (cursor < line.length) spans.push({ t: "text", v: line.slice(cursor) });
  return spans;
}

function parseBody(body: string, version: string): Block[] {
  const blocks: Block[] = [];
  const titleHeading = `battlify ${version}`;

  for (const raw of body.replaceAll("\r\n", "\n").split("\n")) {
    const line = raw.trim();
    if (!line || /^([-_*])\1{2,}$/.test(line)) continue;

    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (heading) {
      const text = heading[1].trim();
      // GitHub's own title heading repeats the version we already show.
      if (text.toLowerCase() === titleHeading) continue;
      blocks.push({ t: "heading", spans: parseSpans(text) });
      continue;
    }

    const bullet = /^[-*+]\s+(.*)$/.exec(line);
    blocks.push(
      bullet
        ? { t: "bullet", spans: parseSpans(bullet[1]) }
        : { t: "para", spans: parseSpans(line) },
    );
  }

  return blocks;
}

function toRelease(r: GitHubRelease): Release {
  const version = r.tag_name.replace(/^v/, "");
  const iso = r.published_at ?? r.created_at;
  return {
    version,
    url: r.html_url,
    publishedAt: iso,
    date: formatReleaseDate(iso),
    prerelease: r.prerelease,
    blocks: parseBody(r.body ?? "", version),
  };
}

async function fetchReleases(): Promise<Release[]> {
  const token = (workerEnv as { GITHUB_TOKEN?: string }).GITHUB_TOKEN;
  const init: RequestInit & { cf?: { cacheEverything: boolean; cacheTtl: number } } = {
    headers: {
      accept: "application/vnd.github+json",
      // GitHub rejects API requests that omit a User-Agent.
      "user-agent": "battlify-site",
      // Optional: lifts the 60/hour unauthenticated rate limit shared by all edge IPs.
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    cf: { cacheEverything: true, cacheTtl: EDGE_TTL },
  };

  const res = await fetch(API, init);
  if (!res.ok) throw new Error(`GitHub releases responded ${res.status}`);

  const raw = (await res.json()) as GitHubRelease[];
  return raw
    .filter((r) => !r.draft)
    .map(toRelease)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

let memo: { at: number; value: Changelog } | null = null;

/**
 * Live release notes from GitHub, memoised per isolate. Falls back to the last
 * good response, then to the bundled snapshot, so the page always renders.
 */
export async function getChangelog(): Promise<Changelog> {
  if (memo && Date.now() - memo.at < TTL) return memo.value;

  try {
    const releases = await fetchReleases();
    if (!releases.length) throw new Error("GitHub returned no releases");

    const value: Changelog = { releases, stale: false };
    memo = { at: Date.now(), value };
    return value;
  } catch (error) {
    console.error("changelog: GitHub fetch failed", error);
    return memo?.value ?? { releases: FALLBACK_RELEASES, stale: true };
  }
}
