import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { CodeBlock } from "@/components/code-block"
import {
  DocH1, DocH2, DocH3, DocP, InlineCode, EndpointCard, ParamTable, Callout, DataTable, DocDivider,
} from "@/components/doc-primitives"

export const metadata: Metadata = { title: "REST Endpoints" }

const toc = [
  { id: "v1-overview", label: "V1 Overview", level: 1 as const },
  { id: "v1-top-speed", label: "Top Speed", level: 2 as const },
  { id: "v1-throttle", label: "Throttle Comparison", level: 2 as const },
  { id: "v1-qualifying", label: "Qualifying Results", level: 2 as const },
  { id: "v1-speed-dist", label: "Speed Distribution", level: 2 as const },
  { id: "v1-laptimes", label: "Lap Times", level: 2 as const },
  { id: "v1-2driver", label: "2-Driver Comparison", level: 2 as const },
  { id: "v1-seasonal", label: "Seasonal Data", level: 2 as const },
  { id: "v1-analytics", label: "Analytics", level: 2 as const },
  { id: "v2-overview", label: "V2 Overview", level: 1 as const },
  { id: "v2-top-speed", label: "Top Speed Telemetry", level: 2 as const },
  { id: "v2-speed-trap", label: "Speed Trap", level: 2 as const },
  { id: "v2-throttle", label: "Throttle Comparison", level: 2 as const },
  { id: "v2-speed-dist", label: "Speed Distribution", level: 2 as const },
  { id: "v2-seasonal", label: "Seasonal Events", level: 2 as const },
  { id: "static-drivers", label: "Static — Drivers", level: 1 as const },
  { id: "static-teams", label: "Static — Teams", level: 1 as const },
  { id: "static-circuits", label: "Static — Circuits", level: 1 as const },
  { id: "general", label: "General", level: 1 as const },
  { id: "health", label: "Health Check", level: 2 as const },
  { id: "monitoring-overview", label: "Monitoring", level: 1 as const },
  { id: "monitoring-system", label: "System Metrics", level: 2 as const },
  { id: "monitoring-requests", label: "Request Tracking", level: 2 as const },
  { id: "monitoring-prometheus", label: "Prometheus", level: 2 as const },
]

const commonSessionParams = [
  { name: "year", type: "integer", required: true, description: "Race season year (2018–2030)", default: "" },
  { name: "gp", type: "integer", required: true, description: "Grand Prix round number (1–24)", default: "" },
  { name: "session", type: "string", required: true, description: "Session type: Q, R, FP1, FP2, FP3, S, SQ", default: "" },
]

const commonV2SessionParams = [
  { name: "year", type: "integer", required: true, description: "Race season year (2018–2030)", default: "" },
  { name: "gp", type: "integer or string", required: true, description: "Round number, event key, or official name (case-insensitive partial match)", default: "" },
  { name: "session", type: "string", required: true, description: "Session type: Q, R, Practice, Qualifying, Sprint, etc.", default: "" },
]

export default function EndpointsPage() {
  return (
    <DocsPageWrapper
      toc={toc}
      prev={{ label: "Introduction", href: "/docs" }}
      next={{ label: "Data Schemas", href: "/docs/schemas" }}
    >
      <DocH1>REST Endpoints</DocH1>
      <DocP>
        All endpoints are served from{" "}
        <InlineCode>https://api.t1f1.com</InlineCode>. Every request (except{" "}
        <InlineCode>GET /api/health</InlineCode> and <InlineCode>GET /</InlineCode>) requires
        the <InlineCode>X-API-Key</InlineCode> header. Responses are either a binary PNG image
        or a JSON object depending on the path suffix (<InlineCode>-plot</InlineCode> vs{" "}
        <InlineCode>-data</InlineCode>).
      </DocP>

      {/* ===================== V1 ===================== */}
      <section id="v1-overview" className="scroll-mt-20">
        <DocH2 id="v1-overview">V1 — FastF1 Pipeline</DocH2>
        <DocP>
          V1 endpoints are powered by the <strong>FastF1</strong> Python library, which caches
          F1 timing data locally. They support historical data from 2018 onwards and are ideal
          for deeper lap-level analysis.
        </DocP>
        <Callout variant="info">
          All V1 analysis endpoints accept the same three session parameters:{" "}
          <InlineCode>year</InlineCode>, <InlineCode>gp</InlineCode> (round number), and{" "}
          <InlineCode>session</InlineCode>.
        </Callout>
      </section>

      {/* V1 Top Speed */}
      <section id="v1-top-speed" className="scroll-mt-20">
        <DocH3 id="v1-top-speed">Top Speed</DocH3>
        <DocP>
          Returns the highest recorded speed for each driver during the specified session.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/top-speed-plot" description="PNG plot ranking all drivers by top speed." />
        <EndpointCard method="GET" path="/api/v1/top-speed-data" description="JSON array of top speed records per driver." />
        <ParamTable params={commonSessionParams} />
        <CodeBlock
          language="bash"
          code={`curl "https://api.t1f1.com/api/v1/top-speed-data?year=2025&gp=1&session=Q" \\
  -H "X-API-Key: YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "drivers": [
    {
      "driver_code": "VER",
      "driver_name": "Max Verstappen",
      "top_speed": 355.0,
      "lap_number": 12,
      "session": "Q"
    },
    {
      "driver_code": "HAM",
      "driver_name": "Lewis Hamilton",
      "top_speed": 352.5,
      "lap_number": 8,
      "session": "Q"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* V1 Throttle */}
      <section id="v1-throttle" className="scroll-mt-20">
        <DocH3 id="v1-throttle">Throttle Comparison</DocH3>
        <DocP>
          Throttle application patterns for all drivers across the session.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/throttle-comparison-plot" description="PNG showing throttle application per driver." />
        <EndpointCard method="GET" path="/api/v1/throttle-comparison-data" description="JSON throttle data per driver." />
        <ParamTable params={commonSessionParams} />
      </section>

      <DocDivider />

      {/* V1 Qualifying */}
      <section id="v1-qualifying" className="scroll-mt-20">
        <DocH3 id="v1-qualifying">Qualifying Results</DocH3>
        <DocP>
          Qualifying session results including best lap times, tyre compounds, and session segments (Q1/Q2/Q3).
        </DocP>
        <EndpointCard method="GET" path="/api/v1/qualifying-results-plot" description="PNG qualifying results chart." />
        <EndpointCard method="GET" path="/api/v1/qualifying-results-data" description="JSON structured qualifying results." />
        <ParamTable params={[
          ...commonSessionParams.slice(0, 2),
          { name: "session", type: "string", required: true, description: "Use Q for qualifying", default: "" },
        ]} />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "session": {
    "year": 2025,
    "round": 1,
    "event_name": "Bahrain Grand Prix",
    "session_type": "Qualifying"
  },
  "results": [
    {
      "position": 1,
      "driver_code": "VER",
      "driver_name": "Max Verstappen",
      "team": "Red Bull Racing",
      "q1_time": "1:31.234",
      "q2_time": "1:30.876",
      "q3_time": "1:30.445",
      "tyre_compound": "SOFT"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* V1 Speed Distribution */}
      <section id="v1-speed-dist" className="scroll-mt-20">
        <DocH3 id="v1-speed-dist">Speed Distribution</DocH3>
        <DocP>
          Distribution of speeds across the track for all drivers or a specific driver.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/speed-distribution-plot" description="PNG speed distribution histogram." />
        <EndpointCard method="GET" path="/api/v1/speed-distribution-data" description="JSON speed distribution data." />
        <ParamTable params={[
          ...commonSessionParams,
          { name: "driver", type: "string", required: false, description: "3-letter driver code (e.g. VER). Omit for all drivers.", default: "" },
        ]} />
      </section>

      <DocDivider />

      {/* V1 Lap Times */}
      <section id="v1-laptimes" className="scroll-mt-20">
        <DocH3 id="v1-laptimes">Lap Times</DocH3>
        <DocP>
          Single-driver lap-by-lap timing data for the specified session.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/laptimes" description="JSON array of lap times for a single driver." />
        <ParamTable params={[
          ...commonSessionParams,
          { name: "driver", type: "string", required: true, description: "3-letter uppercase driver code (e.g. VER, HAM, LEC)", default: "" },
        ]} />
        <CodeBlock
          language="bash"
          code={`curl "https://api.t1f1.com/api/v1/laptimes?year=2025&gp=1&session=R&driver=VER" \\
  -H "X-API-Key: YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "driver": "VER",
  "session": "R",
  "laps": [
    { "lap_number": 1, "lap_time": "1:34.211", "tyre": "MEDIUM", "is_pit_out": true },
    { "lap_number": 2, "lap_time": "1:32.455", "tyre": "MEDIUM", "is_pit_out": false }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* V1 2-Driver */}
      <section id="v1-2driver" className="scroll-mt-20">
        <DocH3 id="v1-2driver">2-Driver Comparison</DocH3>
        <DocP>
          Head-to-head telemetry comparisons between two drivers on the same lap.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/track-comparison-2drivers-plot" description="Track map coloured by relative speed between two drivers." />
        <EndpointCard method="GET" path="/api/v1/track-comparison-2drivers-data" description="JSON track comparison data." />
        <EndpointCard method="GET" path="/api/v1/throttleBrake-comparison-2drivers-plot" description="Throttle and brake overlay for two drivers." />
        <EndpointCard method="GET" path="/api/v1/throttleBrake-comparison-2drivers-data" description="JSON throttle/brake comparison data." />
        <ParamTable params={[
          ...commonSessionParams,
          { name: "driver1", type: "string", required: true, description: "First driver code (e.g. VER)", default: "" },
          { name: "driver2", type: "string", required: true, description: "Second driver code (e.g. HAM)", default: "" },
        ]} />
        <CodeBlock
          language="bash"
          code={`curl "https://api.t1f1.com/api/v1/throttleBrake-comparison-2drivers-data?year=2025&gp=1&session=Q&driver1=VER&driver2=LEC" \\
  -H "X-API-Key: YOUR_KEY"`}
        />
      </section>

      <DocDivider />

      {/* V1 Seasonal */}
      <section id="v1-seasonal" className="scroll-mt-20">
        <DocH3 id="v1-seasonal">Seasonal Data</DocH3>
        <DocP>
          Season-level driver and team reference data via the V1 pipeline.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/seasons" description="List all available seasons." />
        <EndpointCard method="GET" path="/api/v1/season/{year}" description="Complete season data including all rounds." />
        <EndpointCard method="GET" path="/api/v1/season/{year}/drivers" description="All drivers for the specified season." />
        <EndpointCard method="GET" path="/api/v1/season/{year}/teams" description="All constructors for the specified season." />
        <EndpointCard method="GET" path="/api/v1/season/{year}/driver/{driver_code}" description="Full profile for a single driver in that season." />
        <EndpointCard method="GET" path="/api/v1/season/{year}/team/{team_name}" description="Full profile for a single constructor." />
        <CodeBlock
          language="json"
          filename="GET /api/v1/season/2025/drivers — response"
          code={`{
  "year": 2025,
  "drivers": [
    {
      "number": 1,
      "code": "VER",
      "first_name": "Max",
      "last_name": "Verstappen",
      "team": "Red Bull Racing"
    },
    {
      "number": 44,
      "code": "HAM",
      "first_name": "Lewis",
      "last_name": "Hamilton",
      "team": "Ferrari"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* V1 Analytics */}
      <section id="v1-analytics" className="scroll-mt-20">
        <DocH3 id="v1-analytics">Analytics</DocH3>
        <DocP>
          Aggregate usage and session statistics generated by the V1 pipeline.
        </DocP>
        <EndpointCard method="GET" path="/api/v1/analytics/daily" description="Daily session statistics and request counts." />
        <EndpointCard method="GET" path="/api/v1/analytics/total" description="Cumulative analytics across all processed sessions." />
        <ParamTable params={[
          { name: "date_str", type: "string", required: false, description: "Date filter in YYYY-MM-DD format. Defaults to today.", default: "" },
        ]} />
      </section>

      <DocDivider />

      {/* ===================== V2 ===================== */}
      <section id="v2-overview" className="scroll-mt-20">
        <DocH2 id="v2-overview">V2 — Direct F1 Client</DocH2>
        <DocP>
          V2 endpoints use a custom <strong>F1StaticClient</strong> that connects directly to{" "}
          <InlineCode>livetiming.formula1.com</InlineCode>, bypassing FastF1. This pipeline
          supports real-time data, is faster for current-season sessions, and gives full control
          over raw telemetry streams (CarData, PositionData, TimingData).
        </DocP>
        <Callout variant="info">
          V2 session parameters accept a flexible <InlineCode>gp</InlineCode> value: round number,
          event key, or official event name (case-insensitive, partial match supported).
        </Callout>
      </section>

      {/* V2 Top Speed */}
      <section id="v2-top-speed" className="scroll-mt-20">
        <DocH3 id="v2-top-speed">Top Speed Telemetry</DocH3>
        <DocP>
          Peak speed derived directly from telemetry channel 0 of the CarData stream.
        </DocP>
        <EndpointCard method="GET" path="/api/v2/top-speed-telemetry-plot" description="PNG bar chart of top speeds from telemetry." />
        <EndpointCard method="GET" path="/api/v2/top-speed-telemetry-data" description="JSON top speed data from telemetry stream." />
        <ParamTable params={commonV2SessionParams} />
        <CodeBlock
          language="bash"
          code={`curl "https://api.t1f1.com/api/v2/top-speed-telemetry-data?year=2025&gp=Bahrain&session=Q" \\
  -H "X-API-Key: YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "drivers": [
    {
      "driver_code": "VER",
      "driver_name": "Max Verstappen",
      "top_speed": 326.4,
      "lap_number": 15,
      "session": "Q"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* V2 Speed Trap */}
      <section id="v2-speed-trap" className="scroll-mt-20">
        <DocH3 id="v2-speed-trap">Speed Trap</DocH3>
        <DocP>
          Speed trap comparison using official F1 speed trap sensors (ST data). Differs from
          telemetry top speed in that it captures a fixed measurement point on track.
        </DocP>
        <EndpointCard method="GET" path="/api/v2/top-speed-st-plot" description="PNG speed trap comparison chart." />
        <EndpointCard method="GET" path="/api/v2/top-speed-st-data" description="JSON speed trap data." />
        <ParamTable params={commonV2SessionParams} />
      </section>

      <DocDivider />

      {/* V2 Throttle */}
      <section id="v2-throttle" className="scroll-mt-20">
        <DocH3 id="v2-throttle">Throttle Comparison</DocH3>
        <DocP>
          Throttle application patterns sourced from telemetry channel 4 (throttle, 0–100%) of the
          V2 CarData stream.
        </DocP>
        <EndpointCard method="GET" path="/api/v2/throttle-comparison-plot" description="PNG throttle comparison from V2 telemetry." />
        <EndpointCard method="GET" path="/api/v2/throttle-comparison-data" description="JSON throttle data from V2 telemetry." />
        <ParamTable params={commonV2SessionParams} />
      </section>

      <DocDivider />

      {/* V2 Speed Distribution */}
      <section id="v2-speed-dist" className="scroll-mt-20">
        <DocH3 id="v2-speed-dist">Speed Distribution</DocH3>
        <DocP>
          Speed distribution across the full session sourced from the V2 direct client.
        </DocP>
        <EndpointCard method="GET" path="/api/v2/speed-distribution-plot" description="PNG speed distribution from V2 telemetry." />
        <EndpointCard method="GET" path="/api/v2/speed-distribution-data" description="JSON speed distribution from V2 telemetry." />
        <ParamTable params={commonV2SessionParams} />
      </section>

      <DocDivider />

      {/* V2 Seasonal */}
      <section id="v2-seasonal" className="scroll-mt-20">
        <DocH3 id="v2-seasonal">Seasonal Events</DocH3>
        <DocP>
          Race calendar and session schedule data pulled directly from the F1 API via the V2 client.
          Supports event name matching with case-insensitive partial string search.
        </DocP>
        <EndpointCard method="GET" path="/api/v2/seasons/{year}/events" description="All events in the specified season." />
        <EndpointCard method="GET" path="/api/v2/seasons/{year}/events/{event_name}/sessions" description="All sessions for a specific event (e.g. Bahrain)." />
        <CodeBlock
          language="bash"
          code={`# List all 2025 events
curl "https://api.t1f1.com/api/v2/seasons/2025/events" -H "X-API-Key: YOUR_KEY"

# Get sessions for Bahrain (partial match)
curl "https://api.t1f1.com/api/v2/seasons/2025/events/Bahrain/sessions" -H "X-API-Key: YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          filename="GET /api/v2/seasons/2025/events — response"
          code={`{
  "year": 2025,
  "events": [
    {
      "round": 1,
      "event_name": "Bahrain Grand Prix",
      "circuit": "Bahrain International Circuit",
      "location": "Sakhir",
      "date": "2025-03-16"
    },
    {
      "round": 2,
      "event_name": "Saudi Arabian Grand Prix",
      "circuit": "Jeddah Corniche Circuit",
      "location": "Jeddah",
      "date": "2025-03-23"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* ===================== STATIC ===================== */}
      <section id="static-drivers" className="scroll-mt-20">
        <DocH2 id="static-drivers">Static — Drivers</DocH2>
        <DocP>
          Curated driver reference data. The <InlineCode>year</InlineCode> parameter accepts
          2025–2026 for static endpoints.
        </DocP>
        <EndpointCard method="GET" path="/api/static/drivers" description="List all drivers for the given season." />
        <EndpointCard method="GET" path="/api/static/drivers/{driver_name}" description="Full profile for a named driver." />
        <ParamTable params={[
          { name: "year", type: "integer", required: false, description: "Season year (2025–2026). Defaults to current.", default: "current" },
        ]} />
        <CodeBlock
          language="json"
          filename="GET /api/static/drivers/Verstappen"
          code={`{
  "number": 1,
  "code": "VER",
  "first_name": "Max",
  "last_name": "Verstappen",
  "team": "Red Bull Racing",
  "nationality": "Dutch",
  "date_of_birth": "1997-09-30",
  "world_championships": 4
}`}
        />
      </section>

      <DocDivider />

      <section id="static-teams" className="scroll-mt-20">
        <DocH2 id="static-teams">Static — Teams</DocH2>
        <EndpointCard method="GET" path="/api/static/teams" description="List all constructors for the given season." />
        <EndpointCard method="GET" path="/api/static/teams/{team_name}" description="Full constructor profile by name." />
        <ParamTable params={[
          { name: "year", type: "integer", required: false, description: "Season year (2025–2026). Defaults to current.", default: "current" },
        ]} />
        <CodeBlock
          language="json"
          filename="GET /api/static/teams/Red Bull"
          code={`{
  "name": "Red Bull Racing",
  "full_name": "Oracle Red Bull Racing",
  "colour": "#0600EF",
  "drivers": ["VER", "PER"],
  "chassis": "RB21",
  "power_unit": "Honda RBPT",
  "base": "Milton Keynes, UK"
}`}
        />
      </section>

      <DocDivider />

      <section id="static-circuits" className="scroll-mt-20">
        <DocH2 id="static-circuits">Static — Circuits</DocH2>
        <EndpointCard method="GET" path="/api/static/circuits" description="All race circuits with location and characteristics." />
        <CodeBlock
          language="json"
          filename="response item"
          code={`{
  "key": "bahrain",
  "name": "Bahrain International Circuit",
  "location": "Sakhir",
  "country": "Bahrain",
  "lap_length_km": 5.412,
  "turns": 15,
  "drs_zones": 3,
  "first_gp": 2004
}`}
        />
      </section>

      <DocDivider />

      {/* ===================== GENERAL ===================== */}
      <section id="general" className="scroll-mt-20">
        <DocH2 id="general">General Endpoints</DocH2>
        <EndpointCard method="GET" path="/" description="Welcome message and API version info." />
        <EndpointCard method="GET" path="/api/dashboard" description="Latest session dashboard summary including fastest lap and podium." />
        <EndpointCard method="GET" path="/api/daily-data" description="Daily summary plots across all processed sessions for a given date." />
        <ParamTable params={[
          { name: "date_str", type: "string", required: false, description: "Date in YYYY-MM-DD format. Defaults to today.", default: "today" },
          { name: "limit", type: "integer", required: false, description: "Number of records to return (1–1000).", default: "50" },
        ]} />
        <CodeBlock
          language="json"
          filename="GET /api/dashboard — response"
          code={`{
  "session": {
    "year": 2025,
    "round": 1,
    "event_name": "Bahrain Grand Prix",
    "session_type": "Race",
    "date": "2025-03-16"
  },
  "data": {
    "fastest_lap": "VER",
    "fastest_lap_time": 80123,
    "podium": ["VER", "LEC", "SAI"]
  }
}`}
        />
      </section>

      <DocDivider />

      {/* Health */}
      <section id="health" className="scroll-mt-20">
        <DocH3 id="health">Health Check</DocH3>
        <DocP>
          Public endpoint — no API key required. Returns the operational status of the API and its
          connected services.
        </DocP>
        <EndpointCard method="GET" path="/api/health" description="Health check — public, no auth required." />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "status": "healthy",
  "version": "1.0.0",
  "environment": "production",
  "checks": {
    "database": "ok",
    "cache": "ok",
    "data_source": "ok"
  }
}`}
        />
      </section>

      <DocDivider />

      {/* ===================== MONITORING ===================== */}
      <section id="monitoring-overview" className="scroll-mt-20">
        <DocH2 id="monitoring-overview">Monitoring</DocH2>
        <DocP>
          The API exposes a suite of observability endpoints. All monitoring endpoints require
          authentication and are intended for operators and dashboards.
        </DocP>
        <DataTable
          headers={["Path", "Description"]}
          rows={[
            ["/api/monitoring/system", "Real-time CPU, RAM, disk, and network usage"],
            ["/api/monitoring/requests", "Recent requests with request_id, method, path, duration, status"],
            ["/api/monitoring/errors", "Recent errors with type, message, stack trace, and request_id"],
            ["/api/monitoring/stats", "Per-endpoint statistics: total requests, error rate, avg/min/max response time"],
            ["/api/monitoring/load", "Current active request count, overall error rate, and system load"],
          ]}
        />
      </section>

      <section id="monitoring-system" className="scroll-mt-20">
        <DocH3 id="monitoring-system">System Metrics</DocH3>
        <EndpointCard method="GET" path="/api/monitoring/system" description="Real-time server resource utilization." />
        <CodeBlock
          language="json"
          filename="GET /api/monitoring/system — response"
          code={`{
  "cpu": { "process_percent": 25.5, "system_percent": 45.2 },
  "memory": {
    "process_mb": 245.3,
    "process_percent": 12.1,
    "available_mb": 7654.2,
    "total_mb": 16384.0
  },
  "disk": {
    "usage_percent": 68.3,
    "available_gb": 45.2,
    "total_gb": 119.2
  },
  "uptime": 86400,
  "uptime_human": "1 day"
}`}
        />
      </section>

      <section id="monitoring-requests" className="scroll-mt-20">
        <DocH3 id="monitoring-requests">Request Tracking</DocH3>
        <DocP>
          Every request is assigned a unique <InlineCode>request_id</InlineCode> (UUID) for
          correlation across logs and error reports.
        </DocP>
        <EndpointCard method="GET" path="/api/monitoring/requests" description="Recent requests with full tracing metadata." />
        <EndpointCard method="GET" path="/api/monitoring/errors" description="Recent errors with stack traces and request context." />
        <EndpointCard method="GET" path="/api/monitoring/stats" description="Aggregate per-endpoint request statistics." />
        <EndpointCard method="GET" path="/api/monitoring/load" description="Current active request count and error rate." />
        <CodeBlock
          language="json"
          filename="GET /api/monitoring/requests — response item"
          code={`{
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-04-04T12:34:56.789Z",
  "method": "GET",
  "path": "/api/v1/top-speed-plot",
  "endpoint": "quali_top_speed_plot",
  "status_code": 200,
  "duration_ms": 1234,
  "client_ip": "192.168.1.100",
  "api_key_tier": "standard"
}`}
        />
      </section>

      <section id="monitoring-prometheus" className="scroll-mt-20">
        <DocH3 id="monitoring-prometheus">Prometheus Metrics</DocH3>
        <DocP>
          The <InlineCode>/metrics</InlineCode> endpoint exposes standard Prometheus format metrics
          for scraping. No authentication is required for this endpoint to support Prometheus server
          ingestion.
        </DocP>
        <EndpointCard method="GET" path="/metrics" description="Prometheus metrics — no auth required." />
        <CodeBlock
          language="text"
          filename="sample output"
          code={`# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",endpoint="/api/v1/top-speed-plot",status="200"} 1234

# HELP http_request_duration_seconds HTTP request latency
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{endpoint="/api/v1/top-speed-plot",le="0.1"} 156
http_request_duration_seconds_bucket{endpoint="/api/v1/top-speed-plot",le="0.5"} 842
http_request_duration_seconds_bucket{endpoint="/api/v1/top-speed-plot",le="+Inf"} 1234`}
        />
      </section>
    </DocsPageWrapper>
  )
}
