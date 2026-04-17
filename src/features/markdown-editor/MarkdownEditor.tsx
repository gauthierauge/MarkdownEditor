import { useState, useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useMarkdownEditor } from './hooks/useMarkdownEditor';
import { useMarkdownExport } from './hooks/useMarkdownImportExport';
import { Button } from '@/shared/components/ui/button';

export default function MarkdownEditor() {
    const { openFileName, content, handleChange, handleClose } = useMarkdownEditor();
    const { handleExport } = useMarkdownExport();
    const [showPreview, setShowPreview] = useState(true);

    const html = useMemo(
        () => DOMPurify.sanitize(marked.parse(content) as string),
        [content]
    );

    return (
        <div className="flex flex-col flex-1 min-h-0 h-full">

            <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30 shrink-0">
                <span className="text-sm font-medium text-foreground truncate flex-1">
                    {openFileName ?? 'Untitled'}
                </span>
                <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setShowPreview((v) => !v)}
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
                        className="flex-1 w-full bg-background text-foreground font-mono text-sm leading-relaxed p-4 resize-none outline-none focus:ring-0"
                        value={content}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Commencez à écrire en Markdown..."
                        spellCheck={false}
                    />
                </div>

                {showPreview && (
                    <div
                        className="w-1/2 overflow-y-auto p-4"
                    >
                        {content.trim() ? (
                            <div
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm">
                                L'aperçu apparaîtra ici…
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
