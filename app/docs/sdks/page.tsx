import type { Metadata } from "next"
import { DocsPageWrapper } from "@/components/docs-page-wrapper"
import { CodeBlock } from "@/components/code-block"
import {
  DocH1, DocH2, DocH3, DocP, InlineCode, Callout, DocDivider,
} from "@/components/doc-primitives"
import { ExternalLink } from "lucide-react"

export const metadata: Metadata = { title: "SDKs & Libraries" }

const toc = [
  { id: "javascript", label: "JavaScript / TypeScript", level: 1 as const },
  { id: "js-install", label: "Installation", level: 2 as const },
  { id: "js-usage", label: "Usage", level: 2 as const },
  { id: "js-websocket", label: "WebSocket", level: 2 as const },
  { id: "python", label: "Python", level: 1 as const },
  { id: "py-install", label: "Installation", level: 2 as const },
  { id: "py-usage", label: "Usage", level: 2 as const },
  { id: "py-async", label: "Async & WebSocket", level: 2 as const },
  { id: "go", label: "Go", level: 1 as const },
  { id: "community", label: "Community SDKs", level: 1 as const },
]

export default function SDKsPage() {
  return (
    <DocsPageWrapper
      toc={toc}
      prev={{ label: "WebSocket API", href: "/docs/websocket" }}
      next={{ label: "Changelog", href: "/docs/changelog" }}
    >
      <DocH1>SDKs &amp; Libraries</DocH1>
      <DocP>
        Official T1API SDKs are maintained by the Turn One Hub team and kept in sync with the latest
        API changes. All SDKs provide full type safety, automatic retries, and built-in WebSocket
        support.
      </DocP>

      {/* JavaScript */}
      <section id="javascript" className="scroll-mt-20">
        <DocH2 id="javascript">JavaScript / TypeScript</DocH2>
        <DocP>
          The <InlineCode>t1api</InlineCode> package supports Node.js 18+ and modern browsers.
          Full TypeScript types are included out of the box.
        </DocP>

        <DocH3 id="js-install">Installation</DocH3>
        <CodeBlock language="bash" code={`npm install t1api\n# or\npnpm add t1api\n# or\nyarn add t1api`} />

        <DocH3 id="js-usage">Usage</DocH3>
        <CodeBlock
          language="typescript"
          filename="example.ts"
          code={`import { T1Client } from "t1api";

const client = new T1Client({
  apiKey: process.env.T1API_KEY!,
});

// Get the current session
const session = await client.sessions.current();
console.log(session.sessionName); // "Race"

// Get live timing
const timing = await client.sessions.timing(session.sessionKey);
for (const driver of timing) {
  console.log(\`\${driver.position}. \${driver.broadcastName} — \${driver.lastLapTime}\`);
}

// Get all sessions for 2025
const sessions = await client.sessions.list({ year: 2025 });

// Get driver standings
const standings = await client.standings.drivers({ year: 2025 });`}
        />

        <DocH3 id="js-websocket">WebSocket</DocH3>
        <CodeBlock
          language="typescript"
          filename="realtime.ts"
          code={`import { T1Client } from "t1api";

const client = new T1Client({
  apiKey: process.env.T1API_KEY!,
});

const ws = client.ws.connect();

// Subscribe to live timing
await ws.subscribe("timing", {
  sessionKey: "current",
  driverNumbers: [1, 11, 44],
});

// Listen to events
ws.on("timing.update", (data) => {
  console.log(\`P\${data.position} \${data.broadcastName}: \${data.lastLapTime}\`);
});

ws.on("lap.completed", (data) => {
  console.log(\`Lap \${data.lapNumber} — \${data.lapDuration}s\`);
});

// Graceful disconnect
process.on("SIGINT", () => ws.close());`}
        />

        <Callout variant="tip">
          The SDK handles reconnection automatically with exponential backoff.
          You only need to re-register event listeners — subscriptions are restored on reconnect.
        </Callout>
      </section>

      <DocDivider />

      {/* Python */}
      <section id="python" className="scroll-mt-20">
        <DocH2 id="python">Python</DocH2>
        <DocP>
          The <InlineCode>t1api-python</InlineCode> library supports Python 3.9+ with both
          synchronous and async interfaces.
        </DocP>

        <DocH3 id="py-install">Installation</DocH3>
        <CodeBlock language="bash" code={`pip install t1api\n# or with uv\nuv add t1api`} />

        <DocH3 id="py-usage">Usage</DocH3>
        <CodeBlock
          language="python"
          filename="example.py"
          code={`from t1api import T1Client

client = T1Client(api_key="YOUR_API_KEY")

# Get current session
session = client.sessions.current()
print(session.session_name)  # Race

# Get live timing
timing = client.sessions.timing(session.session_key)
for driver in timing:
    print(f"{driver.position}. {driver.broadcast_name} — {driver.last_lap_time}")

# Get standings
standings = client.standings.drivers(year=2025)
for entry in standings:
    print(f"{entry.position}. {entry.full_name} — {entry.points} pts")`}
        />

        <DocH3 id="py-async">Async &amp; WebSocket</DocH3>
        <CodeBlock
          language="python"
          filename="realtime.py"
          code={`import asyncio
from t1api import AsyncT1Client

async def main():
    client = AsyncT1Client(api_key="YOUR_API_KEY")

    # Async REST
    session = await client.sessions.current()

    # WebSocket
    async with client.ws.connect() as ws:
        await ws.subscribe("timing", session_key="current")
        await ws.subscribe("car_data", session_key="current")

        async for event in ws:
            if event.type == "timing.update":
                print(f"P{event.data.position} {event.data.broadcast_name}")
            elif event.type == "car_data.update":
                print(f"{event.data.driver_number}: {event.data.speed} km/h")

asyncio.run(main())`}
        />
      </section>

      <DocDivider />

      {/* Go */}
      <section id="go" className="scroll-mt-20">
        <DocH2 id="go">Go</DocH2>
        <DocP>
          The Go client provides idiomatic, context-aware bindings for all T1API endpoints.
        </DocP>

        <CodeBlock language="bash" code={`go get github.com/turnonehub/t1api-go`} />

        <CodeBlock
          language="go"
          filename="main.go"
          code={`package main

import (
  "context"
  "fmt"
  "log"
  "os"

  t1api "github.com/turnonehub/t1api-go"
)

func main() {
  client := t1api.NewClient(os.Getenv("T1API_KEY"))

  ctx := context.Background()

  // Get current session
  session, err := client.Sessions.Current(ctx)
  if err != nil {
    log.Fatal(err)
  }
  fmt.Println(session.SessionName)

  // Get live timing
  timing, err := client.Sessions.Timing(ctx, session.SessionKey, nil)
  if err != nil {
    log.Fatal(err)
  }
  for _, driver := range timing {
    fmt.Printf("%d. %s — %s\\n", driver.Position, driver.BroadcastName, driver.LastLapTime)
  }
}`}
        />
      </section>

      <DocDivider />

      {/* Community */}
      <section id="community" className="scroll-mt-20">
        <DocH2 id="community">Community SDKs</DocH2>
        <DocP>
          The following SDKs are built and maintained by the community. They are not officially
          supported by Turn One Hub but are widely used and production-tested.
        </DocP>

        <div className="space-y-3">
          {[
            {
              name: "t1api-rust",
              author: "community",
              lang: "Rust",
              url: "https://github.com/turnonehub/t1api-rust",
              description: "Async Rust client using Tokio and reqwest.",
            },
            {
              name: "t1api-dart",
              author: "community",
              lang: "Dart / Flutter",
              url: "https://github.com/turnonehub/t1api-dart",
              description: "Flutter-ready Dart package for T1API.",
            },
            {
              name: "t1api-r",
              author: "community",
              lang: "R",
              url: "https://github.com/turnonehub/t1api-r",
              description: "R package for F1 data analysis and visualisation.",
            },
          ].map((sdk) => (
            <div key={sdk.name} className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono text-primary">{sdk.name}</code>
                  <span className="text-[11px] px-1.5 py-0.5 rounded border border-border text-muted-foreground font-mono">
                    {sdk.lang}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{sdk.description}</p>
              </div>
              <a
                href={sdk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label={`View ${sdk.name} on GitHub`}
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        <Callout variant="info" title="Submit your SDK">
          Built a T1API SDK in another language? Open a pull request on our{" "}
          <a href="https://github.com/turnonehub" className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            GitHub organization
          </a>{" "}
          to get it listed here.
        </Callout>
      </section>
    </DocsPageWrapper>
  )
}
