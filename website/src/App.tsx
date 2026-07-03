import { useEffect, useRef, useState, useMemo, useCallback, type ChangeEvent } from "react"
import {
  Search, X, Loader2,
  Moon, Sun, File, Folder, FolderOpen,
  ChevronRight, ChevronLeft, Eye, Code,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import hljs from "highlight.js/lib/common"
import HomePage from "./HomePage"
import NotFound from "./NotFound"
import { getRoute, navigate } from "./router"
import type { ArchiveIndex, ScriptEntry, FileTreeNode, SearchMatch } from "./types"

function highlightText(text: string, query: string) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-yellow-200/60 dark:bg-yellow-500/30 rounded px-0.5">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

function searchFiles(data: ArchiveIndex, query: string) {
  const q = query.toLowerCase()
  const results: { entry: ScriptEntry; matches: SearchMatch[] }[] = []
  for (const entry of data.entries) {
    const matches: SearchMatch[] = []
    const nameMatch = entry.name.toLowerCase().includes(q)
    const descMatch = entry.description.toLowerCase().includes(q)
    const authorMatch = entry.authors.some(a => a.toLowerCase().includes(q))
    if (nameMatch || descMatch || authorMatch) {
      matches.push({ type: "meta", label: "" })
    }
    for (const [filename, content] of Object.entries(entry.files)) {
      const lines = content.split("\n")
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(q)) {
          const start = Math.max(0, i - 5)
          const end = Math.min(lines.length, i + 6)
          const context = lines.slice(start, end)
          matches.push({ type: "file", file: filename, line: i + 1, context, matchedLine: i - start })
        }
      }
    }
    if (matches.length > 0) results.push({ entry, matches })
  }
  return results
}

function TreeIcon({ node, open }: { node: FileTreeNode; open?: boolean }) {
  if (node.type === "file") {
    const ext = node.name.split(".").pop()
    if (ext === "ts" || ext === "tsx") return <Code className="h-4 w-4 text-blue-500 shrink-0" />
    if (ext === "js" || ext === "jsx") return <Code className="h-4 w-4 text-yellow-500 shrink-0" />
    if (ext === "json") return <File className="h-4 w-4 text-green-500 shrink-0" />
    return <File className="h-4 w-4 text-muted-foreground shrink-0" />
  }
  return open
    ? <FolderOpen className="h-4 w-4 text-blue-400 shrink-0" />
    : <Folder className="h-4 w-4 text-blue-400 shrink-0" />
}

function FileTree({
  nodes, selected, onSelect, depth = 0,
}: {
  nodes: FileTreeNode[]; selected: string | null; onSelect: (path: string) => void; depth?: number
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const toggle = (name: string) => setOpen(p => ({ ...p, [name]: p[name] === false }))

  return (
    <ul className={depth > 0 ? "ml-4" : ""}>
      {nodes.map(node => {
        if (node.type === "dir") {
          const isOpen = open[node.name] ?? true
          return (
            <li key={node.name}>
              <button
                type="button"
                onClick={() => toggle(node.name)}
                className="flex w-full items-center gap-1.5 py-1 px-1 text-left text-sm hover:bg-muted/50 rounded"
              >
                <ChevronRight className={`h-3 w-3 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                <TreeIcon node={node} open={isOpen} />
                <span className="truncate">{node.name}</span>
              </button>
              {isOpen && node.children && (
                <FileTree nodes={node.children} selected={selected} onSelect={onSelect} depth={depth + 1} />
              )}
            </li>
          )
        }
        return (
          <li key={node.name}>
            <button
              type="button"
              onClick={() => onSelect(node.path)}
              className={`flex w-full items-center gap-1.5 py-1 px-1 pl-5 text-left text-sm rounded truncate ${
                selected === node.path ? "bg-muted text-foreground font-medium" : "hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              <TreeIcon node={node} />
              <span className="truncate">{node.name}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function findFirstFile(tree: FileTreeNode[]): string | null {
  for (const node of tree) {
    if (node.type === "file") return node.path
    if (node.children) {
      const found = findFirstFile(node.children)
      if (found) return found
    }
  }
  return null
}

function HighlightedCode({ code, language }: { code: string; language?: string }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-highlighted")
      hljs.highlightElement(ref.current)
    }
  }, [code, language])

  const lang = language || "javascript"
  return (
    <pre className="p-4 text-sm font-mono leading-relaxed overflow-auto">
      <code ref={ref} className={`hljs language-${lang}`}>{code}</code>
    </pre>
  )
}

function HlLine({ code, language }: { code: string; language?: string }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute("data-highlighted")
      hljs.highlightElement(ref.current)
    }
  }, [code, language])
  const lang = language || "javascript"
  return <code ref={ref} className={`hljs language-${lang}`}>{code || " "}</code>
}

function ScriptModal({
  entry, onClose,
}: { entry: ScriptEntry; onClose: () => void }) {
  const firstFile = useMemo(() => findFirstFile(entry.tree) ?? Object.keys(entry.files)[0] ?? null, [entry])
  const [selectedFile, setSelectedFile] = useState<string | null>(firstFile)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  const fileContent = selectedFile ? (entry.files[selectedFile] ?? null) : null

  const getLanguage = (filename: string | null): string => {
    if (!filename) return "javascript"
    const ext = filename.split(".").pop()
    if (ext === "json") return "json"
    if (ext === "md") return "markdown"
    return "javascript"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col w-full h-[90vh] max-w-[1400px] bg-background border rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between gap-4 p-4 border-b shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold tracking-tight truncate">{entry.name}</h2>
              <Badge variant="secondary" className="shrink-0">{entry.version}</Badge>
              <Badge variant="outline" className="shrink-0 text-xs">{Object.keys(entry.files).length} files</Badge>
            </div>
            {entry.authors.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">by {entry.authors.join(", ")}</p>
            )}
            {entry.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{entry.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex min-h-0 flex-1">
          <div className="w-64 shrink-0 border-r overflow-y-auto p-2 hidden sm:block">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-2">Files</p>
            <FileTree nodes={entry.tree} selected={selectedFile} onSelect={setSelectedFile} />
          </div>

          <div className="flex-1 min-w-0 overflow-auto">
            {selectedFile && fileContent !== null ? (
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/30 shrink-0">
                  <File className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm font-mono text-muted-foreground truncate">{selectedFile}</span>
                  <span className="text-xs text-muted-foreground ml-auto shrink-0">{fileContent.split("\n").length} lines</span>
                </div>
                <div className="flex-1 overflow-auto">
                  <HighlightedCode code={fileContent} language={getLanguage(selectedFile)} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Select a file to view its content
              </div>
            )}
          </div>
        </div>

        <div className="sm:hidden flex border-t shrink-0 overflow-x-auto">
          {entry.tree.filter(n => n.type === "file").map(n => (
            <button
              key={n.path}
              type="button"
              onClick={() => setSelectedFile(n.path)}
              className={`flex items-center gap-1 px-3 py-2 text-xs shrink-0 border-r last:border-r-0 ${
                selectedFile === n.path ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              <TreeIcon node={n} />
              {n.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  const [data, setData] = useState<ArchiveIndex | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [versionFilter, setVersionFilter] = useState("all")
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [selectedScript, setSelectedScript] = useState<ScriptEntry | null>(null)
  const [page, setPage] = useState(0)
  const [pageView, setPageViewRaw] = useState<string>(getRoute)
  const searchRef = useRef<HTMLInputElement>(null)

  const setPageView = useCallback((page: string) => {
    navigate(page)
  }, [])

  useEffect(() => {
    const handler = () => setPageViewRaw(getRoute())
    window.addEventListener("hashchange", handler)
    return () => window.removeEventListener("hashchange", handler)
  }, [])

  useEffect(() => {
    if (pageView === "home") {
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = "" }
    }
  }, [pageView])
  const PAGE_SIZE = 20

  useEffect(() => {
    fetch("index.json")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((d: ArchiveIndex) => { setData(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  const searchResults = useMemo(() => {
    if (!data || !search.trim()) return null
    return searchFiles(data, search.trim())
  }, [data, search])

  const filtered = useMemo(() => {
    if (!data) return []
    let result = data.entries
    if (versionFilter !== "all") result = result.filter(e => e.version === versionFilter)
    if (activeTags.size > 0) result = result.filter(e => [...activeTags].every(t => e.tags.includes(t)))
    return result
  }, [data, versionFilter, activeTags])

  const toggleTag = (tag: string) => {
    const next = new Set(activeTags)
    if (next.has(tag)) next.delete(tag); else next.add(tag)
    setActiveTags(next)
  }

  const clearFilters = () => { setSearch(""); setVersionFilter("all"); setActiveTags(new Set()); setPage(0) }
  const hasFilters = search || versionFilter !== "all" || activeTags.size > 0

  useEffect(() => { setPage(0) }, [search, versionFilter, activeTags])

  const handleSlashKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const active = document.activeElement
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return
      e.preventDefault()
      searchRef.current?.focus()
    }
    if (e.key === "Escape" && search && !selectedScript) {
      setSearch("")
      searchRef.current?.blur()
    }
  }, [search, selectedScript])

  useEffect(() => {
    window.addEventListener("keydown", handleSlashKey)
    return () => window.removeEventListener("keydown", handleSlashKey)
  }, [handleSlashKey])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex min-h-[100dvh] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin" />
            <p className="text-sm">Loading scripts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex min-h-[100dvh] items-center justify-center px-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="border-b">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-base font-semibold tracking-tight">BSArchive</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {error ? `Failed to load data: ${error}` : "No data available."}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">Index missing</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Run <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.85em] text-foreground">npm run build</code> in the project root to generate <code className="text-[0.85em]">index.json</code>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const isSearching = search.trim().length > 0
  const resultCount = isSearching
    ? searchResults?.reduce((sum, r) => sum + r.matches.length, 0) ?? 0
    : filtered.length

  const pagedResults = isSearching && searchResults
    ? searchResults.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    : null
  const pagedFiltered = !isSearching
    ? filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
    : []
  const totalPages = isSearching
    ? Math.ceil((searchResults?.length ?? 0) / PAGE_SIZE)
    : Math.ceil(filtered.length / PAGE_SIZE)

  const q = search.trim().toLowerCase()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <nav aria-label="Primary" className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <button type="button" onClick={() => setPageView("home")}
              className="shrink-0 mr-3 text-sm font-semibold tracking-tight hover:text-muted-foreground transition-colors">
              BSArchive
            </button>
            {pageView !== "home" && (
              <div className="relative flex-1 max-w-2xl mx-auto">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  ref={searchRef}
                  placeholder="Search scripts..."
                  className="h-9 w-full pl-9 pr-12 text-sm"
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  aria-label="Search scripts"
                />
                {search ? (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-5 min-w-[1.25rem] items-center justify-center select-none rounded-[4px] border border-border/60 bg-muted/70 px-1 font-mono text-[10px] font-medium text-muted-foreground/70 shadow-[0_1px_0_1px_rgba(0,0,0,0.06)]">
                    /
                  </kbd>
                )}
              </div>
            )}
            <div className="flex items-center shrink-0 ml-auto gap-1">
              <Button variant={pageView === "scripts" ? "secondary" : "ghost"} size="sm" onClick={() => setPageView("scripts")} className="h-8 px-3 text-xs">
                Scripts
              </Button>
              <Button variant="ghost" size="icon" onClick={toggle} className="h-8 w-8"
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className={`px-4 sm:px-6 lg:px-8 py-5 ${pageView === "home" ? "overflow-hidden" : ""}`}>
        {pageView === "home" ? (
          data ? (
            <HomePage onBrowseScripts={() => setPageView("scripts")} />
          ) : (
            <div className="py-20 text-center text-muted-foreground text-sm">Loading...</div>
          )
        ) : pageView === "scripts" ? (
          <>
          <section aria-label="Filters" className="mb-4">
          <div className="flex items-center justify-between min-h-[36px]">
            <div className="flex items-center gap-3">
              <div className="w-44">
                <Select value={versionFilter} onValueChange={v => v && setVersionFilter(v)}>
                  <SelectTrigger className="h-9 w-full">
                    <SelectValue placeholder="All versions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All versions</SelectItem>
                    {data.versions.map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="sm" onClick={clearFilters}
                className={`h-9 px-2 text-muted-foreground hover:text-foreground transition-opacity ${hasFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                Clear filters
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {data.tags.map(tag => (
                <button key={tag} type="button" onClick={() => toggleTag(tag)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-pressed={activeTags.has(tag)}>
                  <Badge variant={activeTags.has(tag) ? "default" : "outline"}
                    className="cursor-pointer select-none transition-colors hover:bg-muted">
                    {tag}
                    {activeTags.has(tag) && <X className="ml-1 h-3 w-3" aria-hidden="true" />}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Results" className="mb-4">
          <p className="text-sm text-muted-foreground">
            {isSearching ? (
              <>
                Found <span className="font-medium text-foreground">{resultCount}</span> matches
                in <span className="font-medium text-foreground">{searchResults?.length ?? 0}</span> scripts
              </>
            ) : (
              <>
                Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
                <span className="font-medium text-foreground">{data.total}</span> scripts
              </>
            )}
          </p>
        </section>

        {isSearching ? (
          pagedResults && pagedResults.length > 0 ? (
            <section aria-label="Search results" className="space-y-3">
              {pagedResults.map(({ entry, matches }) => {
                const fileMatches = matches.filter(m => m.type === "file")
                const fileNames = [...new Set(fileMatches.map(m => m.file!))]
                return (
                  <Card key={entry.id} className="overflow-hidden">
                    <button type="button" onClick={() => setSelectedScript(entry)}
                      className="w-full text-left p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-semibold text-sm truncate">{highlightText(entry.name, q)}</span>
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5 shrink-0">{entry.version}</Badge>
                        {fileMatches.length > 0 && (
                          <Badge variant="outline" className="text-[10px] h-4 px-1.5 shrink-0">{fileMatches.length} file matches</Badge>
                        )}
                      </div>
                      {entry.authors.length > 0 && (
                        <p className="text-xs text-muted-foreground ml-5.5 mb-1">by {entry.authors.join(", ")}</p>
                      )}
                      {entry.description && (
                        <p className="text-xs text-muted-foreground ml-5.5 line-clamp-1">{highlightText(entry.description, q)}</p>
                      )}
                    </button>
                    {fileNames.length > 0 && (
                      <div className="border-t divide-y">
                        {fileNames.map(filename => {
                          const fm = fileMatches.filter(m => m.file === filename)
                          return (
                            <div key={filename}>
                              <div className="flex items-center gap-1.5 px-4 py-2 bg-muted/30 text-xs font-mono text-muted-foreground">
                                <File className="h-3 w-3 shrink-0" />
                                {filename}
                              </div>
                              {fm.slice(0, 3).map((m, idx) => (
                                <div key={idx} className="px-4 py-2 overflow-x-auto">
                                  <pre className="text-xs font-mono leading-relaxed">
                                    {m.context!.map((line, li) => (
                                      <div key={li} className={`flex ${li === m.matchedLine ? "bg-yellow-200/40 dark:bg-yellow-500/20" : ""}`}>
                                        <span className="inline-block w-10 shrink-0 text-right pr-3 text-muted-foreground/50 select-none">
                                          {m.line! - (m.matchedLine! - li)}
                                        </span>
                                        <span className="flex-1 whitespace-pre"><HlLine code={line} language="javascript" /></span>
                                      </div>
                                    ))}
                                  </pre>
                                </div>
                              ))}
                              {fm.length > 3 && (
                                <div className="px-4 py-1 text-xs text-muted-foreground">
                                  +{fm.length - 3} more matches in this file
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </Card>
                )
              })}
            </section>
          ) : (
            <div className="py-14 text-center text-muted-foreground text-sm">
              No matches found for "{search}"
            </div>
          )
        ) : filtered.length === 0 ? (
          <section aria-label="Empty results" className="py-14">
            <Card className="mx-auto max-w-xl">
              <CardHeader className="border-b">
                <h2 className="text-sm font-semibold tracking-tight">No matches</h2>
                <p className="text-sm text-muted-foreground">Try different filters.</p>
              </CardHeader>
              <CardContent className="pt-4">
                <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
              </CardContent>
            </Card>
          </section>
        ) : (
          <section aria-label="Script results">
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [grid-auto-rows:1fr]">
              {pagedFiltered.map(entry => (
                <article key={entry.id} className="h-full">
                  <button type="button" onClick={() => setSelectedScript(entry)}
                    className="w-full text-left h-full flex flex-col">
                    <Card className="group h-full flex flex-col transition-all duration-150 hover:-translate-y-px hover:ring-foreground/15">
                      <CardHeader className="border-b">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h2 className="truncate text-sm font-semibold tracking-tight">{entry.name}</h2>
                            {entry.authors.length > 0 && (
                              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                {entry.authors.join(", ")}
                              </p>
                            )}
                          </div>
                          <Badge variant="secondary" className="h-5 px-1.5 py-0 text-[10px] shrink-0">{entry.version}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 pb-3 flex flex-col flex-1">
                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {entry.description || "No description."}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
                          {entry.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="h-4 px-1.5 py-0 text-[10px] font-normal">{tag}</Badge>
                          ))}
                          <Badge variant="outline" className="h-4 px-1.5 py-0 text-[10px] font-normal text-muted-foreground">
                            <File className="h-2.5 w-2.5 mr-0.5" />
                            {Object.keys(entry.files).length}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
        </>
        ) : (
          <NotFound />
        )}
      </main>

      {selectedScript && (
        <ScriptModal entry={selectedScript} onClose={() => setSelectedScript(null)} />
      )}
    </div>
  )
}
