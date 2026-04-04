"use client"

import { useState, useEffect } from "react"

export function ApiVersionBadge() {
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
        // Keep the fallback version on error
      }
    }

    fetchVersion()
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
      T1API v{apiVersion} — Production at api.t1f1.com
    </div>
  )
}
