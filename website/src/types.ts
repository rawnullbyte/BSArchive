export interface FileTreeNode {
  name: string
  type: "file" | "dir"
  path: string
  children?: FileTreeNode[]
}

export interface ScriptEntry {
  id: string
  version: string
  name: string
  description: string
  authors: string[]
  tags: string[]
  files: Record<string, string>
  tree: FileTreeNode[]
}

export interface ArchiveIndex {
  generated: string
  total: number
  versions: string[]
  tags: string[]
  entries: ScriptEntry[]
}

export interface SearchMatch {
  type: "file" | "meta"
  file?: string
  line?: number
  context?: string[]
  matchedLine?: number
  label?: string
}
