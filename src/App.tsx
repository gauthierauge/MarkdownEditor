import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { clearSelection } from '@/shared/store/uiSlice';
import { useShortcutListener } from '@/features/block-editor/hooks/useShortcutListener';
import ImportExport from '@/features/block-editor/components/ImportExport/ImportExport';
import MainEditor from '@/features/block-editor/components/MainEditor/MainEditor';
import BlockForm from '@/features/block-editor/components/BlockForm/BlockForm';
import ShortcutManager from '@/features/block-editor/components/ShortcutManager/ShortcutManager';
import AppSidebar from '@/shared/components/AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';

export default function App() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((s) => s.ui.selectedBlockId);
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

        <section className="flex flex-1 gap-4 p-4 min-h-0">
          <div className="flex-1 flex">
            <MainEditor />
          </div>
          <aside className="w-96 shrink-0">
            <BlockForm
              blockId={selectedBlockId ?? undefined}
              onSaved={() => dispatch(clearSelection())}
            />
          </aside>
        </section>

        <footer className="px-4 pb-4">
          <ShortcutManager />
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
