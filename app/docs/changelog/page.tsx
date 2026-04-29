import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { DocH1, DocH2, DocH3, DocP, InlineCode, Callout } from "@/components/doc-primitives"
import { cn } from "@/lib/utils"

export const metadata: Metadata = { title: "Changelog" }

const toc = [
  { id: "v1-3-3", label: "v1.3.3 — Apr 2026", level: 1 as const },
  { id: "v1-3-2", label: "v1.3.2 — Apr 2026", level: 1 as const },
  { id: "v1-3-1", label: "v1.3.1 — Apr 2026", level: 1 as const },
  { id: "v1-3-0", label: "v1.3.0 — Mar 2026", level: 1 as const },
  { id: "v1-2-1", label: "v1.2.1 — Mar 2026", level: 1 as const },
  { id: "v1-2-0", label: "v1.2.0 — Mar 2026", level: 1 as const },
  { id: "v1-1-0", label: "v1.1.0 — Feb 2026", level: 1 as const },
  { id: "v1-0-2", label: "v1.0.2 — Jan 2026", level: 1 as const },
  { id: "v1-0-1", label: "v1.0.1 — Dec 2025", level: 1 as const },
  { id: "v1-0-0", label: "v1.0.0 — Dec 2025", level: 1 as const },
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
    id: "v1-3-5",
    version: "v1.3.5",
    date: "April 18, 2026",
    summary: "Updated the data for Bahrain and Saudi Arabian GPs.",
    changes: [
      { type: "fixed", text: "Added cancelled info for the bahrain and saudi arabian gps." },
    ],
  },
  {
    id: "v1-3-4",
    version: "v1.3.4",
    date: "April 7, 2026",
    summary: "New static data endpoints for driver and team data.",
    changes: [
      { type: "improved", text: "Added static data endpoints for driver and team data." },
    ],
  },
  {
    id: "v1-3-3",
    version: "v1.3.3",
    date: "April 3, 2026",
    summary: "Performance improvements and Docker file updates.",
    changes: [
      { type: "improved", text: "Docker files updated." },
    ],
  },
  {
    id: "v1-3-2",
    version: "v1.3.2",
    date: "April 2, 2026",
    summary: "Bug fix for Dockerfile.",
    changes: [
      { type: "fixed", text: "Dockerfile." },
    ],
  },
  {
    id: "v1-3-1",
    version: "v1.3.1",
    date: "April 2, 2026",
    summary: "Added authorization login for Swagger UI.",
    changes: [
      { type: "improved", text: "Added authorization login for the Swagger UI." },
    ],
  },
  {
    id: "v1-3-0",
    version: "v1.3.0",
    date: "March 13, 2026",
    summary: "New plot analysis type and refactored static client and dashboard endpoint.",
    changes: [
      { type: "new", text: "Implemented new plot analysis type and refactored static client and dashboard endpoint." },
    ],
  },
  {
    id: "v1-2-1",
    version: "v1.2.1",
    date: "March 7, 2026",
    summary: "Bug fix for MongoDB saving.",
    changes: [
      { type: "fixed", text: "Fixed bug with saving to MongoDB." },
    ],
  },
  {
    id: "v1-2-0",
    version: "v1.2.0",
    date: "March 1, 2026",
    summary: "New endpoints for grand prix and sessions with improved comparison features.",
    changes: [
      { type: "new", text: "Added new endpoints for available grand prix and sessions from them." },
      { type: "new", text: "Added throttle comparison v2 and improved static client data mapping." },
      { type: "new", text: "V2 endpoints can now accept gp key, gp official name or round number." },
      { type: "fixed", text: "Fixed top speed v2 calculation." },
    ],
  },
  {
    id: "v1-1-0",
    version: "v1.1.0",
    date: "February 7, 2026",
    summary: "Added monitoring and fixed driver number for 2026 season.",
    changes: [
      { type: "new", text: "Added monitoring." },
      { type: "fixed", text: "Fixed Lando Norris driver number for the 2026 season (4 → 1)." },
    ],
  },
  {
    id: "v1-0-2",
    version: "v1.0.2",
    date: "January 1, 2026",
    summary: "Bug fix for two drivers comparison data processing.",
    changes: [
      { type: "fixed", text: "Fixed 2 drivers comparison data process." },
    ],
  },
  {
    id: "v1-0-1",
    version: "v1.0.1",
    date: "December 31, 2025",
    summary: "Docker Compose configuration fix.",
    changes: [
      { type: "fixed", text: "Fixed Docker Compose configuration." },
    ],
  },
  {
    id: "v1-0-0",
    version: "v1.0.0",
    date: "December 31, 2025",
    summary: "Initial release with pipeline and versioning updates.",
    changes: [
      { type: "new", text: "Pipeline and versioning update." },
      { type: "fixed", text: "Fixed Docker configuration." },
      { type: "fixed", text: "Fixed Docker Compose configuration." },
      { type: "fixed", text: "Fixed lap times distribution calculation." },
      { type: "fixed", text: "Fixed latest session retrieval." },
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
        <a href="https://github.com/Turn-One-Organization" className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">
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
            {release.id === "v1-3-3" && (
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
