/** Inline run of text inside a release-note line. */
export type Span =
  | { t: "text"; v: string }
  | { t: "bold"; v: string }
  | { t: "code"; v: string }
  | { t: "link"; v: string; href: string };

/** One structural line of a release body, in document order. */
export type Block =
  | { t: "heading"; spans: Span[] }
  | { t: "bullet"; spans: Span[] }
  | { t: "para"; spans: Span[] };

export interface Release {
  /** Version without the leading "v", e.g. "0.13.0". */
  version: string;
  /** GitHub release page for the tag. */
  url: string;
  /** ISO timestamp, used for ordering. */
  publishedAt: string;
  /** Human date, e.g. "July 22, 2026". */
  date: string;
  prerelease: boolean;
  /** Parsed release notes; empty when the release has no body. */
  blocks: Block[];
}

export interface Changelog {
  /** Newest first. */
  releases: Release[];
  /** True when GitHub was unreachable and `releases` is the bundled snapshot. */
  stale: boolean;
}
