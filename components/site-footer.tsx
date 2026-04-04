import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const footerLinks = {
  Documentation: [
    { label: "Introduction", href: "/docs" },
    { label: "Quick Start", href: "/docs#quick-start" },
    { label: "REST Endpoints", href: "/docs/endpoints" },
    { label: "WebSocket API", href: "/docs/websocket" },
    { label: "SDKs", href: "/docs/sdks" },
    { label: "Changelog", href: "/docs/changelog" },
  ],
  Resources: [
    { label: "Turn One Hub", href: "https://turnonehub.com", external: true },
    { label: "Dashboard", href: "https://turnonehub.com/dashboard", external: true },
    { label: "Status Page", href: "https://status.turnonehub.com", external: true },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com/turnonehub", external: true },
    { label: "Discord", href: "https://discord.gg/turnonehub", external: true },
  ],
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/logo.png"
                alt="T1API Logo"
                width={28}
                height={28}
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Real-time Formula 1 data. Built for developers who push the pace.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              &copy; {new Date().getFullYear()} Turn One Hub
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                {section}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Turn One Hub &mdash; F1 Live Timing & Telemetry Platform
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded border border-border bg-secondary">
              API v1.0
            </span>
            <a
              href="https://status.turnonehub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              All systems operational
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
