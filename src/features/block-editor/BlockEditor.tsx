import BlockLibrary from './components/BlockLibrary/BlockLibrary'
import ImportExport from './components/ImportExport/ImportExport'
import ShortcutManager from './components/ShortcutManager/ShortcutManager'
import { PageHeader, Panel } from '@/shared/components'

function BlockEditor() {
  return (
    <div className="page">
      <PageHeader
        actions={<ImportExport />}
        eyebrow="Route /blocks"
        title="Blocs personnalises"
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Panel title="Bibliotheque de blocs">
          <BlockLibrary />
        </Panel>

        <Panel title="Raccourcis clavier">
          <ShortcutManager />
        </Panel>
      </div>
    </div>
  )
}

export default BlockEditor
