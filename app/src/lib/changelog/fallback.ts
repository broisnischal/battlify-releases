import { formatReleaseDate } from "./date";
import type { Release } from "./types";

/**
 * Hand-written notes for the releases that existed when the page went live.
 * Only rendered when the GitHub API is unreachable, so the changelog degrades
 * to something useful instead of an empty timeline.
 */
const SNAPSHOT: [version: string, iso: string, lines: string[]][] = [
  [
    "0.10.1",
    "2026-07-14T00:00:00Z",
    ["Fixed the missing app icon that could show up on Battlify notifications."],
  ],
  [
    "0.10.0",
    "2026-07-14T00:00:00Z",
    [
      "Refreshed the app icon, and fixed save-mode persistence so your settings stick across restarts.",
    ],
  ],
  [
    "0.9.3",
    "2026-07-05T00:00:00Z",
    [
      "Always Active is now opt-in on battery power, no longer limited to AC, so you can keep your Mac awake on the go when you choose to.",
    ],
  ],
  [
    "0.9.2",
    "2026-07-05T00:00:00Z",
    [
      "Discharge is now gated on physical adapter presence, ending an oscillation where the battery would flip between charging and discharging.",
      "Folds in v0.9.1: display-off on lid close, HugeIcons battery glyphs, light and dark themes, new animations, plus notification and battery-accuracy fixes.",
    ],
  ],
  [
    "0.9.0",
    "2026-07-04T00:00:00Z",
    [
      "New History view with clear controls, charging and battery sessions, a daily summary, and high-charge time tracking.",
    ],
  ],
  ["0.8.4", "2026-07-01T00:00:00Z", ["Fixes and refinements."]],
  ["0.8.3", "2026-07-01T00:00:00Z", ["Fixes and refinements."]],
  ["0.8.2", "2026-07-01T00:00:00Z", ["Fixes and refinements."]],
  ["0.8.1", "2026-07-01T00:00:00Z", ["First public release."]],
];

export const FALLBACK_RELEASES: Release[] = SNAPSHOT.map(([version, iso, lines]) => ({
  version,
  url: `https://github.com/broisnischal/battlify/releases/tag/v${version}`,
  publishedAt: iso,
  date: formatReleaseDate(iso),
  prerelease: false,
  blocks: lines.map((v) => ({ t: "bullet", spans: [{ t: "text", v }] })),
}));
