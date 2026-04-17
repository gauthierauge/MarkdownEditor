import { useMarkdownEditor } from './hooks/useMarkdownEditor';
import { useMarkdownExport } from './hooks/useMarkdownExport';
import BlockInsertMenu from './components/BlockInsertMenu';
import { Button } from '@/shared/components/ui/button';
import MarkdownPreview from '@/shared/components/MarkdownPreview';

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
        <div className="flex flex-col flex-1 min-h-0 h-full">

            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30 shrink-0">
                <span className="text-sm font-medium text-foreground truncate flex-1">
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
                <Button
                    variant="outline"
                    size="xs"
                    onClick={handleExport}
                    title="Exporter en .md"
                >
                    ↓ Exporter
                </Button>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={handleClose}
                    title="Fermer le fichier"
                >
                    ✕ Fermer
                </Button>
            </div>

            <div className="flex flex-1 min-h-0 gap-0">
                <div className={`flex flex-col min-h-0 ${showPreview ? 'w-1/2 border-r border-border' : 'flex-1'}`}>
                    <textarea
                        ref={textareaRef}
                        className="flex-1 w-full bg-background text-foreground font-mono text-sm leading-relaxed p-4 resize-none outline-none focus:ring-0"
                        value={content}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Commencez à écrire en Markdown..."
                        spellCheck={false}
                    />
                </div>

                {showPreview && (
                    <div className="w-1/2 overflow-y-auto p-4">
                        <MarkdownPreview
                            content={content}
                            emptyMessage="L'aperçu apparaîtra ici…"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
