import React, { type KeyboardEvent, useState } from 'react';
import type { FileTreeItemProps } from '@/features/file-tree/types/FileTree.types';
import { Input } from '@/shared/components/ui/input';
import { useDragContext } from '@/features/file-tree/hooks/useDragContext';
import { useFolderDrop } from '@/features/file-tree/hooks/useFolderDrop';
import { useInlineEdit } from '@/features/file-tree/hooks/useInlineEdit';
import { DeleteConfirmButton } from './DeleteConfirmButton';

type CreatingType = 'folder' | 'file' | null

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

  const [creatingType, setCreatingType] = useState<CreatingType>(null);
  const [newChildName, setNewChildName] = useState('');

  const { setDragged, clearDragged } = useDragContext();
  const { getRootProps, isDragActive } = useFolderDrop({ folderId: node.id, onMove: crud.onMove });
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

  const startCreate = (e: React.MouseEvent, type: 'folder' | 'file') => {
    e.stopPropagation();
    if (!expanded) onToggle(node.id);
    setNewChildName('');
    setCreatingType(type);
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

  const folderDropProps = isFolder ? getRootProps() : {};

  return (
    <div className="w-full" {...folderDropProps}>
      <div
        className={[
          'group flex items-center gap-1.5 px-2 py-1.5 cursor-pointer rounded transition-colors text-foreground',
          'hover:bg-accent focus:outline-2 focus:outline-primary focus:-outline-offset-2 active:opacity-80',
          isDragActive && isFolder ? 'ring-2 ring-primary ring-inset' : '',
        ].join(' ')}
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
          <span
            className={`inline-flex items-center justify-center w-3.5 h-3.5 text-[10px] transition-transform origin-center text-foreground shrink-0 ${expanded ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            ▶
          </span>
        )}

        <span className="inline-flex items-center justify-center w-[18px] h-[18px] text-base shrink-0" aria-hidden="true">
          {isFolder ? '📁' : '📄'}
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
          <span className={`flex-1 truncate text-sm leading-5 ${isFolder ? 'font-medium text-foreground' : 'font-normal'
            }`}>{node.name}</span>
        )}

        {!isRenaming && (
          <span className="ml-auto hidden group-hover:flex items-center gap-0.5 shrink-0">
            {isFolder && (
              <>
                <button
                  className="p-0.5 rounded hover:bg-accent hover:text-accent-foreground text-xs"
                  title="Nouveau sous-dossier"
                  onClick={(e) => startCreate(e, 'folder')}
                  tabIndex={-1}
                >
                  📁+
                </button>
                <button
                  className="p-0.5 rounded hover:bg-accent hover:text-accent-foreground text-xs"
                  title="Nouveau fichier"
                  onClick={(e) => startCreate(e, 'file')}
                  tabIndex={-1}
                >
                  📄+
                </button>
              </>
            )}
            <button
              className="p-0.5 rounded hover:bg-accent hover:text-accent-foreground text-xs"
              title="Renommer"
              onClick={startRename}
              tabIndex={-1}
            >
              ✏️
            </button>
            <DeleteConfirmButton label={node.name} onConfirm={() => crud.onDelete(node.id)} />
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
