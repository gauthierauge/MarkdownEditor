import BlockLibrary from '@/features/block-editor/components/BlockLibrary/BlockLibrary';
import ShortcutManager from '@/features/block-editor/components/ShortcutManager/ShortcutManager';
import ImportExport from '@/features/block-editor/components/ImportExport/ImportExport';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from '@/shared/components/ui/sidebar';

export default function BlocksSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader className="px-4 py-3">
        <h2 className="text-lg font-semibold text-sidebar-foreground m-0">
          Blocs
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Bibliothèque</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <BlockLibrary />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Raccourcis</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <ShortcutManager />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Import / Export</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <ImportExport />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
