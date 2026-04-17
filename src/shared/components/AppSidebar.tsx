import { useAppSelector, useAppDispatch } from '@/shared/store/hooks';
import { openFile } from '@/shared/store/markdownSlice';
import { selectFileTree } from '@/shared/store/foldersSlice';
import { FileTree } from '@/features/file-tree/FileTree';
import { useMarkdownImport } from '@/features/markdown-editor/hooks/useMarkdownImport';
import { Button } from '@/shared/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/shared/components/ui/sidebar';

export default function AppSidebar() {
  const dispatch = useAppDispatch();
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
              ↑ Importer
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
              onFileClick={(file) => dispatch(openFile({ id: file.id, name: file.name }))}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
