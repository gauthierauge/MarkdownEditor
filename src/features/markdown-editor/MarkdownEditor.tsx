import { useMarkdownEditor } from './hooks/useMarkdownEditor';
import { useMarkdownExport } from './hooks/useMarkdownExport';
import BlockInsertMenu from './components/BlockInsertMenu';
import { Button } from '@/shared/components/ui/button';
import MarkdownPreview from '@/shared/components/MarkdownPreview';
import { Upload, X } from 'lucide-react';

export default function MarkdownEditor() {
  const {
    textareaRef,
    openFileName,
    content,
    showPreview,
    handleChange,
    handleClose,
    togglePreview,
  } = useMarkdownEditor();
  const { handleExport } = useMarkdownExport();

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-border bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="flex-1 truncate text-sm font-medium text-foreground">
            {openFileName ?? 'Untitled'}
          </span>
          <BlockInsertMenu />
          <Button
            variant="outline"
            size="xs"
            onClick={togglePreview}
            title={showPreview ? 'Masquer l\'aperçu' : 'Afficher l\'aperçu'}
          >
            {showPreview ? 'Éditeur seul' : 'Aperçu'}
          </Button>
          <Button variant="outline" size="xs" onClick={handleExport} title="Exporter en .md">
            <Upload className="h-3.5 w-3.5" /> Exporter
          </Button>
          <Button variant="outline" size="xs" onClick={handleClose} title="Fermer le fichier">
            <X className="h-3.5 w-3.5" /> Fermer
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div
          className={`flex min-h-0 flex-col ${
            showPreview ? 'w-1/2 border-r border-border' : 'flex-1'
          }`}
        >
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none bg-background p-4 font-mono text-sm leading-relaxed text-foreground outline-none focus:ring-0"
            value={content}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="Commencez à écrire en Markdown..."
            spellCheck={false}
          />
        </div>

        {showPreview ? (
          <div className="w-1/2 overflow-y-auto p-4">
            <MarkdownPreview
              content={content}
              emptyMessage="L'aperçu apparaîtra ici…"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
