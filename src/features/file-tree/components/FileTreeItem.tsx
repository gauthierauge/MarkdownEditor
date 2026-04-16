import type { KeyboardEvent } from 'react'
import type { FileTreeItemProps } from "../types/FileTree.types";

export function FileTreeItem({
  node,
  level,
  isExpanded,
  onToggle,
  onFileClick,
  onFolderClick,
}: FileTreeItemProps) {
  const isFolder = node.type === 'folder'
  const hasChildren = isFolder && node.children && node.children.length > 0
  const expanded = isExpanded(node.id)

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id)
      onFolderClick?.(node)
    } else {
      onFileClick?.(node)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div className="file-tree-item">
      <div
        className={`file-tree-item__label ${isFolder ? 'file-tree-item__label--folder' : 'file-tree-item__label--file'}`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isFolder ? expanded : undefined}
      >
        {isFolder && (
          <span
            className={`file-tree-item__chevron ${expanded ? 'file-tree-item__chevron--expanded' : ''}`}
            aria-hidden="true"
          >
            ▶
          </span>
        )}

        <span className="file-tree-item__icon" aria-hidden="true">
          {isFolder ? '📁' : '📄'}
        </span>

        <span className="file-tree-item__name">{node.name}</span>
      </div>

      {isFolder && expanded && hasChildren && (
        <div className="file-tree-item__children">
          {node.children!.map((child) => (
            <FileTreeItem
              key={child.id}
              node={child}
              level={level + 1}
              isExpanded={isExpanded}
              onToggle={onToggle}
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
