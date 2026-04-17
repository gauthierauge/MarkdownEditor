import { useState } from 'react';
import {
  Navigate,
  NavLink,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from 'react-router-dom';
import type { FileNode } from '@/features/file-tree/types/FileTree.types';
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener';
import MarkdownRoutePage from '@/features/markdown-editor/MarkdownRoutePage';
import ImageLibrary from '@/features/image-library/ImageLibrary';
import AppSidebar from '@/shared/components/AppSidebar';
import BlocksSidebar from '@/shared/components/BlocksSidebar';
import { Button } from '@/shared/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/lib/utils';
import { useAppSelector } from '@/shared/store/hooks';
import { selectFileTree } from '@/shared/store/slices/foldersSlice';
import { selectOpenFileId } from '@/shared/store/slices/markdownSlice';
import { PanelRightIcon } from 'lucide-react';

function findFirstFileId(nodes: FileNode[]): string | null {
  for (const node of nodes) {
    if (node.type === 'file') {
      return node.id;
    }

    if (node.type === 'folder' && node.children) {
      const nestedId = findFirstFileId(node.children);
      if (nestedId) {
        return nestedId;
      }
    }
  }

  return null;
}

function HomeRedirect() {
  const openFileId = useAppSelector(selectOpenFileId);
  const fileTree = useAppSelector(selectFileTree);
  const fallbackId = findFirstFileId(fileTree) ?? '8';

  return <Navigate replace to={`/markdown/${openFileId ?? fallbackId}`} />;
}

function AppShell() {
  const location = useLocation();
  const openFileId = useAppSelector(selectOpenFileId);
  const fileTree = useAppSelector(selectFileTree);
  const [rightOpen, setRightOpen] = useState(true);
  const isMarkdownRoute = location.pathname.startsWith('/markdown');
  const defaultMarkdownPath = `/markdown/${openFileId ?? findFirstFileId(fileTree) ?? '8'}`;

  useShortcutListener();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-3 border-b border-sidebar-border px-4 py-3">
          <SidebarTrigger />

          <nav className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            {[
              { label: 'Markdown', to: defaultMarkdownPath },
              { label: 'Image', to: '/images' },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors',
                    isActive && 'bg-primary text-primary-foreground',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto">
            {isMarkdownRoute ? (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setRightOpen((open) => !open)}
              >
                <PanelRightIcon />
                <span className="sr-only">Toggle Blocs</span>
              </Button>
            ) : null}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>

      {isMarkdownRoute ? (
        <SidebarProvider
          open={rightOpen}
          onOpenChange={setRightOpen}
          className="w-auto! min-h-0!"
        >
          <BlocksSidebar />
        </SidebarProvider>
      ) : null}
    </SidebarProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomeRedirect /> },
      { path: 'markdown/:id', element: <MarkdownRoutePage /> },
      { path: 'images', element: <ImageLibrary /> },
      { path: '*', element: <HomeRedirect /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
