import React, { useState } from 'react';
import type { FileTreeProps } from './types/FileTree.types';
import { FileTreeItem } from './components/FileTreeItem';
import { useFileTree } from './hooks/useFileTree';
import { useNodeCrud } from './hooks/useNodeCrud';
import { DragProvider } from '@/shared/context/drag/DragProvider';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

export function FileTree({
  data,
  onFileClick,
  onFolderClick,
}: FileTreeProps) {
  const { isExpanded, toggleExpand } = useFileTree();
  const crud = useNodeCrud();
  const [creatingRoot, setCreatingRoot] = useState<'folder' | 'file' | null>(null);
  const [rootName, setRootName] = useState<string>('');

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

  return (
    <DragProvider>
      <div className="w-full py-2 text-sm select-none text-left" role="tree">
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">Explorateur</span>
          <span className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => { setRootName(''); setCreatingRoot('folder'); }}
              title="Nouveau dossier racine"
            >
              📁+
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => { setRootName(''); setCreatingRoot('file'); }}
              title="Nouveau fichier racine"
            >
              📄+
            </Button>
          </span>
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
  );
}
