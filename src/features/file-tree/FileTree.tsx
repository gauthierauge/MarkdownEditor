import React, { useState } from 'react'
import { FilePlus2Icon, FolderPlusIcon } from 'lucide-react'
import { FileTreeItem } from './components/FileTreeItem'
import { useFileTree } from './hooks/useFileTree'
import { useNodeCrud } from './hooks/useNodeCrud'
import type { FileTreeProps } from './types/FileTree.types'
import { DragProvider } from '@/shared/context/drag/DragProvider'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

export function FileTree({ data, onFileClick, onFolderClick }: FileTreeProps) {
  const { isExpanded, toggleExpand } = useFileTree()
  const crud = useNodeCrud()
  const [creatingRoot, setCreatingRoot] = useState<'folder' | 'file' | null>(null)
  const [rootName, setRootName] = useState<string>('')

  const commitRoot = () => {
    if (rootName.trim()) {
      if (creatingRoot === 'folder') {
        crud.onCreateFolder(null, rootName.trim())
      } else {
        crud.onCreateFile(null, rootName.trim())
      }
    }

    setCreatingRoot(null)
    setRootName('')
  }

  const handleRootKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') commitRoot()
    if (event.key === 'Escape') setCreatingRoot(null)
  }

  return (
    <DragProvider>
      <div className="w-full py-2 text-left text-sm select-none" role="tree">
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Explorateur
          </span>
          <span className="flex gap-1">
            <Button
              onClick={() => {
                setRootName('')
                setCreatingRoot('folder')
              }}
              size="icon-xs"
              title="Nouveau dossier racine"
              variant="ghost"
            >
              <FolderPlusIcon />
            </Button>
            <Button
              onClick={() => {
                setRootName('')
                setCreatingRoot('file')
              }}
              size="icon-xs"
              title="Nouveau fichier racine"
              variant="ghost"
            >
              <FilePlus2Icon />
            </Button>
          </span>
        </div>

        {creatingRoot ? (
          <div className="px-2 pb-1">
            <Input
              autoFocus
              className="h-6 px-1 py-0 text-sm"
              onBlur={commitRoot}
              onChange={(event) => setRootName(event.target.value)}
              onKeyDown={handleRootKey}
              placeholder={
                creatingRoot === 'folder'
                  ? 'Nom du dossier...'
                  : 'Nom du fichier...'
              }
              value={rootName}
            />
          </div>
        ) : null}

        {data.length === 0 && !creatingRoot ? (
          <div className="flex min-h-[100px] items-center justify-center">
            <p className="text-sm text-foreground opacity-60">
              Aucun fichier disponible
            </p>
          </div>
        ) : (
          data.map((node) => (
            <FileTreeItem
              crud={crud}
              isExpanded={isExpanded}
              key={node.id}
              level={0}
              node={node}
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
              onToggle={toggleExpand}
            />
          ))
        )}
      </div>
    </DragProvider>
  )
}
