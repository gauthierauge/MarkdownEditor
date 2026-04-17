import React, { type KeyboardEvent, useState } from 'react';
import type { FileTreeItemProps } from '@/features/file-tree/types/FileTree.types';
import { Input } from '@/shared/components/ui/input';
import { useDragContext } from '@/shared/context/drag/useDragContext';
import { useFolderDrop } from '@/features/file-tree/hooks/useFolderDrop';
import { useInlineEdit } from '@/features/file-tree/hooks/useInlineEdit';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ChevronRight, File, Folder, MoreHorizontal } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

type CreatingType = 'folder' | 'file' | null

export function FileTreeItem({
  node,
  parentId,
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

  const [creatingType, setCreatingType] = useState<CreatingType>(null);
  const [newChildName, setNewChildName] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { setDragged, clearDragged } = useDragContext();
  const { getRootProps: getDropProps, isDragActive } = useFolderDrop({
    folderId: isFolder ? node.id : parentId,
    onMove: crud.onMove,
  });
  const {
    editing: isRenaming,
    value: renameValue,
    setValue: setRenameValue,
    inputRef: renameInputRef,
    start: startRename,
    commit: commitRename,
    handleKey: handleRenameKey,
  } = useInlineEdit(node.name, (name) => crud.onRename(node.id, name));

  const handleClick = () => {
    if (isFolder) { onToggle(node.id); onFolderClick?.(node); }
    else onFileClick?.(node);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
  };

  const commitCreate = () => {
    if (newChildName.trim()) {
      if (creatingType === 'folder') crud.onCreateFolder(node.id, newChildName.trim());
      else crud.onCreateFile(node.id, newChildName.trim());
    }
    setCreatingType(null);
  };

  const handleCreateKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitCreate();
    if (e.key === 'Escape') setCreatingType(null);
  };

  const handleMenuCreate = (type: 'folder' | 'file') => {
    setMenuOpen(false);
    if (!expanded) onToggle(node.id);
    setNewChildName('');
    setCreatingType(type);
  };

  const handleMenuRename = () => {
    setMenuOpen(false);
    setTimeout(() => startRename(), 0);
  };

  const handleMenuDelete = () => {
    setMenuOpen(false);
    setDeleteOpen(true);
  };

  const menuItemClass =
    'w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors cursor-pointer';
  const menuItemDestructiveClass =
    'w-full text-left px-2 py-1.5 text-sm rounded text-destructive hover:bg-destructive/10 transition-colors cursor-pointer';

  return (
    <>
      <div className="w-full">
        <div
          {...getDropProps()}
          className={[
            'flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded transition-colors text-foreground',
            'hover:bg-accent focus:outline-2 focus:outline-primary focus:-outline-offset-2 active:opacity-80',
            isDragActive ? 'ring-2 ring-primary ring-inset' : '',
          ].join(' ')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={isRenaming ? undefined : handleClick}
          onKeyDown={isRenaming ? undefined : handleKeyDown}
          onDoubleClick={startRename}
          role="button"
          tabIndex={0}
          aria-expanded={isFolder ? expanded : undefined}
          draggable
          onDragStart={() => setDragged(node.id)}
          onDragEnd={() => clearDragged()}
        >
          {isFolder && (
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform origin-center text-foreground shrink-0 ${expanded ? 'rotate-90' : ''}`}
              aria-hidden="true"
            />
          )}

          <span className="inline-flex items-center justify-center w-[18px] h-[18px] shrink-0" aria-hidden="true">
            {isFolder
              ? <Folder className="w-4 h-4 text-muted-foreground" />
              : <File className="w-4 h-4 text-muted-foreground" />}
          </span>

          {isRenaming ? (
            <Input
              ref={renameInputRef}
              className="h-6 py-0 px-1 text-sm flex-1"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={commitRename}
              onKeyDown={handleRenameKey}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          ) : (
            <span className={`flex-1 truncate text-sm leading-5 ${isFolder ? 'font-medium text-foreground' : 'font-normal'}`}>
              {node.name}
            </span>
          )}

          {!isRenaming && (
            <span className="ml-auto shrink-0">
              <Popover open={menuOpen} onOpenChange={setMenuOpen}>
                <PopoverTrigger
                  className={[
                    'p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-opacity text-sm leading-none cursor-pointer',
                    (isHovered || menuOpen) ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={-1}
                  aria-label="Actions"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </PopoverTrigger>
                <PopoverContent className="w-44 p-1 flex flex-col gap-0" side="right" align="start">
                  {isFolder && (
                    <>
                      <button className={menuItemClass} onClick={() => handleMenuCreate('folder')}>
                        Nouveau dossier
                      </button>
                      <button className={menuItemClass} onClick={() => handleMenuCreate('file')}>
                        Nouveau fichier
                      </button>
                      <hr className="my-1 border-border" />
                    </>
                  )}
                  <button className={menuItemClass} onClick={handleMenuRename}>
                    Renommer
                  </button>
                  <button className={menuItemDestructiveClass} onClick={handleMenuDelete}>
                    Supprimer
                  </button>
                </PopoverContent>
              </Popover>
            </span>
          )}
        </div>

        {isFolder && expanded && (
          <div>
            {creatingType && (
              <div style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }} className="py-1">
                <Input
                  className="h-6 py-0 px-1 text-sm"
                  placeholder={creatingType === 'folder' ? 'Nom du dossier…' : 'Nom du fichier…'}
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
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
                  parentId={node.id}
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

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer « {node.name} » ?</AlertDialogTitle>
            <AlertDialogDescription>
              {isFolder
                ? 'Ce dossier et tout son contenu seront définitivement supprimés.'
                : 'Ce fichier sera définitivement supprimé.'}
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
    </>
  );
}
