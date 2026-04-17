import { useAppSelector } from '@/shared/store/hooks';
import { selectOpenFileId } from '@/shared/store/markdownSlice';
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener';
import ImportExport from '@/features/block-editor/components/ImportExport/ImportExport';
import ShortcutManager from '@/features/block-editor/components/ShortcutManager/ShortcutManager';
import MarkdownEditor from '@/features/markdown-editor/MarkdownEditor';
import AppSidebar from '@/shared/components/AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';

export default function App() {
  const openFileId = useAppSelector(selectOpenFileId);
  useShortcutListener();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 px-4 py-3 border-b border-sidebar-border">
          <SidebarTrigger />
          <div className="ml-auto">
            <ImportExport />
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

        <footer className="px-4 pb-4">
          <ShortcutManager />
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
