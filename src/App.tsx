import { useRef, useEffect } from 'react';
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener';
import MarkdownEditor from '@/features/markdown-editor/MarkdownEditor';
import AppSidebar from '@/shared/components/AppSidebar';
import BlocksSidebar from '@/shared/components/BlocksSidebar';
import { Button } from '@/shared/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { useSidebar } from '@/shared/components/ui/sidebar-context';
import { useAppSelector } from '@/shared/store/hooks';
import { selectOpenFileId } from '@/shared/store/slices/markdownSlice';
import { Toaster } from '@/shared/components/ui/sonner';
import { PanelRightIcon } from 'lucide-react';

export default function App() {
  const openFileId = useAppSelector(selectOpenFileId);
  const rightToggleRef = useRef<() => void>(() => {});

  useShortcutListener();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-3 border-b border-sidebar-border px-4 py-3">
          <SidebarTrigger />
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => rightToggleRef.current()}
            >
              <PanelRightIcon />
              <span className="sr-only">Toggle Blocs</span>
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 overflow-auto">
          {openFileId ? (
            <MarkdownEditor />
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              Sélectionne un fichier dans l'explorateur.
            </div>
          )}
        </div>
      </SidebarInset>
      <SidebarProvider className="w-auto! min-h-0!">
        <BlocksSidebarBridge toggleRef={rightToggleRef} />
        <BlocksSidebar />
      </SidebarProvider>
      <Toaster />
    </SidebarProvider>
  );
}

function BlocksSidebarBridge({ toggleRef }: { toggleRef: React.MutableRefObject<() => void> }) {
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    toggleRef.current = toggleSidebar;
  }, [toggleRef, toggleSidebar]);
  return null;
}
