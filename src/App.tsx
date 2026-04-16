import { BlockLibrary } from '@/features/block-library'
import { MainEditor } from '@/features/main-editor'
import { ImportExport } from '@/features/import-export'
import { ShortcutManager } from '@/features/shortcuts'
import type { FileNode } from './features/file-tree/types/FileTree.types'
import { FileTree } from './features/file-tree/FileTree'

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
]

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
          <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />
          <h2 style={{ fontSize: '16px', margin: '10px 0' }}>File Explorer</h2>
          <FileTree
            data={sampleFiles}
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
