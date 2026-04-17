import React, { useState } from 'react';
import type { FileTreeProps } from './types/FileTree.types';
import { FileTreeItem } from './components/FileTreeItem';
import { useFileTree } from './hooks/useFileTree';
import { useNodeCrud } from './hooks/useNodeCrud';
import { useFolderDrop } from './hooks/useFolderDrop';
import { DragProvider } from '@/shared/context/drag/DragProvider';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { MoreHorizontal } from 'lucide-react';

function FileTreeInner({ data, onFileClick, onFolderClick }: FileTreeProps) {
  const { isExpanded, toggleExpand } = useFileTree();
  const crud = useNodeCrud();
  const [creatingRoot, setCreatingRoot] = useState<'folder' | 'file' | null>(null);
  const [rootName, setRootName] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);

  const { getRootProps: getRootDropProps } = useFolderDrop({
    folderId: null,
    onMove: crud.onMove,
  });

  const commitRoot = () => {
    if (rootName.trim()) {
      if (creatingRoot === 'folder') crud.onCreateFolder(null, rootName.trim());
      else crud.onCreateFile(null, rootName.trim());
    }
    setCreatingRoot(null);
    setRootName('');
  };

  const handleRootKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') commitRoot();
    if (e.key === 'Escape') setCreatingRoot(null);
  };

  const handleMenuCreate = (type: 'folder' | 'file') => {
    setMenuOpen(false);
    setRootName('');
    setCreatingRoot(type);
  };

  const menuItemClass =
    'w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors cursor-pointer';

  return (
    <div {...getRootDropProps()} className="w-full py-2 text-sm select-none text-left" role="tree">
      <div className="flex items-center justify-between px-2 pb-1">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Explorateur</span>
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors text-sm leading-none cursor-pointer"
            aria-label="Actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="w-44 p-1 flex flex-col gap-0" side="right" align="start">
            <button className={menuItemClass} onClick={() => handleMenuCreate('folder')}>
              Nouveau dossier
            </button>
            <button className={menuItemClass} onClick={() => handleMenuCreate('file')}>
              Nouveau fichier
            </button>
          </PopoverContent>
        </Popover>
      </div>

      {creatingRoot && (
        <div className="px-2 pb-1">
          <Input
            className="h-6 py-0 px-1 text-sm"
            placeholder={creatingRoot === 'folder' ? 'Nom du dossier…' : 'Nom du fichier…'}
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            onBlur={commitRoot}
            onKeyDown={handleRootKey}
            autoFocus
          />
        </div>
      )}

      {data.length === 0 && !creatingRoot ? (
        <div className="flex items-center justify-center min-h-[100px]">
          <p className="text-sm text-foreground opacity-60">Aucun fichier disponible</p>
        </div>
      ) : (
        data.map((node) => (
          <FileTreeItem
            key={node.id}
            node={node}
            parentId={null}
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
  );
}

export function FileTree({ data, onFileClick, onFolderClick }: FileTreeProps) {
  return (
    <DragProvider>
      <FileTreeInner data={data} onFileClick={onFileClick} onFolderClick={onFolderClick} />
    </DragProvider>
  );
}
