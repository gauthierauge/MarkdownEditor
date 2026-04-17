import { useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/slices/foldersSlice';
import { FileTree } from '@/features/file-tree/FileTree';
import { useMarkdownImport } from '@/features/markdown-editor/hooks/useMarkdownImport';
import { Button } from '@/shared/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/shared/components/ui/sidebar';
import { Download } from 'lucide-react';

export default function AppSidebar() {
  const navigate = useNavigate();
  const tree = useAppSelector(selectFileTree);
  const { handleImportClick, handleFileChange, inputRef } = useMarkdownImport();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <h1 className="text-lg font-semibold text-sidebar-foreground m-0">
          Markdown Editor
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-1">
            Explorateur
            <Button
              onClick={handleImportClick}
              variant="ghost"
              size="xs"
              title="Importer un fichier .md"
            >
              <Download className="w-3.5 h-3.5" /> Importer
            </Button>
          </SidebarGroupLabel>
          <input
            ref={inputRef}
            type="file"
            accept=".md,text/markdown"
            className="hidden"
            onChange={handleFileChange}
          />
          <SidebarGroupContent className="px-2">
            <FileTree
              data={tree}
              onFileClick={(file) => navigate(`/markdown/${file.id}`)}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
