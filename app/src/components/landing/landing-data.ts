export const LINKS = {
  github: "https://github.com/broisnischal/battlify",
  releases: "https://github.com/broisnischal/battlify/releases",
  feedback: "https://github.com/broisnischal/battlify/issues",
} as const;

export type MomentArt = "bar" | "thermo" | "moon" | "led" | "awake" | "devices" | "history";

/**
 * Chapters in the demo recording (public/battlify-demo.mp4), in seconds.
 * Clicking one seeks the player, so keep the times pointed at the moment the
 * relevant pane is actually on screen.
 */
export const CHAPTERS = [
  { at: 12, label: "Charge limit" },
  { at: 30, label: "Schedules" },
  { at: 62, label: "When the lid closes" },
  { at: 96, label: "Keep-awake for agents" },
  { at: 140, label: "Battery details" },
  { at: 158, label: "History" },
] as const;

export type CapabilityIcon =
  | "lid"
  | "agents"
  | "remote"
  | "devices"
  | "music"
  | "timer"
  | "history"
  | "details";

/**
 * What Battlify actually does, in the order people care about it: the closed
 * lid first, the battery chemistry second. One card per section of the app.
 */
export const CAPABILITIES = [
  {
    icon: "lid",
    title: "Closed means closed",
    body: "Shut the lid and Super Save takes over: display and keyboard backlight off, drain pulled down to almost nothing, everything restored the moment you open it. Take it out of your bag at the charge you put it in.",
  },
  {
    icon: "agents",
    title: "Agents keep working, lid shut",
    body: "Terminal jobs, builds and coding agents keep running with the lid closed. Name the processes that matter — claude, npm, docker, ffmpeg, rsync — and the Mac stays awake only while they are actually running.",
  },
  {
    icon: "remote",
    title: "Reachable from your phone",
    body: "Keep the network alive while closed and a shut MacBook still answers. SSH in over Tailscale from your phone and pick the terminal up exactly where you left it, lid down, in your bag.",
  },
  {
    icon: "devices",
    title: "Your AirPods stay yours",
    body: "Drop Bluetooth and Wi-Fi when the lid closes, restore them on wake. A closed Mac stops stealing your headphones, keyboard and mouse, and you never have to remember to switch anything off.",
  },
  {
    icon: "music",
    title: "Music does not stop",
    body: "Audio keeps playing with the lid down, so a closed MacBook on a shelf is still a speaker. Close it mid-song and the song keeps going.",
  },
  {
    icon: "timer",
    title: "Sleeps when the work is done",
    body: "Let an overnight build or download finish, wait half a minute to be sure it is really done, then put the Mac to sleep on its own. An overnight job stops meaning an overnight awake Mac.",
  },
  {
    icon: "history",
    title: "Every closed session, on the record",
    body: "History logs each lid-closed stretch and what it cost: twenty-two hours in a bag, seventy-three percent to seventy-three percent. Below it, a daily summary with time on battery, charge range and peak temperature.",
  },
  {
    icon: "details",
    title: "The numbers, live",
    body: "Health, cycle count, temperature and real capacity, plus a live power flow: what the adapter pushes in, what the system draws, what the battery is doing right now. No extra dashboard to install.",
  },
] as const satisfies ReadonlyArray<{ icon: CapabilityIcon; title: string; body: string }>;

/** Smaller things worth naming, shown as a quiet list under the capability grid. */
export const ALSO = [
  "Weekly charge schedules",
  "Heat guardrails",
  "MagSafe LED status",
  "Save Modes",
  "Menu bar icon styles",
  "Charge notifications",
  "Per-Wi-Fi network profiles",
  "Power Nap control",
] as const;

// The narrative beats of "the fix", each a scene with its own micro-visual.
// Rendered as a sequenced, alternating scroll story, not a flat card grid.
export const MOMENTS = [
  {
    eye: "Hold the line",
    title: "Stops at a number you love.",
    body: "Pick any ceiling from 50 to 100 percent and Battlify keeps it right there, with a small buffer so the charger is not clicking on and off all day. A battery that lives around 80 percent simply lasts longer. Heading out? One tap tops it up to 100, then it drops back on its own.",
    note: 'Works with both of Apple\'s charging schemes: the older CH0B/CH0C keys and the newer CHTE on macOS 26 "Tahoe".',
    art: "bar",
  },
  {
    eye: "Even asleep",
    title: "Holds through the night.",
    body: "Most limiters clock out the second your Mac falls asleep, and macOS quietly creeps you back to 100 percent by morning. Battlify does not. It stops charging just before sleep, or keeps the Mac awake on wall power, so your limit never slips overnight.",
    art: "moon",
  },
  {
    eye: "Lid down, still working",
    title: "Your agents do not need the screen.",
    body: "Always Active keeps terminal jobs and background work running with the lid shut, while the display and keyboard backlight switch off to save power. Point it at the processes you care about and it holds the Mac awake only while they run, then lets it sleep.",
    note: "Pick from what is running right now, or type names like ffmpeg, npm, docker, rsync. Add a temperature guardrail so a closed Mac never cooks itself.",
    art: "awake",
  },
  {
    eye: "Bag-safe",
    title: "A closed Mac stops grabbing your devices.",
    body: "Every Mac owner knows the feeling: AirPods connect to the laptop in your bag instead of your phone. Battlify drops Bluetooth and Wi-Fi as the lid closes and brings them back on wake, so the closed machine goes quiet and your devices stay with you.",
    art: "devices",
  },
  {
    eye: "Keeps its cool",
    title: "Backs off when it runs hot.",
    body: "Heat ages a battery faster than cycles ever will, and every 10 degrees roughly doubles the damage. Set a temperature you are happy with and charging pauses the moment things warm up, then resumes once they cool. The menu always tells you why, so it never feels broken.",
    art: "thermo",
  },
  {
    eye: "Receipts",
    title: "See what the lid actually cost you.",
    body: "History keeps every closed session and every stretch on battery, with the exact charge you lost and how warm it ran. Twenty-two hours closed for no drop at all is the kind of line that ends the argument about whether any of this works.",
    art: "history",
  },
  {
    eye: "One glance",
    title: "Your cable tells the truth.",
    body: "Battlify drives the MagSafe light straight from the real charge state. Amber while it fills, green the instant it is holding at your limit. One look at the cable and you know exactly what is happening, without opening a thing.",
    art: "led",
  },
] as const satisfies ReadonlyArray<{
  eye: string;
  title: string;
  body: string;
  note?: string;
  art: MomentArt;
}>;

export const SPECS = [
  { n: "macOS 14+", l: "Sonoma and later" },
  { n: "Apple Silicon", l: "arm64 native" },
  { n: "Native Swift", l: "event-driven, low energy" },
  { n: "Menu-bar only", l: "no Dock icon, no clutter" },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Pulled my MacBook out of my bag and it was at the exact same charge. First time ever.",
    who: "MacBook Pro user",
    src: "GitHub",
  },
  {
    quote: "Set it to 80% once and forgot about it. The menu-bar UI is genuinely lovely.",
    who: "Apple Silicon dev",
    src: "Reddit",
  },
  {
    quote: "My AirPods used to connect to my closed laptop constantly. Not anymore. Bliss.",
    who: "Designer",
    src: "Email",
  },
  {
    quote: "Heat-aware charging got me through a whole summer of hot dock sessions.",
    who: "Remote worker",
    src: "GitHub",
  },
  {
    quote: "Amber to green on the MagSafe cable is such a tiny, perfect detail.",
    who: "M3 MacBook Air owner",
    src: "Feedback",
  },
  {
    quote: "$2.99 for something this polished feels almost unfair. Instant buy.",
    who: "Power user",
    src: "Email",
  },
] as const;

// Plain-language answers to the questions people actually ask before buying.
// Also serialized into FAQPage JSON-LD, so keep the answers self-contained.
export const FAQS = [
  {
    q: "Which Macs does Battlify support?",
    a: "Battlify runs on Apple Silicon Macs (M1 and later) on macOS 14 Sonoma or newer, including macOS 26 Tahoe. It is a native menu bar app, so there is no Dock icon and almost no energy cost.",
  },
  {
    q: "Does a charge limit really make my battery last longer?",
    a: "Yes. Lithium-ion batteries wear out fastest when they sit full and warm. Holding the charge around 80 percent keeps the battery in its low-stress range, which slows the loss of capacity over time.",
  },
  {
    q: "Does the limit hold while my Mac is asleep?",
    a: "It can. Battlify either stops charging just before sleep or keeps the Mac awake on wall power, so macOS cannot quietly push you back to 100 percent overnight.",
  },
  {
    q: "Does my Mac still drain when I close the lid?",
    a: "That is the problem Battlify was built for. Super Save takes over as the lid closes, switching off the display and keyboard backlight and cutting background wake, so a MacBook can sit closed in a bag for a day and come out at the charge you left it. Battery History logs each closed session so you can see the drop for yourself.",
  },
  {
    q: "Can I keep terminal jobs or coding agents running with the lid closed?",
    a: "Yes. Always Active keeps terminal jobs, builds and agents such as Claude Code running with the lid shut. You can limit it to specific processes, so the Mac stays awake only while that work is running and sleeps once it finishes.",
  },
  {
    q: "Can I SSH into my Mac while the lid is closed?",
    a: "Yes. With keep-awake on and the network kept alive during sleep, a closed Mac still answers over the network, so you can SSH in over Tailscale from your phone and use the terminal with the lid down.",
  },
  {
    q: "Will music keep playing when I close the lid?",
    a: "Yes. With keep-awake enabled the Mac does not sleep when the lid closes, so audio keeps playing while the display and keyboard backlight switch off.",
  },
  {
    q: "Can I stop my AirPods connecting to my closed MacBook?",
    a: "Yes. Battlify can turn Bluetooth and Wi-Fi off as the lid closes and restore them when you open it, so a closed Mac stops claiming your AirPods, keyboard and mouse without you having to remember to switch anything off.",
  },
  {
    q: "How much does Battlify cost?",
    a: "Battlify is a one-time purchase of $2.99. There is no subscription, updates are free for life, and you can try every feature free for 30 days before you decide.",
  },
  {
    q: "Can I move my license to another Mac?",
    a: "Yes. A license is locked to one Mac at a time, and you can move it to a new machine once every 30 days.",
  },
  {
    q: "Is my data private?",
    a: "Battlify does the battery work locally on your Mac and does not route your usage through our servers. The website stores only the account and license details needed to sell and support the app.",
  },
] as const;
