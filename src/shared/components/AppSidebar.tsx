import { useAppSelector } from '@/shared/store/hooks';
import { FileTree } from '@/features/file-tree/FileTree';
import BlockLibrary from '@/features/block-editor/components/BlockLibrary/BlockLibrary';
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
  const tree = useAppSelector((s) => s.folders.tree);

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
          <SidebarGroupLabel>Explorateur</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <FileTree
              data={tree}
              onFileClick={(file) => console.log('File clicked:', file.name)}
              onFolderClick={(folder) => console.log('Folder clicked:', folder.name)}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
