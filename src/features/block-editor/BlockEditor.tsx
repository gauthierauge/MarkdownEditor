import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { clearSelection } from '@/shared/store/uiSlice';
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
    <div className="page">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-[rgba(215,221,228,0.9)] bg-white/90 px-5 py-4 shadow-[var(--color-shadow)]">
        <div>
          <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
            Blocs personnalises
          </p>
          <h1 className="m-0 text-2xl font-semibold text-[var(--color-text)]">
            Markdown Editor
          </h1>
        </div>
        <ImportExport />
      </header>
      <main className="grid min-h-0 gap-4 xl:grid-cols-[260px_minmax(0,1fr)_380px]">
        <aside className="min-w-0">
          <BlockLibrary />
        </aside>
        <section className="flex-1 flex">
          <MainEditor />
        </section>
        <aside className="min-w-0">
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
