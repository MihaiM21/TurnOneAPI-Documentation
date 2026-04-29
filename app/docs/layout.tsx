import type { Metadata } from "next"
import { DocsLayoutClient } from "@/components/docs-layout-client"

export const metadata: Metadata = {
  title: {
    default: "T1API Documentation",
    template: "%s — T1API Docs",
  },
  description: "Official API reference for Turn One Hub. Access real-time F1 timing, telemetry, and season data.",
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsLayoutClient>{children}</DocsLayoutClient>
}
