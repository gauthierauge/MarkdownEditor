import { useAppSelector, useAppDispatch } from '@/shared/store/hooks';
import { openFile } from '@/shared/store/markdownSlice';
import { FileTree } from '@/features/file-tree/FileTree';
import BlockLibrary from '@/features/block-editor/components/BlockLibrary/BlockLibrary';
import { useMarkdownImport } from '@/features/markdown-editor/hooks/useMarkdownImportExport';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from '@/shared/components/ui/sidebar';

export default function AppSidebar() {
  const dispatch = useAppDispatch();
  const tree = useAppSelector((s) => s.folders.tree);
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
          <SidebarGroupLabel>Blocs</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <BlockLibrary />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between pr-1">
            Explorateur
            <button
              onClick={handleImportClick}
              className="px-2 py-0.5 text-xs rounded border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Importer un fichier .md"
            >
              ↑ Importer
            </button>
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
