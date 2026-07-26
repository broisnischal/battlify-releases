const FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-07-22T17:04:22Z" -> "July 22, 2026". */
export function formatReleaseDate(iso: string) {
  return FORMAT.format(new Date(iso));
}
