import React, { type KeyboardEvent, useState } from 'react'
import {
  ChevronRightIcon,
  FileIcon,
  FilePlus2Icon,
  FolderIcon,
  FolderPlusIcon,
  PencilIcon,
} from 'lucide-react'
import type { FileTreeItemProps } from '@/features/file-tree/types/FileTree.types'
import { useFolderDrop } from '@/features/file-tree/hooks/useFolderDrop'
import { useInlineEdit } from '@/features/file-tree/hooks/useInlineEdit'
import { useDragContext } from '@/shared/context/drag/useDragContext'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { DeleteConfirmButton } from './DeleteConfirmButton'

type CreatingType = 'folder' | 'file' | null

export function FileTreeItem({
  crud,
  isExpanded,
  level,
  node,
  onFileClick,
  onFolderClick,
  onToggle,
}: FileTreeItemProps) {
  const isFolder = node.type === 'folder'
  const hasChildren = isFolder && node.children && node.children.length > 0
  const expanded = isExpanded(node.id)
  const [creatingType, setCreatingType] = useState<CreatingType>(null)
  const [newChildName, setNewChildName] = useState<string>('')
  const { setDragged, clearDragged } = useDragContext()
  const { getRootProps, isDragActive } = useFolderDrop({
    folderId: node.id,
    onMove: crud.onMove,
  })
  const {
    editing: isRenaming,
    value: renameValue,
    setValue: setRenameValue,
    inputRef: renameInputRef,
    start: startRename,
    commit: commitRename,
    handleKey: handleRenameKey,
  } = useInlineEdit(node.name, (name) => crud.onRename(node.id, name))

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id)
      onFolderClick?.(node)
    } else {
      onFileClick?.(node)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  const startCreate = (event: React.MouseEvent, type: 'folder' | 'file') => {
    event.stopPropagation()

    if (!expanded) {
      onToggle(node.id)
    }

    setNewChildName('')
    setCreatingType(type)
  }

  const commitCreate = () => {
    if (newChildName.trim()) {
      if (creatingType === 'folder') {
        crud.onCreateFolder(node.id, newChildName.trim())
      } else {
        crud.onCreateFile(node.id, newChildName.trim())
      }
    }

    setCreatingType(null)
  }

  const handleCreateKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') commitCreate()
    if (event.key === 'Escape') setCreatingType(null)
  }

  const folderDropProps = isFolder ? getRootProps() : {}

  return (
    <div className="w-full" {...folderDropProps}>
      <div
        aria-expanded={isFolder ? expanded : undefined}
        className={[
          'group flex cursor-pointer items-center gap-1.5 rounded px-2 py-1.5 text-foreground transition-colors',
          'hover:bg-accent focus:outline-2 focus:outline-primary focus:-outline-offset-2 active:opacity-80',
          isDragActive && isFolder ? 'ring-2 ring-primary ring-inset' : '',
        ].join(' ')}
        draggable
        onClick={isRenaming ? undefined : handleClick}
        onDoubleClick={startRename}
        onDragEnd={() => clearDragged()}
        onDragStart={() => setDragged(node.id)}
        onKeyDown={isRenaming ? undefined : handleKeyDown}
        role="button"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        tabIndex={0}
      >
        {isFolder ? (
          <span
            aria-hidden="true"
            className={`inline-flex h-3.5 w-3.5 items-center justify-center text-foreground transition-transform ${
              expanded ? 'rotate-90' : ''
            }`}
          >
            <ChevronRightIcon className="h-3 w-3" />
          </span>
        ) : (
          <span className="inline-flex h-3.5 w-3.5 shrink-0" />
        )}

        <span
          aria-hidden="true"
          className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center"
        >
          {isFolder ? (
            <FolderIcon className="h-4 w-4" />
          ) : (
            <FileIcon className="h-4 w-4" />
          )}
        </span>

        {isRenaming ? (
          <Input
            autoFocus
            className="h-6 flex-1 px-1 py-0 text-sm"
            onBlur={commitRename}
            onChange={(event) => setRenameValue(event.target.value)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleRenameKey}
            ref={renameInputRef}
            value={renameValue}
          />
        ) : (
          <span
            className={`flex-1 truncate text-sm leading-5 ${
              isFolder ? 'font-medium text-foreground' : 'font-normal'
            }`}
          >
            {node.name}
          </span>
        )}

        {!isRenaming ? (
          <span className="ml-auto hidden shrink-0 items-center gap-0.5 group-hover:flex">
            {isFolder ? (
              <>
                <Button
                  onClick={(event) => startCreate(event, 'folder')}
                  size="icon-xs"
                  tabIndex={-1}
                  title="Nouveau sous-dossier"
                  variant="ghost"
                >
                  <FolderPlusIcon />
                </Button>
                <Button
                  onClick={(event) => startCreate(event, 'file')}
                  size="icon-xs"
                  tabIndex={-1}
                  title="Nouveau fichier"
                  variant="ghost"
                >
                  <FilePlus2Icon />
                </Button>
              </>
            ) : null}
            <Button
              onClick={startRename}
              size="icon-xs"
              tabIndex={-1}
              title="Renommer"
              variant="ghost"
            >
              <PencilIcon />
            </Button>
            <DeleteConfirmButton
              label={node.name}
              onConfirm={() => crud.onDelete(node.id)}
            />
          </span>
        ) : null}
      </div>

      {isFolder && expanded ? (
        <div>
          {creatingType ? (
            <div className="py-1" style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }}>
              <Input
                autoFocus
                className="h-6 px-1 py-0 text-sm"
                onBlur={commitCreate}
                onChange={(event) => setNewChildName(event.target.value)}
                onKeyDown={handleCreateKey}
                placeholder={
                  creatingType === 'folder'
                    ? 'Nom du dossier...'
                    : 'Nom du fichier...'
                }
                value={newChildName}
              />
            </div>
          ) : null}
          {hasChildren
            ? node.children!.map((child) => (
                <FileTreeItem
                  crud={crud}
                  isExpanded={isExpanded}
                  key={child.id}
                  level={level + 1}
                  node={child}
                  onFileClick={onFileClick}
                  onFolderClick={onFolderClick}
                  onToggle={onToggle}
                />
              ))
            : null}
        </div>
      ) : null}
    </div>
  )
}
