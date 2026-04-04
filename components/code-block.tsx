"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, language = "bash", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("rounded-lg border border-code-border overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-code-bg border-b border-code-border">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          ) : (
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code */}
      <div className="bg-code-bg overflow-x-auto">
        <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-foreground/90">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

interface TabCodeBlockProps {
  tabs: Array<{ label: string; language: string; code: string }>
}

export function TabCodeBlock({ tabs }: TabCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tabs[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-code-border overflow-hidden">
      <div className="flex items-center justify-between bg-code-bg border-b border-code-border">
        <div className="flex">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={cn(
                "px-4 py-2.5 text-xs font-mono transition-colors border-b-2",
                activeTab === i
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded hover:bg-secondary mr-1"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
      <div className="bg-code-bg overflow-x-auto">
        <pre className="px-5 py-4 text-sm font-mono leading-relaxed text-foreground/90">
          <code>{tabs[activeTab].code}</code>
        </pre>
      </div>
    </div>
  )
}
