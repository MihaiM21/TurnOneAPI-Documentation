import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { DocsSidebar } from "@/components/docs-sidebar"

export const metadata: Metadata = {
  title: {
    default: "T1API Documentation",
    template: "%s — T1API Docs",
  },
  description: "Official API reference for Turn One Hub. Access real-time F1 timing, telemetry, and season data.",
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Sidebar */}
      <DocsSidebar />

      {/* Main content — offset for sidebar + header */}
      <div className="lg:pl-64">
        <main className="pt-14 min-h-screen">
          <div className="xl:pr-56">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
