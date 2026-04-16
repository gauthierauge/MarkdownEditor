export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  metadata?: Record<string, unknown>
}

export interface FileTreeProps {
  data: FileNode[]
  onFileClick?: (file: FileNode) => void
  onFolderClick?: (folder: FileNode) => void
  className?: string
}

export interface FileTreeItemProps {
  node: FileNode
  level: number
  isExpanded: (nodeId: string) => boolean
  onToggle: (nodeId: string) => void
  onFileClick?: (file: FileNode) => void
  onFolderClick?: (folder: FileNode) => void
}
