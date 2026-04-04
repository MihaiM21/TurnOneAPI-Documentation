import Link from "next/link"
import { ArrowRight, Zap, Shield, Database, Code2, RefreshCw, BarChart3, ExternalLink, Check, Activity } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ApiVersionBadge } from "@/components/api-version-badge"

const features = [
  {
    icon: Zap,
    title: "Real-Time Telemetry",
    description: "Live speed, throttle, brake, gear, and DRS data direct from F1's livetiming servers via the V2 pipeline.",
  },
  {
    icon: BarChart3,
    title: "PNG + JSON Responses",
    description: "Every analysis endpoint returns both a production-ready PNG visualization and a structured JSON payload.",
  },
  {
    icon: Database,
    title: "Multi-Season History",
    description: "Historical race data from 2018 onwards. Lap times, sector splits, speed traps, and full telemetry archives.",
  },
  {
    icon: Shield,
    title: "Secure & Tiered",
    description: "API key authentication with three access tiers: Public, Standard, and Premium — each with independent rate limits.",
  },
  {
    icon: RefreshCw,
    title: "Dual Data Pipelines",
    description: "V1 uses the FastF1 library for broad compatibility. V2 uses a custom direct client to livetiming.formula1.com.",
  },
  {
    icon: Activity,
    title: "Production Monitoring",
    description: "Prometheus metrics, per-endpoint statistics, request tracing, and Sentry error tracking built in.",
  },
]

const v1Endpoints = [
  { method: "GET", path: "/api/v1/top-speed-plot", desc: "Top speed PNG visualization" },
  { method: "GET", path: "/api/v1/top-speed-data", desc: "Top speed JSON data" },
  { method: "GET", path: "/api/v1/throttle-comparison-plot", desc: "Throttle application plot" },
  { method: "GET", path: "/api/v1/qualifying-results-data", desc: "Qualifying results JSON" },
  { method: "GET", path: "/api/v1/track-comparison-2drivers-plot", desc: "Head-to-head track map" },
  { method: "GET", path: "/api/v1/season/{year}/drivers", desc: "Season driver roster" },
]

const v2Endpoints = [
  { method: "GET", path: "/api/v2/top-speed-telemetry-plot", desc: "Telemetry speed PNG" },
  { method: "GET", path: "/api/v2/top-speed-telemetry-data", desc: "Telemetry speed JSON" },
  { method: "GET", path: "/api/v2/throttleBrake-comparison-2drivers-plot", desc: "Driver input comparison" },
  { method: "GET", path: "/api/v2/speed-distribution-data", desc: "Speed distribution JSON" },
  { method: "GET", path: "/api/v2/seasons/{year}/events", desc: "Season event list" },
  { method: "GET", path: "/api/static/circuits", desc: "Circuit reference data" },
]

const methodColors: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  POST: "text-blue-400 bg-blue-400/10 border-blue-400/20",
}

const plans = [
  {
    name: "Public",
    price: "Free",
    description: "Health checks and unauthenticated endpoints. No API key required.",
    features: [
      "30 requests / minute",
      "500 requests / hour",
      "Health check endpoint",
      "No API key needed",
    ],
    cta: "Explore the docs",
    ctaHref: "/docs",
    highlight: false,
  },
  {
    name: "Standard",
    price: "API Key",
    description: "Full access to all V1 and V2 endpoints with a valid API key.",
    features: [
      "100 requests / minute",
      "2,000 requests / hour",
      "All V1 & V2 endpoints",
      "PNG + JSON responses",
      "Historical data (2018+)",
      "Data endpoints: 60 req/min",
    ],
    cta: "Request access",
    ctaHref: "https://turnonehub.com/dashboard",
    highlight: true,
  },
  {
    name: "Premium",
    price: "Priority",
    description: "High-volume access for production sites and integrations.",
    features: [
      "300 requests / minute",
      "10,000 requests / hour",
      "All Standard features",
      "Priority processing",
      "Dedicated for t1f1.com & turnonehub.com",
      "SLA: 99.9% uptime",
    ],
    cta: "Contact us",
    ctaHref: "https://turnonehub.com",
    highlight: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.95 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0 0) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.55 0.22 25)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <ApiVersionBadge />

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-6 text-balance leading-[1.05]">
            Formula 1 Telemetry
            <br />
            <span className="text-primary">API for Developers</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            T1API is a production-grade FastAPI platform delivering real-time and historical
            F1 telemetry, lap analysis, driver comparisons, and PNG visualizations — all over a
            single unified REST API.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/endpoints"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              Browse endpoints <Code2 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Code preview */}
      <section className="border-y border-border bg-card/40">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
              <span className="ml-3 text-xs font-mono text-muted-foreground">terminal</span>
            </div>
            <div className="bg-code-bg px-6 py-5 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code>
                  <span className="text-muted-foreground"># Get top speed data for Bahrain 2025 Qualifying</span>{"\n"}
                  <span className="text-emerald-400">curl</span>{" "}
                  <span className="text-amber-300">&quot;https://api.t1f1.com/api/v2/top-speed-telemetry-data?year=2025&amp;gp=1&amp;session=Q&quot;</span>{" "}
                  <span className="text-foreground/80">\</span>{"\n"}
                  {"  "}<span className="text-foreground/80">-H</span>{" "}
                  <span className="text-amber-300">&quot;X-API-Key: your_api_key_here&quot;</span>{"\n"}
                  {"\n"}
                  <span className="text-muted-foreground"># Response</span>{"\n"}
                  <span className="text-foreground/60">{"{"}</span>{"\n"}
                  {"  "}<span className="text-blue-400">&quot;drivers&quot;</span>
                  <span className="text-foreground/60">: [</span>{"\n"}
                  {"    "}<span className="text-foreground/60">{"{"}</span>
                  <span className="text-blue-400"> &quot;driver_code&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> &quot;VER&quot;</span>
                  <span className="text-foreground/60">,</span>
                  <span className="text-blue-400"> &quot;top_speed&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> 326.4</span>
                  <span className="text-foreground/60">,</span>
                  <span className="text-blue-400"> &quot;session&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> &quot;Q&quot;</span>
                  <span className="text-foreground/60"> {"}"},</span>{"\n"}
                  {"    "}<span className="text-foreground/60">{"{"}</span>
                  <span className="text-blue-400"> &quot;driver_code&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> &quot;LEC&quot;</span>
                  <span className="text-foreground/60">,</span>
                  <span className="text-blue-400"> &quot;top_speed&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> 324.1</span>
                  <span className="text-foreground/60">,</span>
                  <span className="text-blue-400"> &quot;session&quot;</span>
                  <span className="text-foreground/60">:</span>
                  <span className="text-amber-300"> &quot;Q&quot;</span>
                  <span className="text-foreground/60"> {"}"}</span>{"\n"}
                  {"  "}<span className="text-foreground/60">]</span>{"\n"}
                  <span className="text-foreground/60">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3 text-balance">
              Production-grade F1 data infrastructure
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Built on FastAPI and deployed at{" "}
              <span className="font-mono text-foreground">api.t1f1.com</span> powering
              turnonehub.com and t1f1.com dashboards.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Endpoints preview — two columns: V1 + V2 */}
      <section className="py-20 px-6 border-y border-border bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Dual-pipeline endpoints</h2>
            <p className="text-muted-foreground">
              V1 uses the FastF1 library. V2 connects directly to livetiming.formula1.com.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* V1 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">V1</span>
                <span className="text-xs text-muted-foreground">FastF1-based pipeline</span>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                {v1Endpoints.map((ep, i) => (
                  <div
                    key={ep.path}
                    className={`flex items-center gap-3 px-4 py-3 ${i < v1Endpoints.length - 1 ? "border-b border-border" : ""} hover:bg-secondary/50 transition-colors`}
                  >
                    <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border shrink-0 ${methodColors[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs font-mono text-foreground flex-1 min-w-0 truncate">{ep.path}</code>
                    <span className="text-[11px] text-muted-foreground hidden sm:block shrink-0">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* V2 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">V2</span>
                <span className="text-xs text-muted-foreground">Direct F1 client pipeline</span>
              </div>
              <div className="rounded-xl border border-border overflow-hidden">
                {v2Endpoints.map((ep, i) => (
                  <div
                    key={ep.path}
                    className={`flex items-center gap-3 px-4 py-3 ${i < v2Endpoints.length - 1 ? "border-b border-border" : ""} hover:bg-secondary/50 transition-colors`}
                  >
                    <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border shrink-0 ${methodColors[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-xs font-mono text-foreground flex-1 min-w-0 truncate">{ep.path}</code>
                    <span className="text-[11px] text-muted-foreground hidden sm:block shrink-0">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/docs/endpoints"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View all endpoints <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rate limits / Pricing */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3 text-balance">
              Tiered rate limits
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Every API key tier gets dedicated rate limit counters.
              Data endpoints (<code className="font-mono text-sm">*-data</code>) have a separate counter to protect JSON-heavy routes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 flex flex-col relative ${
                  plan.highlight
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                      Most Common
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-black text-foreground">{plan.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`w-full text-center py-2.5 rounded-md text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          {/* Data endpoint note */}
          <div className="mt-6 p-4 rounded-lg border border-border bg-card/60 flex items-start gap-3">
            <Database className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-medium">Data endpoint limits</span> — All endpoints ending in{" "}
              <code className="font-mono">-data</code> share a separate counter:{" "}
              <strong className="text-foreground">60 requests/min</strong> and{" "}
              <strong className="text-foreground">1,000 requests/hour</strong> regardless of tier.
              Rate limit headers (<code className="font-mono">X-RateLimit-Limit</code>,{" "}
              <code className="font-mono">X-RateLimit-Remaining</code>,{" "}
              <code className="font-mono">X-RateLimit-Reset</code>) are included on every response.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4 text-balance">
            Start building with T1API
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed text-pretty">
            Read the full API reference, explore every endpoint, and integrate real
            Formula 1 data into your project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://turnonehub.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              Turn One Dashboard <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
