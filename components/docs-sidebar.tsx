"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { docsNav, type NavSection } from "@/lib/docs-nav"

function NavSectionComponent({
  section,
  pathname,
}: {
  section: NavSection
  pathname: string
}) {
  const isActive = section.items.some(
    (item) => pathname === item.href || pathname.startsWith(item.href.split("#")[0])
  )
  const [isOpen, setIsOpen] = useState(section.defaultOpen ?? isActive)

  return (
    <div className="mb-0.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
      >
        {section.title}
        {isOpen ? (
          <ChevronDown className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0" />
        )}
      </button>
      {isOpen && (
        <ul className="mb-1">
          {section.items.map((item) => {
            const itemPath = item.href.split("#")[0]
            const isItemActive =
              pathname === item.href ||
              (itemPath !== "/" && pathname === itemPath && !item.href.includes("#"))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors",
                    isItemActive
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/20 text-primary leading-none shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function SidebarNav() {
  const pathname = usePathname()
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Documentation navigation">
      {docsNav.map((section) => (
        <NavSectionComponent key={section.title} section={section} pathname={pathname} />
      ))}
    </nav>
  )
}

function SidebarNavFallback() {
  return (
    <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Documentation navigation">
      {docsNav.map((section) => (
        <div key={section.title} className="mb-0.5">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {section.title}
          </div>
        </div>
      ))}
    </nav>
  )
}

export function DocsSidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-30 pt-14">
      {/* Search */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary border border-border text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors">
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="text-xs flex-1">Search docs...</span>
          <kbd className="text-[10px] font-mono border border-border rounded px-1 bg-background hidden sm:block">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation wrapped in Suspense for usePathname */}
      <Suspense fallback={<SidebarNavFallback />}>
        <SidebarNav />
      </Suspense>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border">
        <a
          href="https://turnonehub.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="w-4 h-4 rounded-sm bg-primary/20 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold text-[8px]">T1</span>
          </span>
          turnonehub.com
          <svg className="h-3 w-3 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </aside>
  )
}
