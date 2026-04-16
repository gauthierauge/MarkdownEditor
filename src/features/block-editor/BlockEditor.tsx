import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { clearSelection } from '@/store/uiSlice.ts';
import { useShortcutListener } from './hooks/useShortcutListener.ts';
import MainEditor from './components/MainEditor/MainEditor.tsx';
import BlockForm from './components/BlockForm/BlockForm.tsx';
import BlockLibrary from './components/BlockLibrary/BlockLibrary.tsx';
import ImportExport from './components/ImportExport/ImportExport.tsx';
import ShortcutManager from './components/ShortcutManager/ShortcutManager.tsx';

export default function BlockEditor() {
  const dispatch = useAppDispatch();
  const selectedBlockId = useAppSelector((s) => s.ui.selectedBlockId);
  useShortcutListener();

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#2e303a]">
        <h1 className="text-lg font-semibold text-gray-200 m-0">Markdown Editor</h1>
        <ImportExport />
      </header>
      <main className="flex flex-1 gap-4 p-4 min-h-0">
        <aside className="w-64 shrink-0">
          <BlockLibrary />
        </aside>
        <section className="flex-1 flex">
          <MainEditor />
        </section>
        <aside className="w-96 shrink-0">
          <BlockForm
            blockId={selectedBlockId ?? undefined}
            onSaved={() => dispatch(clearSelection())}
          />
        </aside>
      </main>
      <footer className="px-4 pb-4">
        <ShortcutManager />
      </footer>
    </div>
  );
}
