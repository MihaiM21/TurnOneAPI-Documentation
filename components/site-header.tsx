"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { Menu, X, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Endpoints", href: "/docs/endpoints" },
  { label: "WebSocket", href: "/docs/websocket" },
  { label: "SDKs", href: "/docs/sdks" },
  { label: "Changelog", href: "/docs/changelog" },
]

function HeaderNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Nav links — desktop */}
      <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 bg-background border-b border-border px-5 py-3 flex flex-col gap-1 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export function SiteHeader() {
  const [apiVersion, setApiVersion] = useState<string>("1.0")

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const response = await fetch("https://api.t1f1.com/")
        const data = await response.json()
        if (data.version) {
          setApiVersion(data.version)
        }
      } catch (error) {
        console.error("Failed to fetch API version:", error)
      }
    }

    fetchVersion()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex items-center h-full px-5 max-w-screen-xl mx-auto gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/logo.png"
            alt="T1API Logo"
            width={28}
            height={28}
            className="group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Route-aware nav wrapped in Suspense */}
        <Suspense
          fallback={
            <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          }
        >
          <HeaderNav />
        </Suspense>

        {/* Right side — static, no router dependency */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border border-border text-muted-foreground bg-secondary">
            v{apiVersion}
          </span>
          <a
            href="https://turnonehub.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
          >
            Dashboard <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://turnonehub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors px-3 py-1.5 rounded-md"
          >
            Sign in
          </a>
        </div>
      </div>
    </header>
  )
}
