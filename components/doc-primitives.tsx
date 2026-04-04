import { cn } from "@/lib/utils"

export function DocH1({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h1
      id={id}
      className="text-3xl font-black tracking-tight text-foreground mb-4 scroll-mt-20"
    >
      {id ? (
        <a href={`#${id}`} className="hover:text-primary transition-colors">
          {children}
        </a>
      ) : children}
    </h1>
  )
}

export function DocH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold tracking-tight text-foreground mt-12 mb-4 scroll-mt-20 group"
    >
      <a href={`#${id}`} className="hover:text-primary transition-colors">
        {children}
      </a>
    </h2>
  )
}

export function DocH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-base font-semibold text-foreground mt-8 mb-3 scroll-mt-20"
    >
      <a href={`#${id}`} className="hover:text-primary transition-colors">
        {children}
      </a>
    </h3>
  )
}

export function DocP({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-muted-foreground leading-relaxed mb-4", className)}>{children}</p>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.85em] bg-secondary border border-border text-primary px-1.5 py-0.5 rounded">
      {children}
    </code>
  )
}

export function MethodBadge({ method }: { method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "WSS" }) {
  const colors = {
    GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
    PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    PATCH: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    WSS: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  }
  return (
    <span className={cn("inline-block text-[11px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0", colors[method])}>
      {method}
    </span>
  )
}

export function EndpointCard({
  method,
  path,
  description,
}: {
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "WSS"
  path: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card mb-3 hover:border-primary/40 transition-colors">
      <MethodBadge method={method} />
      <div className="flex-1 min-w-0">
        <code className="text-sm font-mono text-foreground">{path}</code>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

export function ParamTable({
  params,
}: {
  params: Array<{ name: string; type: string; required: boolean; description: string; default?: string }>
}) {
  return (
    <div className="rounded-lg border border-border overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary">
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
            <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={p.name} className={cn("border-b border-border last:border-0", i % 2 !== 0 && "bg-secondary/30")}>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-primary">{p.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-muted-foreground">{p.type}</code>
              </td>
              <td className="px-4 py-3">
                {p.required ? (
                  <span className="text-xs text-primary font-medium">Yes</span>
                ) : (
                  <span className="text-xs text-muted-foreground">No</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {p.description}
                {p.default && (
                  <span className="ml-1 text-muted-foreground/60">
                    Default: <code className="font-mono">{p.default}</code>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warning" | "tip" | "danger"
  title?: string
  children: React.ReactNode
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
    warning: "border-amber-500/30 bg-amber-500/5 text-amber-200",
    tip: "border-primary/30 bg-primary/5 text-foreground",
    danger: "border-red-500/30 bg-red-500/5 text-red-200",
  }
  const labels = {
    info: "Info",
    warning: "Warning",
    tip: "Tip",
    danger: "Danger",
  }
  return (
    <div className={cn("p-4 rounded-lg border mb-6 text-sm", styles[variant])}>
      {title ?? labels[variant] ? (
        <p className="font-semibold text-[11px] uppercase tracking-widest mb-1.5 opacity-70">
          {title ?? labels[variant]}
        </p>
      ) : null}
      <div className="leading-relaxed text-[13px]">{children}</div>
    </div>
  )
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="rounded-lg border border-border overflow-hidden mb-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={cn("border-b border-border last:border-0", i % 2 !== 0 && "bg-secondary/30")}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-xs text-muted-foreground">
                  <code className={cn("font-mono", j === 0 && "text-primary")}>{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocDivider() {
  return <hr className="border-border my-10" />
}
