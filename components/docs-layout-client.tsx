"use client"

import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { DocsSidebar } from "@/components/docs-sidebar"

export function DocsLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Close sidebar on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="lg:pl-64">
        {/* Mobile docs menu bar — visible below header on small screens */}
        <div className="sticky top-14 z-10 flex items-center gap-3 px-4 h-10 border-b border-border bg-background/90 backdrop-blur-sm lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open docs navigation"
          >
            <Menu className="h-4 w-4" />
            <span>Menu</span>
          </button>
        </div>

        <main className="pt-14 min-h-screen">
          <div className="xl:pr-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
