import { useState } from 'react';
import { useAppSelector } from '@/shared/store/hooks';
import { selectOpenFileId } from '@/shared/store/markdownSlice';
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener';
import MarkdownEditor from '@/features/markdown-editor/MarkdownEditor';
import AppSidebar from '@/shared/components/AppSidebar';
import BlocksSidebar from '@/shared/components/BlocksSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { Button } from '@/shared/components/ui/button';
import { PanelRightIcon } from 'lucide-react';

export default function App() {
  const openFileId = useAppSelector(selectOpenFileId);
  useShortcutListener();
  const [rightOpen, setRightOpen] = useState<boolean>(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border">
          <SidebarTrigger />
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setRightOpen((o) => !o)}
            >
              <PanelRightIcon />
              <span className="sr-only">Toggle Blocs</span>
            </Button>
          </div>
        </header>

        {openFileId ? (
          <div className="flex flex-1 min-h-0">
            <MarkdownEditor />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8">
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-foreground">Aucun fichier ouvert</p>
              <p className="text-sm text-muted-foreground">
                Créez ou ouvrez un fichier depuis la sidebar pour commencer.
              </p>
            </div>
          </div>
        )}
      </SidebarInset>
      <SidebarProvider
        open={rightOpen}
        onOpenChange={setRightOpen}
        className="w-auto! min-h-0!"
      >
        <BlocksSidebar />
      </SidebarProvider>
    </SidebarProvider>
  );
}
