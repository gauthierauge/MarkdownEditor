import { useState } from 'react'
import type { FileTreeProps } from './types/FileTree.types'
import { FileTreeItem } from './components/FileTreeItem'
import { useFileTree } from './hooks/useFileTree'
import { useFolderCrud } from './hooks/useFolderCrud'
import { DragProvider } from './context/DragContext'
import { Input } from '@/components/ui/input'
import './styles/FileTree.css'

export function FileTree({
  data,
  onFileClick,
  onFolderClick,
}: FileTreeProps) {
  const { isExpanded, toggleExpand } = useFileTree()
  const crud = useFolderCrud()
  const [creatingRoot, setCreatingRoot] = useState(false)
  const [rootName, setRootName] = useState('')

  const commitRoot = () => {
    if (rootName.trim()) crud.onCreate(null, rootName.trim())
    setCreatingRoot(false)
    setRootName('')
  }

  const handleRootKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitRoot()
    if (e.key === 'Escape') setCreatingRoot(false)
  }

  return (
    <DragProvider>
      <div className="file-tree" role="tree">
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Explorateur</span>
          <button
            className="text-xs px-1.5 py-0.5 rounded hover:bg-accent hover:text-accent-foreground"
            onClick={() => { setRootName(''); setCreatingRoot(true) }}
            title="Nouveau dossier racine"
          >
            + Dossier
          </button>
        </div>

        {creatingRoot && (
          <div className="px-2 pb-1">
            <Input
              className="h-6 py-0 px-1 text-sm"
              placeholder="Nom du dossier…"
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              onBlur={commitRoot}
              onKeyDown={handleRootKey}
              autoFocus
            />
          </div>
        )}

        {data.length === 0 && !creatingRoot ? (
          <div className="file-tree--empty">
            <p className="file-tree__empty-message">Aucun fichier disponible</p>
          </div>
        ) : (
          data.map((node) => (
            <FileTreeItem
              key={node.id}
              node={node}
              level={0}
              isExpanded={isExpanded}
              onToggle={toggleExpand}
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
              crud={crud}
            />
          ))
        )}
      </div>
    </DragProvider>
  )
}
