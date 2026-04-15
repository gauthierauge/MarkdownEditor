import { BlockLibrary } from '@/features/block-library'
import { MainEditor } from '@/features/main-editor'
import { ImportExport } from '@/features/import-export'
import { ShortcutManager } from '@/features/shortcuts'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown Editor</h1>
        <ImportExport />
      </header>
      <main className="app-main">
        <aside className="app-sidebar">
          <BlockLibrary />
        </aside>
        <section className="app-content">
          <MainEditor />
        </section>
      </main>
      <ShortcutManager />
    </div>
  )
}
