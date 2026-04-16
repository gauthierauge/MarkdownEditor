import type { FileTreeProps } from './types/FileTree.types'
import { FileTreeItem } from './components/FileTreeItem'
import { useFileTree } from './hooks/useFileTree'
import './styles/FileTree.css'

export function FileTree({
  data,
  onFileClick,
  onFolderClick,
}: FileTreeProps) {
  const { isExpanded, toggleExpand } = useFileTree()

  if (!data || data.length === 0) {
    return (
      <div className="file-tree file-tree--empty">
        <p className="file-tree__empty-message">Aucun fichier disponible</p>
      </div>
    )
  }

  return (
    <div className="file-tree" role="tree">
      {data.map((node) => (
        <FileTreeItem
          key={node.id}
          node={node}
          level={0}
          isExpanded={isExpanded}
          onToggle={toggleExpand}
          onFileClick={onFileClick}
          onFolderClick={onFolderClick}
        />
      ))}
    </div>
  )
}
