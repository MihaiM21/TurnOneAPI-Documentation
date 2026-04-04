import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { DocH1, DocH2, DocH3, DocP, InlineCode, Callout } from "@/components/doc-primitives"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Changelog" }

const toc = [
  { id: "v1-2-0", label: "v1.2.0 — Apr 2025", level: 1 as const },
  { id: "v1-1-0", label: "v1.1.0 — Feb 2025", level: 1 as const },
  { id: "v1-0-1", label: "v1.0.1 — Jan 2025", level: 1 as const },
  { id: "v1-0-0", label: "v1.0.0 — Dec 2024", level: 1 as const },
]

type ChangeType = "new" | "improved" | "fixed" | "deprecated" | "breaking"

interface Change {
  type: ChangeType
  text: string
}

interface Release {
  id: string
  version: string
  date: string
  summary: string
  changes: Change[]
}

const releases: Release[] = [
  {
    id: "v1-2-0",
    version: "v1.2.0",
    date: "April 2025",
    summary: "Weather endpoint, improved tyre stint accuracy, and WebSocket heartbeat improvements.",
    changes: [
      { type: "new", text: "Added GET /sessions/{session_key}/weather endpoint with track temperature, humidity, wind, and rainfall data." },
      { type: "new", text: "weather channel is now available on WebSocket subscriptions." },
      { type: "improved", text: "Tyre stint detection accuracy improved for back-of-grid cars during safety car periods." },
      { type: "improved", text: "WebSocket heartbeat interval reduced to 30s (was 60s) for faster dead-connection detection." },
      { type: "improved", text: "car_data.update events now include DRS state as a numeric value (0, 8, 10, or 12)." },
      { type: "fixed", text: "Fixed an issue where session_key: 'current' WebSocket subscriptions would not reattach after session transitions." },
      { type: "fixed", text: "Fixed off-by-one error in lap segment colour arrays for laps with aborted sectors." },
    ],
  },
  {
    id: "v1-1-0",
    version: "v1.1.0",
    date: "February 2025",
    summary: "Go SDK release, expanded standings endpoint, and performance improvements.",
    changes: [
      { type: "new", text: "Official Go SDK published: github.com/turnonehub/t1api-go." },
      { type: "new", text: "GET /standings/constructors now returns pit stop count and fastest lap count per constructor." },
      { type: "new", text: "GET /standings/drivers now accepts a round parameter for mid-season snapshots." },
      { type: "improved", text: "REST API p99 latency reduced from 180ms to 42ms via edge caching improvements." },
      { type: "improved", text: "Python SDK updated to support Python 3.13 and added async context manager support." },
      { type: "improved", text: "X-RateLimit-Policy header added to all responses for RFC 9440 compliance." },
      { type: "fixed", text: "Fixed incorrect tyre_age_at_start values for drivers who changed tyres during a red flag." },
    ],
  },
  {
    id: "v1-0-1",
    version: "v1.0.1",
    date: "January 2025",
    summary: "Patch release addressing authentication edge cases and response envelope consistency.",
    changes: [
      { type: "fixed", text: "Fixed 401 responses that incorrectly returned an empty body instead of the standard error envelope." },
      { type: "fixed", text: "Fixed per_page values above 200 silently capping to 50 instead of returning a 422 error." },
      { type: "fixed", text: "Fixed race condition in WebSocket session key resolution when two sessions ended within 5 seconds." },
      { type: "improved", text: "Error responses now include a docs URL pointing to the relevant documentation section." },
    ],
  },
  {
    id: "v1-0-0",
    version: "v1.0.0",
    date: "December 2024",
    summary: "General Availability release of T1API v1.",
    changes: [
      { type: "new", text: "REST API v1 released with Sessions, Live Timing, Car Telemetry, GPS Position, Tyre Stints, Calendar, Drivers, Teams, Results, and Standings endpoints." },
      { type: "new", text: "WebSocket API v1 released with timing, car_data, position, laps, pits, and session channels." },
      { type: "new", text: "Official JavaScript/TypeScript and Python SDKs published." },
      { type: "new", text: "Free, Pro, and Enterprise plans available at turnonehub.com/dashboard." },
      { type: "new", text: "Sandbox environment with t1_test_ prefixed keys for testing without live data." },
    ],
  },
]

const changeTypeStyles: Record<ChangeType, { label: string; className: string }> = {
  new: { label: "New", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  improved: { label: "Improved", className: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  fixed: { label: "Fixed", className: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  deprecated: { label: "Deprecated", className: "bg-purple-500/15 text-purple-400 border-purple-500/30" },
  breaking: { label: "Breaking", className: "bg-red-500/15 text-red-400 border-red-500/30" },
}

export default function ChangelogPage() {
  return (
    <DocsPageWrapper
      toc={toc}
      prev={{ label: "SDKs & Libraries", href: "/docs/sdks" }}
    >
      <DocH1>Changelog</DocH1>
      <DocP>
        All notable changes to the T1API are documented here. T1API follows{" "}
        <a
          href="https://semver.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Semantic Versioning
        </a>
        . Breaking changes will always be accompanied by a major version bump and at least 6
        months&apos; migration notice.
      </DocP>

      <Callout variant="info">
        Subscribe to API updates via the{" "}
        <a href="https://turnonehub.com/dashboard" className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          dashboard
        </a>{" "}
        or watch the{" "}
        <a href="https://github.com/turnonehub" className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>{" "}
        for release notifications.
      </Callout>

      {releases.map((release) => (
        <section key={release.id} id={release.id} className="scroll-mt-20 mt-10">
          <div className="flex items-center gap-3 mb-2">
            <DocH2 id={release.id}>{release.version}</DocH2>
          </div>
          <div className="flex items-center gap-3 mb-4 -mt-2">
            <span className="text-xs font-mono text-muted-foreground">{release.date}</span>
            {release.id === "v1-2-0" && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                Latest
              </span>
            )}
          </div>
          <DocP>{release.summary}</DocP>

          <ul className="space-y-2.5">
            {release.changes.map((change, i) => {
              const style = changeTypeStyles[change.type]
              return (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 mt-0.5",
                      style.className
                    )}
                  >
                    {style.label}
                  </span>
                  <span className="text-muted-foreground leading-relaxed">{change.text}</span>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </DocsPageWrapper>
  )
}
