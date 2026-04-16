import type { FileNode } from '@/features/file-tree/types/FileTree.types';
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

const sampleFiles: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        children: [
          { id: '3', name: 'Header.tsx', type: 'file' },
          { id: '4', name: 'Footer.tsx', type: 'file' },
        ],
      },
      {
        id: '5',
        name: 'utils',
        type: 'folder',
        children: [
          { id: '6', name: 'helpers.ts', type: 'file' },
          { id: '7', name: 'constants.ts', type: 'file' },
        ],
      },
      { id: '8', name: 'App.tsx', type: 'file' },
      { id: '9', name: 'main.tsx', type: 'file' },
    ],
  },
  {
    id: '10',
    name: 'public',
    type: 'folder',
    children: [
      { id: '11', name: 'favicon.ico', type: 'file' },
      { id: '12', name: 'logo.png', type: 'file' },
    ],
  },
  { id: '13', name: 'package.json', type: 'file' },
  { id: '14', name: 'README.md', type: 'file' },
];

export default function AppSidebar() {
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
              data={sampleFiles}
              onFileClick={(file) => console.log('File clicked:', file.name)}
              onFolderClick={(folder) => console.log('Folder clicked:', folder.name)}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
