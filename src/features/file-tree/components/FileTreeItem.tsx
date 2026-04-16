import React, { type KeyboardEvent, useState, useRef } from 'react';
import type { FileTreeItemProps } from '@/features/file-tree/types/FileTree.types';
import { Input } from '@/shared/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { useDragContext } from '@/features/file-tree/hooks/useDragContext';
import { useFolderDrop } from '@/features/file-tree/hooks/useFolderDrop';

export function FileTreeItem({
  node,
  level,
  isExpanded,
  onToggle,
  onFileClick,
  onFolderClick,
  crud,
}: FileTreeItemProps) {
  const isFolder = node.type === 'folder';
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const expanded = isExpanded(node.id);

  const [renaming, setRenaming] = useState<boolean>(false);
  const [renameValue, setRenameValue] = useState<string>(node.name);
  const [creatingChild, setCreatingChild] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('');

  const { setDragged, clearDragged } = useDragContext();
  const { getRootProps, isDragActive } = useFolderDrop({
    folderId: node.id,
    onMove: crud.onMove,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isFolder) {
      onToggle(node.id);
      onFolderClick?.(node);
    } else {
      onFileClick?.(node);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const startRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRenameValue(node.name);
    setRenaming(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commitRename = () => {
    crud.onRename(node.id, renameValue || node.name);
    setRenaming(false);
  };

  const handleRenameKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitRename();
    if (e.key === 'Escape') setRenaming(false);
  };

  const startCreateChild = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!expanded) onToggle(node.id);
    setNewFolderName('');
    setCreatingChild(true);
  };

  const commitCreate = () => {
    if (newFolderName.trim()) crud.onCreate(node.id, newFolderName.trim());
    setCreatingChild(false);
  };

  const handleCreateKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitCreate();
    if (e.key === 'Escape') setCreatingChild(false);
  };

  const folderDropProps = isFolder ? getRootProps() : {};

  return (
    <div className="file-tree-item" {...folderDropProps}>
      <div
        className={[
          'file-tree-item__label group',
          isFolder ? 'file-tree-item__label--folder' : 'file-tree-item__label--file',
          isDragActive && isFolder ? 'ring-2 ring-primary ring-inset' : '',
        ].join(' ')}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={renaming ? undefined : handleClick}
        onKeyDown={renaming ? undefined : handleKeyDown}
        onDoubleClick={isFolder ? startRename : undefined}
        role="button"
        tabIndex={0}
        aria-expanded={isFolder ? expanded : undefined}
        draggable
        onDragStart={() => setDragged(node.id)}
        onDragEnd={() => clearDragged()}
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

        {renaming ? (
          <Input
            ref={inputRef}
            className="h-6 py-0 px-1 text-sm flex-1"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleRenameKey}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span className="file-tree-item__name">{node.name}</span>
        )}

        {isFolder && !renaming && (
          <span className="ml-auto hidden group-hover:flex items-center gap-0.5 shrink-0">
            <button
              className="p-0.5 rounded hover:bg-accent hover:text-accent-foreground text-xs"
              title="Nouveau sous-dossier"
              onClick={startCreateChild}
              tabIndex={-1}
            >
              +
            </button>
            <button
              className="p-0.5 rounded hover:bg-accent hover:text-accent-foreground text-xs"
              title="Renommer"
              onClick={startRename}
              tabIndex={-1}
            >
              ✏️
            </button>
            <AlertDialog>
              <AlertDialogTrigger
                className="p-0.5 rounded hover:bg-destructive hover:text-destructive-foreground text-xs"
                title="Supprimer"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
              >
                🗑️
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer « {node.name} » ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Ce dossier et tout son contenu seront définitivement supprimés.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => crud.onDelete(node.id)}
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </span>
        )}
      </div>

      {isFolder && expanded && (
        <div className="file-tree-item__children">
          {creatingChild && (
            <div style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }} className="py-1">
              <Input
                className="h-6 py-0 px-1 text-sm"
                placeholder="Nom du dossier…"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onBlur={commitCreate}
                onKeyDown={handleCreateKey}
                autoFocus
              />
            </div>
          )}
          {hasChildren &&
            node.children!.map((child) => (
              <FileTreeItem
                key={child.id}
                node={child}
                level={level + 1}
                isExpanded={isExpanded}
                onToggle={onToggle}
                onFileClick={onFileClick}
                onFolderClick={onFolderClick}
                crud={crud}
              />
            ))}
        </div>
      )}
    </div>
  );
}
