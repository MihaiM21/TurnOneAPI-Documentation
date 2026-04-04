import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { CodeBlock, TabCodeBlock } from "@/components/code-block"
import {
  DocH1, DocH2, DocH3, DocP, InlineCode, Callout, DataTable, DocDivider,
} from "@/components/doc-primitives"

export const metadata: Metadata = {
  title: "Introduction",
}

const toc = [
  { id: "introduction", label: "Introduction", level: 1 as const },
  { id: "quick-start", label: "Quick Start", level: 1 as const },
  { id: "step-1", label: "1. Get your API key", level: 2 as const },
  { id: "step-2", label: "2. Make a request", level: 2 as const },
  { id: "step-3", label: "3. Parse the response", level: 2 as const },
  { id: "authentication", label: "Authentication", level: 1 as const },
  { id: "key-tiers", label: "Key Tiers", level: 2 as const },
  { id: "rate-limits", label: "Rate Limits", level: 1 as const },
  { id: "rate-limit-headers", label: "Rate Limit Headers", level: 2 as const },
  { id: "base-url", label: "Base URL", level: 1 as const },
  { id: "session-params", label: "Session Parameters", level: 1 as const },
  { id: "response-formats", label: "Response Formats", level: 1 as const },
  { id: "png-responses", label: "PNG Responses", level: 2 as const },
  { id: "json-responses", label: "JSON Responses", level: 2 as const },
  { id: "errors", label: "Errors", level: 1 as const },
  { id: "status-codes", label: "HTTP Status Codes", level: 2 as const },
]

export default function DocsIntroPage() {
  return (
    <DocsPageWrapper
      toc={toc}
      next={{ label: "REST Endpoints", href: "/docs/endpoints" }}
    >
      {/* Intro */}
      <section id="introduction" className="scroll-mt-20">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono text-primary uppercase tracking-widest">Turn One Hub</span>
          <span className="text-border">/</span>
          <span className="text-[11px] font-mono text-muted-foreground">T1API Reference v1.0</span>
        </div>
        <DocH1 id="introduction">T1API Documentation</DocH1>
        <DocP>
          T1API is a production-grade Formula 1 telemetry analysis and visualization platform.
          It provides programmatic access to real-time and historical F1 session data — including
          speed, throttle, brake, driver comparisons, qualifying results, and full telemetry —
          via a clean REST API deployed at{" "}
          <InlineCode>api.t1f1.com</InlineCode>.
        </DocP>
        <DocP>
          The API is built with FastAPI and exposes two data pipelines: <strong>V1</strong> (powered
          by the FastF1 library) and <strong>V2</strong> (a custom direct client to{" "}
          <InlineCode>livetiming.formula1.com</InlineCode>). All major analysis endpoints return
          both a PNG visualization and a JSON data payload.
        </DocP>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { label: "Base URL", value: "https://api.t1f1.com" },
            { label: "Auth Header", value: "X-API-Key: <key>" },
            { label: "Seasons Covered", value: "2018 — present" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg border border-border bg-card">
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-sm font-mono text-foreground">{item.value}</div>
            </div>
          ))}
        </div>

        <DataTable
          headers={["Pipeline", "Data Source", "Best For"]}
          rows={[
            ["V1 (/api/v1/…)", "FastF1 library (local cache)", "Historical analysis, 2018+ data"],
            ["V2 (/api/v2/…)", "Direct livetiming.formula1.com client", "Real-time and latest season data"],
            ["Static (/api/static/…)", "Curated reference data", "Drivers, teams, circuits"],
          ]}
        />
      </section>

      <DocDivider />

      {/* Quick Start */}
      <section id="quick-start" className="scroll-mt-20">
        <DocH2 id="quick-start">Quick Start</DocH2>
        <DocP>
          Get up and running in under two minutes. You need an API key and a single HTTP request.
        </DocP>

        <DocH3 id="step-1">1. Get your API key</DocH3>
        <DocP>
          Contact the Turn One Hub team via{" "}
          <a href="https://turnonehub.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            turnonehub.com
          </a>{" "}
          or your dashboard to obtain an API key. Keys are issued per application and are associated
          with a rate-limit tier (Public, Standard, or Premium).
        </DocP>
        <Callout variant="warning">
          Store your API key in an environment variable. Never commit it to source control or expose
          it in client-side code.
        </Callout>

        <DocH3 id="step-2">2. Make your first request</DocH3>
        <DocP>
          Pass your key in the <InlineCode>X-API-Key</InlineCode> header. All requests are{" "}
          <InlineCode>GET</InlineCode> with query string parameters.
        </DocP>
        <TabCodeBlock
          tabs={[
            {
              label: "cURL",
              language: "bash",
              code: `curl -X GET "https://api.t1f1.com/api/v2/top-speed-telemetry-data?year=2025&gp=1&session=Q" \\
  -H "X-API-Key: YOUR_API_KEY"`,
            },
            {
              label: "JavaScript",
              language: "javascript",
              code: `const res = await fetch(
  "https://api.t1f1.com/api/v2/top-speed-telemetry-data?year=2025&gp=1&session=Q",
  {
    headers: { "X-API-Key": "YOUR_API_KEY" },
  }
);
const data = await res.json();
console.log(data.drivers[0]); // { driver_code: "VER", top_speed: 326.4, ... }`,
            },
            {
              label: "Python",
              language: "python",
              code: `import requests

resp = requests.get(
    "https://api.t1f1.com/api/v2/top-speed-telemetry-data",
    params={"year": 2025, "gp": 1, "session": "Q"},
    headers={"X-API-Key": "YOUR_API_KEY"},
)
data = resp.json()
print(data["drivers"][0])  # {"driver_code": "VER", "top_speed": 326.4, ...}`,
            },
          ]}
        />

        <DocH3 id="step-3">3. Parse the response</DocH3>
        <CodeBlock
          language="json"
          filename="response.json"
          code={`{
  "drivers": [
    {
      "driver_code": "VER",
      "driver_name": "Max Verstappen",
      "top_speed": 326.4,
      "lap_number": 15,
      "session": "Q"
    },
    {
      "driver_code": "LEC",
      "driver_name": "Charles Leclerc",
      "top_speed": 324.1,
      "lap_number": 14,
      "session": "Q"
    }
  ]
}`}
        />
      </section>

      <DocDivider />

      {/* Authentication */}
      <section id="authentication" className="scroll-mt-20">
        <DocH2 id="authentication">Authentication</DocH2>
        <DocP>
          T1API uses API key authentication. Pass your key in the{" "}
          <InlineCode>X-API-Key</InlineCode> request header on every protected endpoint.
          The health check (<InlineCode>GET /api/health</InlineCode>) and root endpoint are
          publicly accessible without a key.
        </DocP>

        <CodeBlock
          language="http"
          code={`GET /api/v2/top-speed-telemetry-data?year=2025&gp=1&session=Q HTTP/1.1
Host: api.t1f1.com
X-API-Key: your_api_key_here`}
        />

        <Callout variant="info">
          In development mode with no keys configured, requests are accepted without authentication.
          This only applies when the environment is set to <InlineCode>development</InlineCode>.
        </Callout>

        <DocH3 id="key-tiers">Key Tiers</DocH3>
        <DocP>
          API keys are issued in three tiers with different rate limits and access levels:
        </DocP>
        <DataTable
          headers={["Tier", "Header Required", "Access"]}
          rows={[
            ["Public", "None", "Health check, root endpoint only"],
            ["Standard", "X-API-Key: <key>", "All V1, V2, and static endpoints"],
            ["Premium", "X-API-Key: <premium-key>", "All Standard access + elevated rate limits; reserved for turnonehub.com and t1f1.com"],
          ]}
        />
      </section>

      <DocDivider />

      {/* Rate Limits */}
      <section id="rate-limits" className="scroll-mt-20">
        <DocH2 id="rate-limits">Rate Limits</DocH2>
        <DocP>
          Rate limiting is applied on a rolling window. Exceeding the limit returns a{" "}
          <InlineCode>429 Too Many Requests</InlineCode>. Limits are tracked separately per API key
          (or per IP for the public tier).
        </DocP>

        <DataTable
          headers={["Tier", "Requests / min", "Requests / hour", "Identifier"]}
          rows={[
            ["Public", "30", "500", "public:{ip_address}"],
            ["Standard", "100", "2,000", "standard:{api_key}"],
            ["Premium", "300", "10,000", "premium:{api_key}"],
            ["Data endpoints (all tiers)", "60", "1,000", "data:{tier}:{identifier}"],
          ]}
        />

        <Callout variant="warning">
          Endpoints whose path ends in <InlineCode>-data</InlineCode> (e.g.{" "}
          <InlineCode>/api/v2/top-speed-telemetry-data</InlineCode>) use a separate counter.
          This counter is additive to the tier counter — both limits apply simultaneously.
        </Callout>

        <DocH3 id="rate-limit-headers">Rate Limit Headers</DocH3>
        <DocP>Every response includes the following headers:</DocP>
        <CodeBlock
          language="http"
          code={`X-RateLimit-Limit: 300
X-RateLimit-Remaining: 297
X-RateLimit-Reset: 1743768060`}
        />
      </section>

      <DocDivider />

      {/* Base URL */}
      <section id="base-url" className="scroll-mt-20">
        <DocH2 id="base-url">Base URL</DocH2>
        <DocP>All production requests must be made over HTTPS to:</DocP>
        <CodeBlock language="text" code={`https://api.t1f1.com`} />
        <DocP>
          Endpoint paths include the version prefix: <InlineCode>/api/v1/</InlineCode> or{" "}
          <InlineCode>/api/v2/</InlineCode>. Static reference data lives under{" "}
          <InlineCode>/api/static/</InlineCode>.
        </DocP>
      </section>

      <DocDivider />

      {/* Session Parameters */}
      <section id="session-params" className="scroll-mt-20">
        <DocH2 id="session-params">Session Parameters</DocH2>
        <DocP>
          Analysis endpoints require three query parameters that identify the specific session:
        </DocP>

        <DataTable
          headers={["Parameter", "Type", "Range / Values", "Description"]}
          rows={[
            ["year", "integer", "2018 – 2030", "Race season year"],
            ["gp", "integer (V1) or string/int (V2)", "1–24 or event name", "Grand Prix round number, event key, or official name"],
            ["session", "string", "Q, R, FP1, FP2, FP3, S, SQ, …", "Session type abbreviation"],
          ]}
        />

        <CodeBlock
          language="bash"
          code={`# V1 — round number only
curl "https://api.t1f1.com/api/v1/top-speed-data?year=2025&gp=1&session=Q" \\
  -H "X-API-Key: YOUR_KEY"

# V2 — round number or event name
curl "https://api.t1f1.com/api/v2/top-speed-telemetry-data?year=2025&gp=Bahrain&session=Q" \\
  -H "X-API-Key: YOUR_KEY"`}
        />

        <DocP>
          Driver parameters use the official 3-letter uppercase code (e.g.{" "}
          <InlineCode>VER</InlineCode>, <InlineCode>HAM</InlineCode>). Two-driver comparison
          endpoints require both <InlineCode>driver1</InlineCode> and{" "}
          <InlineCode>driver2</InlineCode>.
        </DocP>
      </section>

      <DocDivider />

      {/* Response Formats */}
      <section id="response-formats" className="scroll-mt-20">
        <DocH2 id="response-formats">Response Formats</DocH2>
        <DocP>
          Every major analysis endpoint offers two response variants — a PNG visualization and a
          JSON data export — at parallel paths:
        </DocP>

        <DataTable
          headers={["Path suffix", "Content-Type", "Body"]}
          rows={[
            ["-plot", "image/png", "Binary PNG image ready for display"],
            ["-data", "application/json", "Structured JSON with driver/session data"],
          ]}
        />

        <DocH3 id="png-responses">PNG Responses</DocH3>
        <DocP>
          Plot endpoints return a binary PNG. Save the response body directly to a file or pipe it
          into an <InlineCode>&lt;img&gt;</InlineCode> tag via a data URL.
        </DocP>
        <CodeBlock
          language="python"
          code={`import requests

resp = requests.get(
    "https://api.t1f1.com/api/v1/top-speed-plot",
    params={"year": 2025, "gp": 1, "session": "Q"},
    headers={"X-API-Key": "YOUR_KEY"},
)
# resp.headers["Content-Type"] == "image/png"
with open("top_speed_bahrain_q.png", "wb") as f:
    f.write(resp.content)`}
        />

        <DocH3 id="json-responses">JSON Responses</DocH3>
        <DocP>
          Data endpoints return a JSON object. The exact shape varies per endpoint — consult the
          individual endpoint docs for the full schema.
        </DocP>
        <CodeBlock
          language="json"
          filename="example — /api/v1/top-speed-data"
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

      {/* Errors */}
      <section id="errors" className="scroll-mt-20">
        <DocH2 id="errors">Errors</DocH2>
        <DocP>
          All error responses follow a consistent JSON structure. The{" "}
          <InlineCode>detail</InlineCode> field contains a human-readable description.
          The <InlineCode>request_id</InlineCode> is included for support and tracing.
        </DocP>
        <CodeBlock
          language="json"
          filename="error response"
          code={`{
  "detail": "Plot not found for Y2025 GP1 Q",
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-04-04T12:34:56.789Z"
}`}
        />

        <DocH3 id="status-codes">HTTP Status Codes</DocH3>
        <DataTable
          headers={["Status", "Meaning", "Common Cause"]}
          rows={[
            ["200 OK", "Success", "Request processed, data or image returned"],
            ["400 Bad Request", "Invalid parameters", "Missing year/gp/session, invalid driver code"],
            ["401 Unauthorized", "No API key", "X-API-Key header missing"],
            ["403 Forbidden", "Invalid API key", "Key not in allowed list"],
            ["404 Not Found", "Resource missing", "Session data not yet processed or unavailable"],
            ["429 Too Many Requests", "Rate limit exceeded", "Back off and retry after X-RateLimit-Reset"],
            ["500 Internal Server Error", "Server error", "Unexpected failure — contact support with request_id"],
            ["503 Service Unavailable", "Temporarily down", "Retry after a short delay"],
          ]}
        />
      </section>
    </DocsPageWrapper>
  )
}
