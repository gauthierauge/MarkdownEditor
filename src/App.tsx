import { FileTree } from './features/file-tree/FileTree'
import { useAppSelector } from './store/hooks'
import ImportExport from './features/block-editor/components/ImportExport/ImportExport'
import BlockLibrary from './features/block-editor/components/BlockLibrary/BlockLibrary'
import MainEditor from './features/block-editor/components/MainEditor/MainEditor'
import ShortcutManager from './features/block-editor/components/ShortcutManager/ShortcutManager'

export default function App() {
  const tree = useAppSelector((s) => s.folders.tree)
  return (
    <div className="app">
      <header className="app-header">
        <h1>Markdown Editor</h1>
        <ImportExport />
      </header>
      <main className="app-main">
        <aside className="app-sidebar">
          <BlockLibrary />
          <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />
          <h2 style={{ fontSize: '16px', margin: '10px 0' }}>File Explorer</h2>
          <FileTree
            data={tree}
            onFileClick={(file) => console.log('File clicked:', file.name)}
            onFolderClick={(folder) => console.log('Folder clicked:', folder.name)}
          />
        </aside>
        <section className="app-content">
          <MainEditor />
        </section>
      </main>
      <ShortcutManager />
    </div>
  )
}
