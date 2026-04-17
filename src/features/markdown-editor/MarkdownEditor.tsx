import BlockInsertMenu from './components/BlockInsertMenu'
import { useMarkdownEditor } from './hooks/useMarkdownEditor'
import { useMarkdownExport } from './hooks/useMarkdownExport'
import MarkdownPreview from '@/shared/components/MarkdownPreview'
import { Button } from '@/shared/components/ui/button'

function MarkdownEditor() {
  const {
    content,
    handleChange,
    handleClose,
    openFileName,
    showPreview,
    textareaRef,
    togglePreview,
  } = useMarkdownEditor()
  const { handleExport } = useMarkdownExport()

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
        <span className="flex-1 truncate text-sm font-medium text-foreground">
          {openFileName ?? 'Untitled'}
        </span>
        <BlockInsertMenu />
        <Button
          onClick={togglePreview}
          size="xs"
          title={showPreview ? "Masquer l'apercu" : "Afficher l'apercu"}
          variant="outline"
        >
          {showPreview ? 'Editeur seul' : 'Apercu'}
        </Button>
        <Button
          onClick={handleExport}
          size="xs"
          title="Exporter en .md"
          variant="outline"
        >
          Exporter
        </Button>
        <Button
          onClick={handleClose}
          size="xs"
          title="Fermer le fichier"
          variant="outline"
        >
          Fermer
        </Button>
      </div>

      <div className="flex flex-1 min-h-0 gap-0">
        <div
          className={`flex min-h-0 flex-col ${showPreview ? 'w-1/2 border-r border-border' : 'flex-1'}`}
        >
          <textarea
            className="flex-1 w-full resize-none bg-background p-4 font-mono text-sm leading-relaxed text-foreground outline-none focus:ring-0"
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Commence a ecrire en Markdown..."
            ref={textareaRef}
            spellCheck={false}
            value={content}
          />
        </div>

        {showPreview ? (
          <div className="w-1/2 overflow-y-auto p-4">
            <MarkdownPreview
              content={content}
              emptyMessage="L'apercu apparaitra ici..."
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MarkdownEditor
