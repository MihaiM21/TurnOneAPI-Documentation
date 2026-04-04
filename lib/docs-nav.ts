export interface NavItem {
  label: string
  href: string
  badge?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
  defaultOpen?: boolean
}

export const docsNav: NavSection[] = [
  {
    title: "Getting Started",
    defaultOpen: true,
    items: [
      { label: "Introduction", href: "/docs" },
      { label: "Quick Start", href: "/docs#quick-start" },
      { label: "Authentication", href: "/docs#authentication" },
      { label: "Rate Limits", href: "/docs#rate-limits" },
      { label: "Base URL", href: "/docs#base-url" },
      { label: "Response Formats", href: "/docs#response-formats" },
      { label: "Errors", href: "/docs#errors" },
      { label: "Status Codes", href: "/docs#status-codes" },
    ],
  },
  {
    title: "V1 Endpoints",
    items: [
      { label: "Overview", href: "/docs/endpoints#v1-overview" },
      { label: "Top Speed", href: "/docs/endpoints#v1-top-speed" },
      { label: "Throttle Comparison", href: "/docs/endpoints#v1-throttle" },
      { label: "Qualifying Results", href: "/docs/endpoints#v1-qualifying" },
      { label: "Speed Distribution", href: "/docs/endpoints#v1-speed-dist" },
      { label: "Lap Times", href: "/docs/endpoints#v1-laptimes" },
      { label: "2-Driver Comparison", href: "/docs/endpoints#v1-2driver" },
      { label: "Seasonal Data", href: "/docs/endpoints#v1-seasonal" },
      { label: "Analytics", href: "/docs/endpoints#v1-analytics" },
    ],
  },
  {
    title: "V2 Endpoints",
    items: [
      { label: "Overview", href: "/docs/endpoints#v2-overview" },
      { label: "Top Speed Telemetry", href: "/docs/endpoints#v2-top-speed" },
      { label: "Speed Trap", href: "/docs/endpoints#v2-speed-trap" },
      { label: "Throttle Comparison", href: "/docs/endpoints#v2-throttle" },
      { label: "Speed Distribution", href: "/docs/endpoints#v2-speed-dist" },
      { label: "Seasonal Events", href: "/docs/endpoints#v2-seasonal" },
    ],
  },
  {
    title: "Static & General",
    items: [
      { label: "Static Drivers", href: "/docs/endpoints#static-drivers" },
      { label: "Static Teams", href: "/docs/endpoints#static-teams" },
      { label: "Static Circuits", href: "/docs/endpoints#static-circuits" },
      { label: "Dashboard & Daily", href: "/docs/endpoints#general" },
      { label: "Health Check", href: "/docs/endpoints#health" },
    ],
  },
  {
    title: "Monitoring",
    items: [
      { label: "Overview", href: "/docs/endpoints#monitoring-overview" },
      { label: "System Metrics", href: "/docs/endpoints#monitoring-system" },
      { label: "Request Tracking", href: "/docs/endpoints#monitoring-requests" },
      { label: "Prometheus", href: "/docs/endpoints#monitoring-prometheus" },
    ],
  },
  {
    title: "Data Structures",
    items: [
      { label: "Telemetry Schema", href: "/docs/schemas#telemetry" },
      { label: "Timing Data", href: "/docs/schemas#timing" },
      { label: "Session Params", href: "/docs/schemas#session-params" },
      { label: "Error Responses", href: "/docs/schemas#errors" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "SDKs & Libraries", href: "/docs/sdks" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
]
