import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { CodeBlock, TabCodeBlock } from "@/components/code-block"
import {
  DocH1, DocH2, DocH3, DocP, InlineCode, Callout, DataTable, DocDivider,
} from "@/components/doc-primitives"

export const metadata: Metadata = { title: "Real-Time Data" }

const toc = [
  { id: "overview", label: "Overview", level: 1 as const },
  { id: "v2-pipeline", label: "V2 Live Data", level: 1 as const },
  { id: "polling", label: "Polling Strategy", level: 1 as const },
  { id: "polling-timing", label: "Timing Endpoints", level: 2 as const },
  { id: "polling-telemetry", label: "Telemetry Endpoints", level: 2 as const },
  { id: "polling-example", label: "Polling Example", level: 2 as const },
  { id: "rate-limit-guidance", label: "Rate Limit Guidance", level: 1 as const },
  { id: "monitoring-load", label: "Live Load Endpoint", level: 1 as const },
  { id: "data-freshness", label: "Data Freshness", level: 1 as const },
  { id: "caching", label: "Caching Behaviour", level: 1 as const },
]

export default function RealTimePage() {
  return (
    <DocsPageWrapper
      toc={toc}
      prev={{ label: "Data Schemas", href: "/docs/schemas" }}
      next={{ label: "SDKs & Libraries", href: "/docs/sdks" }}
    >
      <DocH1>Real-Time Data</DocH1>
      <DocP>
        T1API is a REST API — it does not expose a WebSocket endpoint. Real-time data is delivered
        by polling the analysis endpoints, which source live session data directly from{" "}
        <InlineCode>livetiming.formula1.com</InlineCode> via the V2 pipeline. This page explains
        how to use the API effectively during live sessions.
      </DocP>

      <section id="overview" className="scroll-mt-20">
        <DocH2 id="overview">How Live Data Works</DocH2>
        <DocP>
          When a session is active, V2 endpoints call the F1 live timing server on every request
          before returning a response. The result is cached in MongoDB with a configurable TTL
          (default: 3,600 seconds). During a live session, the cache is invalidated based on
          session state changes to keep data fresh.
        </DocP>
        <DataTable
          headers={["Pipeline", "Data Source", "Latency", "Best For"]}
          rows={[
            ["V1 (/api/v1/…)", "FastF1 local cache", "Higher — requires local cache warmup", "Historical analysis and post-race review"],
            ["V2 (/api/v2/…)", "livetiming.formula1.com (direct)", "Low — direct API call", "Live sessions, current season"],
          ]}
        />
      </section>

      <DocDivider />

      <section id="v2-pipeline" className="scroll-mt-20">
        <DocH2 id="v2-pipeline">V2 Live Data</DocH2>
        <DocP>
          The V2 pipeline parses three live data streams simultaneously to build its responses:
        </DocP>
        <DataTable
          headers={["Stream", "Content", "Update Frequency"]}
          rows={[
            ["CarData.z.jsonStream", "Speed, RPM, gear, throttle, brake per car", "~3.7 Hz (every 270 ms)"],
            ["PositionData.z.jsonStream", "X/Y/Z coordinates per car", "~3.7 Hz (every 270 ms)"],
            ["TimingData.json", "Lap times, sector times, gaps, pit status", "~200 ms during session"],
          ]}
        />
        <Callout variant="info">
          The <InlineCode>gp</InlineCode> parameter on V2 endpoints supports case-insensitive partial
          name matching, so <InlineCode>gp=Bahrain</InlineCode> will match{" "}
          <InlineCode>Bahrain Grand Prix</InlineCode>. During a live session use the round number
          for reliability.
        </Callout>
      </section>

      <DocDivider />

      <section id="polling" className="scroll-mt-20">
        <DocH2 id="polling">Polling Strategy</DocH2>
        <DocP>
          To display live data in your application, poll the relevant V2 endpoints on a timed
          interval. The recommended interval is <strong>5–15 seconds</strong> for most use cases.
          Polling faster than your rate limit allows will result in{" "}
          <InlineCode>429 Too Many Requests</InlineCode> responses.
        </DocP>

        <DocH3 id="polling-timing">Timing Endpoints</DocH3>
        <DocP>
          Use the top speed and throttle data endpoints to show live driver rankings during a session:
        </DocP>
        <CodeBlock
          language="text"
          code={`# Recommended for live timing display
GET /api/v2/top-speed-telemetry-data?year=2025&gp=1&session=Q

# Session event list (update less frequently)
GET /api/v2/seasons/2025/events`}
        />

        <DocH3 id="polling-telemetry">Telemetry Endpoints</DocH3>
        <DocP>
          Speed distribution and throttle comparison give a broader picture of the session as it
          progresses:
        </DocP>
        <CodeBlock
          language="text"
          code={`GET /api/v2/speed-distribution-data?year=2025&gp=1&session=Q
GET /api/v2/throttle-comparison-data?year=2025&gp=1&session=Q`}
        />

        <DocH3 id="polling-example">Polling Example</DocH3>
        <TabCodeBlock
          tabs={[
            {
              label: "JavaScript",
              language: "javascript",
              code: `const API_KEY = process.env.T1_API_KEY;
const BASE = "https://api.t1f1.com";
let timer = null;

async function fetchLiveTiming(year, gp, session) {
  const res = await fetch(
    \`\${BASE}/api/v2/top-speed-telemetry-data?year=\${year}&gp=\${gp}&session=\${session}\`,
    { headers: { "X-API-Key": API_KEY } }
  );

  if (res.status === 429) {
    // Respect rate limit reset
    const reset = res.headers.get("X-RateLimit-Reset");
    const delay = reset ? (parseInt(reset) * 1000 - Date.now()) : 15000;
    console.warn(\`Rate limited — retrying in \${delay}ms\`);
    clearInterval(timer);
    setTimeout(() => startPolling(year, gp, session), delay);
    return;
  }

  const data = await res.json();
  renderDriverTable(data.drivers);
}

function startPolling(year, gp, session) {
  fetchLiveTiming(year, gp, session); // immediate first call
  timer = setInterval(() => fetchLiveTiming(year, gp, session), 10000); // 10s interval
}

startPolling(2025, 1, "Q");`,
            },
            {
              label: "Python",
              language: "python",
              code: `import time
import requests

API_KEY = "YOUR_API_KEY"
BASE = "https://api.t1f1.com"

def fetch_live_timing(year: int, gp: int, session: str) -> dict:
    resp = requests.get(
        f"{BASE}/api/v2/top-speed-telemetry-data",
        params={"year": year, "gp": gp, "session": session},
        headers={"X-API-Key": API_KEY},
    )
    if resp.status_code == 429:
        reset = int(resp.headers.get("X-RateLimit-Reset", 0))
        delay = max(reset - time.time(), 15)
        print(f"Rate limited — sleeping {delay:.0f}s")
        time.sleep(delay)
        return {}
    resp.raise_for_status()
    return resp.json()

def poll(year: int, gp: int, session: str, interval: int = 10):
    while True:
        data = fetch_live_timing(year, gp, session)
        if data:
            for driver in data.get("drivers", []):
                print(f"{driver['driver_code']}: {driver['top_speed']} km/h")
        time.sleep(interval)

poll(2025, 1, "Q")`,
            },
          ]}
        />
      </section>

      <DocDivider />

      <section id="rate-limit-guidance" className="scroll-mt-20">
        <DocH2 id="rate-limit-guidance">Rate Limit Guidance for Live Polling</DocH2>
        <DocP>
          Data endpoints (paths ending in <InlineCode>-data</InlineCode>) have their own shared
          counter of 60 req/min across all tiers. Plan your polling intervals accordingly:
        </DocP>
        <DataTable
          headers={["Interval", "Req/min (1 endpoint)", "Tier Required", "Headroom for other -data calls"]}
          rows={[
            ["2 seconds", "30", "Standard (60/min data)", "50%"],
            ["5 seconds", "12", "Standard", "80%"],
            ["10 seconds", "6", "Standard", "90%"],
            ["30 seconds", "2", "Public (30/min total)", "~93%"],
          ]}
        />
        <Callout variant="warning">
          Always check the <InlineCode>X-RateLimit-Remaining</InlineCode> header on each response.
          When it reaches 0, stop polling until after the <InlineCode>X-RateLimit-Reset</InlineCode>{" "}
          timestamp (Unix epoch).
        </Callout>
      </section>

      <DocDivider />

      <section id="monitoring-load" className="scroll-mt-20">
        <DocH2 id="monitoring-load">Live Load Endpoint</DocH2>
        <DocP>
          The <InlineCode>/api/monitoring/load</InlineCode> endpoint provides a snapshot of the
          API&apos;s current state — active request count, error rate, and system resource utilization.
          Poll this at a low frequency (e.g. every 60 seconds) to build a lightweight health
          indicator for your application.
        </DocP>
        <CodeBlock
          language="bash"
          code={`curl "https://api.t1f1.com/api/monitoring/load" -H "X-API-Key: YOUR_KEY"`}
        />
        <CodeBlock
          language="json"
          filename="response"
          code={`{
  "timestamp": "2025-04-04T12:34:56.789Z",
  "active_requests": 12,
  "system": {
    "cpu_percent": 28.3,
    "memory_percent": 42.1,
    "memory_mb": 6912
  },
  "requests": {
    "total": 50000,
    "total_errors": 230,
    "error_rate_percent": 0.46
  },
  "uptime": "15 days, 3:42:18"
}`}
        />
      </section>

      <DocDivider />

      <section id="data-freshness" className="scroll-mt-20">
        <DocH2 id="data-freshness">Data Freshness</DocH2>
        <DataTable
          headers={["Situation", "V2 Data Freshness", "Notes"]}
          rows={[
            ["Session active (live)", "< 30 seconds", "Cache TTL is short during sessions; V2 re-fetches from F1 server"],
            ["Session just finished", "< 5 minutes", "Final data may take a few minutes to propagate"],
            ["Historical session (cached)", "Permanent", "MongoDB cache hit — instant response, no re-fetch needed"],
            ["Session not yet processed", "N/A — 404", "Request data once the session has started and data is available"],
          ]}
        />
      </section>

      <DocDivider />

      <section id="caching" className="scroll-mt-20">
        <DocH2 id="caching">Caching Behaviour</DocH2>
        <DocP>
          T1API uses a two-layer cache:
        </DocP>
        <DataTable
          headers={["Layer", "Storage", "TTL", "Scope"]}
          rows={[
            ["Response cache", "MongoDB", "3,600 s (1 hour)", "Per session + endpoint combination"],
            ["FastF1 local cache", "Disk (Docker volume)", "Permanent", "V1 pipeline only — raw F1 data files"],
          ]}
        />
        <DocP>
          Cache invalidation is triggered automatically when a session state change is detected
          (e.g. a lap is completed, or the session status moves from active to finished). You do
          not need to pass any cache-busting parameters.
        </DocP>
        <Callout variant="tip">
          If you need to force a fresh fetch during a live session (e.g. after a race incident),
          wait for the next TTL expiry. The cache is designed to self-invalidate on session events,
          so forced invalidation is rarely needed.
        </Callout>
      </section>
    </DocsPageWrapper>
  )
}
