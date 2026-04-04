"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TocItem {
  id: string
  label: string
  level: 1 | 2
}

interface DocsPageWrapperProps {
  children: React.ReactNode
  toc: TocItem[]
  prev?: { label: string; href: string }
  next?: { label: string; href: string }
}

export function DocsPageWrapper({ children, toc, prev, next }: DocsPageWrapperProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "")

  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      }
    )

    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  return (
    <div className="flex">
      {/* Content */}
      <article className="flex-1 min-w-0 px-6 py-10 xl:px-10">
        {children}

        {/* Prev / Next navigation */}
        {(prev || next) && (
          <div className="flex items-center justify-between mt-14 pt-8 border-t border-border">
            {prev ? (
              <Link
                href={prev.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Previous</div>
                  <div className="font-medium text-foreground">{prev.label}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                href={next.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group ml-auto"
              >
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Next</div>
                  <div className="font-medium text-foreground">{next.label}</div>
                </div>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        )}
      </article>

      {/* Table of Contents */}
      {toc.length > 0 && (
        <aside className="hidden xl:block w-56 shrink-0 px-4 pt-10 pb-8 overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="border-l border-border pl-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              On this page
            </p>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block text-xs py-0.5 transition-colors leading-relaxed",
                      item.level === 2 ? "pl-3" : "",
                      activeId === item.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  )
}
